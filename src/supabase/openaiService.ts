// Сервис для работы с OpenAI API
// ВАШ КЛЮЧ OpenAI API
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LabWorkContext {
  title: string;
  theory?: string;
  equipment?: string[];
  procedure?: string[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  userAnswers: Record<number, number>;
  score: number;
  totalQuestions: number;
}

/**
 * Получение ответа от OpenAI API
 */
export const getAIResponse = async (
  userInput: string, 
  context: LabWorkContext,
  existingMessages: ChatMessage[] = []
): Promise<string> => {
  try {
    // Формируем контекст для ИИ
    const systemPrompt = createSystemPrompt(context);
    
    // Формируем историю сообщений
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...existingMessages,
      {
        role: 'user',
        content: userInput
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return 'Извините, произошла ошибка при получении ответа от ИИ. Пожалуйста, попробуйте позже.';
  }
};

/**
 * Создание системного промпта с контекстом лабораторной работы
 */
const createSystemPrompt = (context: LabWorkContext): string => {
  const { title, theory, equipment, procedure, quiz, userAnswers, score, totalQuestions } = context;
  
  let prompt = `Ты - ИИ-помощник по химии для студентов. Помогаешь с лабораторными работами.

Лабораторная работа: "${title}"

`;

  if (theory) {
    prompt += `Теория: ${theory}\n\n`;
  }

  if (equipment && equipment.length > 0) {
    prompt += `Оборудование: ${equipment.join(', ')}\n\n`;
  }

  if (procedure && procedure.length > 0) {
    prompt += `Порядок выполнения:\n${procedure.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n`;
  }

  if (quiz && quiz.length > 0) {
    prompt += `Результат теста: ${score}/${totalQuestions}\n\n`;
    
    prompt += 'Вопросы теста:\n';
    quiz.forEach((q, idx) => {
      const userAnswerIdx = userAnswers[idx];
      const userAnswer = userAnswerIdx !== undefined ? q.options[userAnswerIdx] : 'не ответил';
      const correctAnswer = q.options[q.correctAnswer];
      const isCorrect = userAnswerIdx === q.correctAnswer;
      
      prompt += `\nВопрос ${idx + 1}: ${q.question}\n`;
      prompt += `Ответ студента: ${userAnswer}\n`;
      prompt += `Правильный ответ: ${correctAnswer}\n`;
      prompt += `Статус: ${isCorrect ? 'Верно' : 'Ошибка'}\n`;
    });
  }

  prompt += `\nОтвечай на русском языке. Будь полезным и понятным.`;

  return prompt;
};

/**
 * Создание начального сообщения ИИ
 */
export const getInitialAIMessage = (context: LabWorkContext): string => {
  const { title, score, totalQuestions } = context;
  
  return `Привет! Я ИИ-помощник по лабораторной работе "${title}".

Ваш результат теста: ${score} из ${totalQuestions}

Задавайте вопросы по лабораторной работе, и я помогу вам разобраться!`;
};

/**
 * Проверка наличия API ключа
 */
