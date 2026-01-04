import { supabase } from './supabaseClient';
import { QuizAnswer } from "../src/types"; // предполагается, что types.ts в той же директории

export interface TestResult {
  student_id: number;
  lab_work_id: number;
  score: number;
  total: number;
  submitted_at: string; // ISO string
  answers: QuizAnswer[]; // добавим поле для ответов
}

// Отправка результата теста
export const submitResult = async (result: TestResult) => {
  // Проверка: сдавал ли студент этот тест
  const { data: existing, error: checkError } = await supabase
    .from('test_results')
    .select('*')
    .eq('student_id', result.student_id)
    .eq('lab_work_id', result.lab_work_id)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 = нет записи
    throw checkError;
  }

  if (existing) {
    throw new Error('Вы уже сдавали этот тест');
  }

  // Вставка нового результата
  const { data, error } = await supabase
    .from('test_results')
    .insert([result]);

  if (error) throw error;
  return data;
};

// Функция для получения существующего результата
export const getExistingResult = async (studentId: number, labWorkId: number) => {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('student_id', studentId)
    .eq('lab_work_id', labWorkId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data;
};