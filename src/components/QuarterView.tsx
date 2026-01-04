import { ArrowLeft } from 'lucide-react';
import { quarters } from '../labworks';

interface QuarterViewProps {
  quarterId: number;
  onBack: () => void;
  onSelectLabWork: (labWorkId: number) => void;
}

export default function QuarterView({ quarterId, onBack, onSelectLabWork }: QuarterViewProps) {
  const quarter = quarters.find((q) => q.id === quarterId);

  if (!quarter) {
    return <div className="text-center py-12 text-gray-600">Четверть не найдена</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{quarter.title}</h1>
        <p className="text-gray-600 mt-2">Всего работ: {quarter.labWorks.length}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quarter.labWorks.map((labWork, index) => (
          <button
            key={labWork.id}
            onClick={() => onSelectLabWork(labWork.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left group hover:border-l-4 hover:border-l-blue-600"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                {labWork.title}
              </h2>
              <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
