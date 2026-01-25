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
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cvftbqgniazflaobeheq.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZnRicWduaWF6Zmxhb2JlaGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NjczNjYsImV4cCI6MjA4MzA0MzM2Nn0.aI-RUd58w56ZWuBM5WjxydWIQU8mYdWw1N1mbVqc50o';
const FUNCTION_NAME = import.meta.env.VITE_OPENAI_FUNCTION_NAME || 'smart-endpoint'; // ← ИМЯ ТВОЕЙ EDGE FUNCTION

const edgeFunctionUrl = `${SUPABASE_URL}/functions/v1/${FUNCTION_NAME}`;

/**
 * Получение ответа от OpenAI API через Supabase Edge Function
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

    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,  // Anon key для публичного доступа
      },
      body: JSON.stringify({
        messages: messages,
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.explanation?.trim() || 'Нет ответа от ИИ';
    
  } catch (error) {
    console.error('Supabase Edge Function Error:', error);
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