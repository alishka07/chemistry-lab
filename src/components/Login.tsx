import { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [student_id, setStudent_id] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && surname.trim()) {
      onLogin({ role, student_id, name: name.trim(), surname: surname.trim() });
    }
  };

  // onClick для гостя: мгновенный вход без полей
  const handleGuestLogin = () => {
    onLogin({ 
      role: 'guest' as any, // расширь User type на 'guest'
      student_id: 'guest_' + Date.now(), // уникальный ID
      name: 'Гость',
      surname: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Лабораторные работы
          </h1>
          <p className="text-gray-600 text-lg">
            Платформа для изучения химии
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Роли student/teacher без изменений */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-4">
              Выберите роль
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                style={{ borderColor: role === 'student' ? '#3b82f6' : undefined, backgroundColor: role === 'student' ? '#eff6ff' : undefined }}>
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value as 'student')}
                  className="mr-3 w-4 h-4 accent-blue-600"
                />
                <span className="font-medium text-gray-700">Студент</span>
              </label>
              <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                style={{ borderColor: role === 'teacher' ? '#3b82f6' : undefined, backgroundColor: role === 'teacher' ? '#eff6ff' : undefined }}>
                <input
                  type="radio"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={(e) => setRole(e.target.value as 'teacher')}
                  className="mr-3 w-4 h-4 accent-blue-600"
                />
                <span className="font-medium text-gray-700">Преподаватель</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Student_id/Teacher_id
            </label>
            <input
              type="text"
              value={student_id}
              onChange={(e) => setStudent_id(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Фамилия
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800"
          >
            Войти
          </button>

          {/* ✅ Кнопка гостя */}
          <button 
            type="button" 
            onClick={handleGuestLogin}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-200 hover:from-gray-700 hover:to-gray-800"
          >
            Войти как гость (просмотр без отправки баллов)
          </button>
        </form> 
      </div>
    </div>
  );
}
