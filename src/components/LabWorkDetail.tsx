import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { quarters } from '../labworks';
import { User, Submission, QuizAnswer } from '../types';
import { submitResult, getExistingResult, TestResult } from '../../supabase/resultsService';

// Добавьте это объявление типа
declare global {
  interface Window {
    OpenWidget?: {
      call: (method: string) => void;
    };
  }
}

interface LabWorkDetailProps {
  labWorkId: number;
  user: User;
  onBack: () => void;
  onSubmitQuiz: (submission: Submission) => void;
  existingSubmission?: Submission;
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
  const [showChatModal, setShowChatModal] = useState(false);

  // Проверяем в Supabase, есть ли уже результат
  useEffect(() => {
    const checkExistingSubmission = async () => {
      try {
        const existingResult = await getExistingResult(Number(user.student_id), labWorkId);
        if (existingResult) {
          setSubmitted(true);
          setScore(existingResult.score);
          
          // Восстанавливаем выбранные ответы из базы
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

    if (!existingSubmission && user.student_id) {
      checkExistingSubmission();
    }
  }, [labWorkId, user.student_id, existingSubmission]);

  const handleOpenChat = () => {
    // Теперь TypeScript знает о window.OpenWidget
    if (window.OpenWidget) {
      window.OpenWidget.call('open');
    } else {
      setShowChatModal(true);
    }
  };

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

      // Создаем объект для отправки в Supabase
      const testResult: TestResult = {
        student_id: Number(user.student_id),
        lab_work_id: labWork.id,
        score: calculatedScore,
        total: labWork.quiz.length,
        submitted_at: new Date().toISOString(),
        answers: answers,
      };

      // Отправляем в Supabase
      await submitResult(testResult);
      
      setSubmitted(true);
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Создаем Submission для локального состояния
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
      } else {
        setSubmitError('Ошибка при отправке теста. Пожалуйста, попробуйте позже.');
      }
    }
  };

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
        {labWork.videos && labWork.videos.length > 0 && (
          <div className="mb-10 pb-8 border-b border-gray-200">
            {labWork.videos.map((video, index) => (
              <div key={index} className="mb-6">
                {video.url && (
                  <div className="aspect-video mb-3 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={video.url}
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
                    <span className="inline-block w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">{qIndex + 1}</span>
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

            {/* Сообщения об ошибке и успехе */}
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
                    <span className="text-4xl font-bold text-blue-900">{score}/{labWork.quiz.length}</span>
                    <span className="block text-sm text-blue-700 mt-2">
                      {Math.round((score / labWork.quiz.length) * 100)}%
                    </span>
                  </p>
                </div>

                {/* Кнопка для открытия OpenWidget */}
                <button
                  onClick={handleOpenChat}
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
          {isSubmitting ? 'Отправка...' : submitted ? 'Тест уже отправлен' : 'Отправить'}
        </button>
      </div>

      {/* Модальное окно, если OpenWidget не загрузился */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">ИИ-помощник</h3>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Чат-виджет OpenWidget должен появиться в правом нижнем углу экрана.
                Если его нет, обновите страницу и попробуйте снова.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium mb-2">Что можно спросить у ИИ-помощника:</p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Разъяснение теории по этой лабораторной работе</li>
                  <li>• Объяснение правильных ответов на тест</li>
                  <li>• Помощь с оборудованием и процедурой выполнения</li>
                  <li>• Дополнительные примеры и задачи</li>
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  Обновить страницу
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}