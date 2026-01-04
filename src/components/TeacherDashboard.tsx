import { Submission } from '../types';

interface TeacherDashboardProps {
  submissions: Submission[];
}

export default function TeacherDashboard({ submissions }: TeacherDashboardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Результаты студентов</h1>
        <p className="text-gray-600 mt-2">Всего отправок: {submissions.length}</p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <p className="text-lg text-gray-600">Пока нет результатов</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Фамилия
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Имя
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Лабораторная работа
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Оценка
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Дата и время
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {submission.studentSurname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {submission.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {submission.labWorkTitle}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm ${getScoreColor(submission.score, submission.totalQuestions)}`}>
                        {submission.score} / {submission.totalQuestions}
                        <span className="text-xs">
                          ({Math.round((submission.score / submission.totalQuestions) * 100)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(submission.submittedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
