import { Folder } from 'lucide-react';
import { getQuarters } from '../labworks';
import { User } from '../types';
import { useTranslation } from "react-i18next";
import type { Quarter } from '../labworks'; // Импортируем тип

interface StudentDashboardProps {
  user: User;
  onSelectQuarter: (quarterId: number) => void;
}

export default function StudentDashboard({ user, onSelectQuarter }: StudentDashboardProps) {
  const { t: tExtra } = useTranslation("extra"); // Для extra namespace (studentdashboard)
  const { t } = useTranslation(); // Для основного namespace (quarters)

  // Получаем quarters с использованием t
  const quartersData: Quarter[] = getQuarters(t);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{tExtra('extra:studentdashboard.title')}</h2>
        <p className="text-gray-600 mt-2">{tExtra('extra:studentdashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quartersData.map((quarter: Quarter) => (
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
  {quarter.labWorks.length} {tExtra('extra:studentdashboard.works_count', { count: quarter.labWorks.length })}
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