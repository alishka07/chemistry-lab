import { supabase } from './supabaseClient';
import { QuizAnswer } from "../types";

export interface TestResult {
  student_id: number;
  lab_work_id: number;
  score: number;
  total: number;
  submitted_at: string;
  answers: QuizAnswer[];
}

export interface SubmitResultResponse {
  success: boolean;
  message: string;
  data: TestResult | null; // ✅ data всегда есть в интерфейсе
}

export const submitResult = async (
  result: TestResult, 
  userRole: 'guest' | 'student' | 'teacher'
): Promise<SubmitResultResponse> => {
  // Проверка дубликатов
  const { data: existing, error: checkError } = await supabase
    .from('test_results')
    .select('*')
    .eq('student_id', result.student_id)
    .eq('lab_work_id', result.lab_work_id)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  if (existing) {
    return { 
      success: false, 
      message: 'Вы уже сдавали этот тест',
      data: null  // ✅ добавили data: null
    };
  }

  // ГОСТЬ: ЛОКАЛЬНО
  if (userRole === 'guest') {
    return {
      success: true,
      message: '✅ Результат рассчитан (гость — не отправлено учителю)',
      data: result  // ✅ data всегда есть
    };
  }

  // STUDENT/TEACHER: в БД
  const { data, error } = await supabase
    .from('test_results')
    .insert([result]);

  if (error) throw error;

  return {
    success: true,
    message: '✅ Результат отправлен учителю!',
    data: data?.[0] ?? null  // ✅ всегда возвращаем data
  };
};

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

  return data ?? null; // ✅ явный null
};
