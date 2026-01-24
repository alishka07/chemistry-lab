import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, User as UserIcon, Bot, RefreshCw } from 'lucide-react';
import { quarters } from '../labworks';
import { User, Submission, QuizAnswer } from '../types';
import { submitResult, getExistingResult, TestResult } from '../supabase/resultsService';
import { 
  getAIResponse, 
  getInitialAIMessage, 
  LabWorkContext 
} from '../supabase/openaiService';

interface LabWorkDetailProps {
  labWorkId: number;
  user: User;
  onBack: () => void;
  onSubmitQuiz: (submission: Submission) => void;
  existingSubmission?: Submission;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function LabWorkDetail({
  labWorkId,
  user,
  onBack,
  onSubmitQuiz,
  existingSubmission,
}: LabWorkDetailProps) {
  const labWork = quarters
    .flatMap((q) => q.labWorks)
    .find((lw) => lw.id === labWorkId);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(!!existingSubmission);
  const [score, setScore] = useState<number | null>(
    existingSubmission ? existingSubmission.score : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // ИИ-чат состояния
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Проверяем в Supabase, есть ли уже результат
  useEffect(() => {
    const checkExistingSubmission = async () => {
      if (user.role === 'guest' || !user.student_id) return;

      try {
        const existingResult = await getExistingResult(Number(user.student_id), labWorkId);
        if (existingResult) {
          setSubmitted(true);
          setScore(existingResult.score);

          if (existingResult.answers) {
            const restoredAnswers: Record<number, number> = {};
            existingResult.answers.forEach((answer: QuizAnswer) => {
              if (answer.selectedAnswers.length > 0) {
                restoredAnswers[answer.questionIndex] = answer.selectedAnswers[0];
              }
            });
            setSelectedAnswers(restoredAnswers);
          }
        }
      } catch (error) {
        console.error('Ошибка при проверке существующего результата:', error);
      }
    };

    if (!existingSubmission && user.student_id && user.role !== 'guest') {
      checkExistingSubmission();
    }
  }, [labWorkId, user.student_id, user.role, existingSubmission]);

  // Прокрутка к новым сообщениям
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (!labWork) {
    return <div>Лабораторная работа не найдена</div>;
  }

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    if (!labWork.quiz || submitted || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      let correctCount = 0;
      const answers: QuizAnswer[] = [];

      labWork.quiz.forEach((question, index) => {
        const selected = selectedAnswers[index];
        answers.push({
          questionIndex: index,
          selectedAnswers: selected !== undefined ? [selected] : [],
        });
        if (selected === question.correctAnswer) {
          correctCount++;
        }
      });

      const calculatedScore = correctCount;
      setScore(calculatedScore);

      let response;

      if (user.role === 'guest') {
        response = {
          success: true,
          message: 'Результат рассчитан локально',
          data: {
            score: calculatedScore,
            total: labWork.quiz.length,
          },
        };
      } else {
        const studentIdNum = Number(user.student_id);

        if (isNaN(studentIdNum) || studentIdNum <= 0) {
          throw new Error('Некорректный ID студента');
        }

        const testResult: TestResult = {
          student_id: studentIdNum,
          lab_work_id: labWork.id,
          score: calculatedScore,
          total: labWork.quiz.length,
          submitted_at: new Date().toISOString(),
          answers: answers,
        };

        response = await submitResult(testResult, user.role as 'guest' | 'student' | 'teacher');
      }

      setSubmitted(true);
      setSubmitSuccess(true);
      setIsSubmitting(false);

      const resultData = response.data ?? {
        score: calculatedScore,
        total: labWork.quiz.length,
      };

      if (user.role === 'guest') {
        alert(`Ваш результат: ${resultData.score}/${resultData.total} (режим гостя)`);
      } else {
        alert(`Ваш результат: ${resultData.score}/${resultData.total}`);
        if (response.success) {
          alert(response.message);
        }
      }

      const submission: Submission = {
        studentName: user.name,
        studentSurname: user.surname,
        labWorkId: labWork.id,
        labWorkTitle: labWork.title,
        score: calculatedScore,
        totalQuestions: labWork.quiz.length,
        submittedAt: new Date(),
        answers,
      };

      onSubmitQuiz(submission);
    } catch (error: any) {
      console.error('Ошибка при отправке теста:', error);
      setIsSubmitting(false);

      if (error.message === 'Вы уже сдавали этот тест') {
        setSubmitError('Вы уже сдавали этот тест ранее');
        setSubmitted(true);
      } else if (error.message?.includes('Некорректный ID студента')) {
        setSubmitError(error.message);
      } else {
        setSubmitError(`Ошибка при отправке: ${error.message || 'Неизвестная ошибка'}`);
      }
    }
  };

  // Создание контекста для ИИ
  const createLabWorkContext = (): LabWorkContext => {
    return {
      title: labWork.title,
      theory: labWork.theory,
      equipment: labWork.equipment,
      procedure: labWork.procedure,
      quiz: labWork.quiz,
      userAnswers: selectedAnswers,
      score: score || 0,
      totalQuestions: labWork.quiz?.length || 0
    };
  };

  // Открытие ИИ-чата с контекстом теста
  const openAIChatWithContext = () => {
    if (!labWork.quiz || score === null) return;
    
    const context = createLabWorkContext();
    const initialMessage = getInitialAIMessage(context);
    
    const initialChatMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date()
    };
    
    setChatMessages([initialChatMessage]);
    setShowAIChat(true);
  };

  // Отправка сообщения пользователя
  const handleSendMessage = async () => {
    if (!userMessage.trim() || isAIThinking) return;
    
    // Добавляем сообщение пользователя
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsAIThinking(true);
    
    try {
      // Получаем контекст и отправляем запрос к OpenAI
      const context = createLabWorkContext();
      
      // Преобразуем историю чата в формат для OpenAI
      const chatHistory = chatMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));
      
      const aiResponse = await getAIResponse(userMessage, context, chatHistory);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Ошибка при получении ответа ИИ:', error);
      
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAIThinking(false);
    }
  };

  // Сброс чата
  const resetChat = () => {
    openAIChatWithContext();
  };

  // Быстрые вопросы для ИИ
  const quickQuestions = [
    "Помоги разобраться с ошибками в тесте",
    "Объясни теорию этой лабораторной",
    "Как правильно выполнять эту работу?",
    "Какое оборудование нужно?"
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-10">
        {/* Видео материалы */}
        {labWork.videos && labWork.videos.length > 0 && (
          <div className="mb-10 pb-8 border-b border-gray-200">
            {labWork.videos.map((video, index) => (
              <div key={index} className="mb-6">
                {video.url && (
                  <div className="aspect-video mb-3 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={video.url.replace('watch?v=', 'embed/')}
                      title={video.description || `Video ${index + 1}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {video.description && (
                  <p className="text-sm text-gray-600 font-medium">{video.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{labWork.title}</h1>

        {labWork.description && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed">{labWork.description}</p>
          </div>
        )}

        {labWork.theory && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Теория</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{labWork.theory}</p>
          </div>
        )}

        {labWork.equipment && labWork.equipment.length > 0 && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Оборудование</h2>
            <ul className="space-y-3">
              {labWork.equipment.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {labWork.procedure && labWork.procedure.length > 0 && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Порядок выполнения</h2>
            <ol className="space-y-4">
              {labWork.procedure.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-lg leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {labWork.quiz && labWork.quiz.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Тест</h2>
            <div className="space-y-7">
              {labWork.quiz.map((question, qIndex) => (
                <div key={qIndex} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-semibold text-gray-900 mb-4 text-lg">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {qIndex + 1}
                    </span>
                    {question.question}
                  </p>
                  <div className="space-y-3 ml-10">
                    {question.options.map((option, oIndex) => {
                      const isSelected = selectedAnswers[qIndex] === oIndex;
                      const isCorrect = question.correctAnswer === oIndex;
                      const showResult = submitted;

                      return (
                        <label
                          key={oIndex}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            submitted
                              ? isCorrect
                                ? 'border-green-500 bg-green-50 shadow-sm'
                                : isSelected
                                ? 'border-red-500 bg-red-50 shadow-sm'
                                : 'border-gray-300 bg-white'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(qIndex, oIndex)}
                            disabled={submitted}
                            className="mr-3 w-4 h-4 accent-blue-600"
                          />
                          <span className="text-gray-700 text-base flex-1">{option}</span>
                          {showResult && isCorrect && (
                            <span className="ml-auto text-green-600 text-sm font-semibold">
                              ✓ Правильно
                            </span>
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <span className="ml-auto text-red-600 text-sm font-semibold">
                              ✗ Неправильно
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {submitError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">Тест успешно отправлен!</p>
              </div>
            )}

            {submitted && score !== null && (
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl">
                  <p className="text-center">
                    <span className="block text-sm font-medium text-blue-600 mb-2">Ваш результат</span>
                    <span className="text-4xl font-bold text-blue-900">
                      {score}/{labWork.quiz.length}
                    </span>
                    <span className="block text-sm text-blue-700 mt-2">
                      {Math.round((score / labWork.quiz.length) * 100)}%
                    </span>
                  </p>
                </div>

                {/* Кнопка для открытия ИИ-чата */}
                <button
                  onClick={openAIChatWithContext}
                  className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-3"
                >
                  <span className="text-xl">💬</span>
                  Обсудить результаты с ИИ-помощником
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitted || !labWork.quiz || labWork.quiz.length === 0 || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
            submitted || !labWork.quiz || labWork.quiz.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isSubmitting
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800'
          }`}
        >
          {isSubmitting
            ? 'Отправка...'
            : submitted
            ? 'Тест уже отправлен'
            : 'Отправить'}
        </button>
      </div>

      {/* Модальное окно ИИ-чата */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col">
            {/* Шапка чата */}
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">ИИ-помощник</h3>
                  <p className="text-sm text-gray-600">Лабораторная работа: {labWork.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Начать новый диалог"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowAIChat(false)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Контейнер сообщений */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-blue-100 rounded-br-none' : 'bg-gray-100 rounded-bl-none'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {msg.role === 'user' ? (
                        <>
                          <UserIcon className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Вы</span>
                        </>
                      ) : (
                        <>
                          <Bot className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">ИИ-помощник</span>
                        </>
                      )}
                      <span className="text-xs text-gray-500 ml-auto">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="whitespace-pre-line text-gray-800">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isAIThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gray-100 rounded-2xl rounded-bl-none p-4">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        ИИ-помощник думает...
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Быстрые вопросы */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setUserMessage(question)}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Поле ввода */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Введите ваш вопрос..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={isAIThinking}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!userMessage.trim() || isAIThinking}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                    !userMessage.trim() || isAIThinking
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:opacity-90'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}