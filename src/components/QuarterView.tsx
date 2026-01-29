import { ArrowLeft } from "lucide-react";
import { getQuarters } from "../labworks";
import { useTranslation } from "react-i18next";
import type { Quarter } from "../labworks";

interface QuarterViewProps {
  quarterId: number;
  onBack: () => void;
  onSelectLabWork: (labWorkId: number) => void;
}

export default function QuarterView({
  quarterId,
  onBack,
  onSelectLabWork,
}: QuarterViewProps) {
  const { t: tExtra } = useTranslation("extra");
  const { t } = useTranslation();

  const quartersData: Quarter[] = getQuarters(t);
  const quarter = quartersData.find((q) => q.id === quarterId);

  if (!quarter) {
    return (
      <div className="text-gray-600">
        {tExtra("quaterview.not_found")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-all duration-300 hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5" />
        {tExtra("common.back")}
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{quarter.title}</h1>
        <p className="text-gray-600 mt-2">
          {tExtra("quaterview.total_works", { count: quarter.labWorks.length })}
          : {quarter.labWorks.length}
        </p>
      </div>

      {/* Lab list */}
      <div className="grid gap-4">
        {quarter.labWorks.map((labWork, index) => (
          <button
            key={labWork.id}
            type="button"
            onClick={() => onSelectLabWork(labWork.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left group hover:border-l-4 hover:border-l-blue-600"
            aria-label={`${labWork.title} (${index + 1})`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 font-semibold text-sm">
                  {index + 1}
                </span>
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

        {quarter.labWorks.length === 0 && (
          <p className="text-center text-gray-500">
            {tExtra("quaterview.no_labworks")}
          </p>
        )}
      </div>
    </div>
  );
}
