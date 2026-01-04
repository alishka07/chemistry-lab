import { Folder } from 'lucide-react';
import { quarters } from '../labworks';
import { User } from '../types';

interface StudentDashboardProps {
  user: User;
  onSelectQuarter: (quarterId: number) => void;
}

export default function StudentDashboard({ user, onSelectQuarter }: StudentDashboardProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Четверти</h2>
        <p className="text-gray-600 mt-2">Выберите четверть для просмотра лабораторных работ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quarters.map((quarter) => (
          <button
            key={quarter.id}
            onClick={() => onSelectQuarter(quarter.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 text-left group hover:scale-105 transform"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Folder className="w-10 h-10 text-blue-600 group-hover:text-blue-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {quarter.title}
                </h2>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1 w-1 bg-blue-600 rounded-full"></div>
                  <p className="text-gray-600 font-medium">
                    {quarter.labWorks.length} {
                      quarter.labWorks.length % 10 === 1 && quarter.labWorks.length % 100 !== 11
                        ? 'работа'
                        : quarter.labWorks.length % 10 >= 2 && quarter.labWorks.length % 10 <= 4 && (quarter.labWorks.length % 100 < 10 || quarter.labWorks.length % 100 >= 20)
                        ? 'работы'
                        : 'работ'
                    }
                  </p>
                </div>
              </div>
              <div className="text-3xl font-light text-gray-200 group-hover:text-blue-100 transition-colors">
                →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
