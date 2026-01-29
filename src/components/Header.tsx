import { LogOut } from 'lucide-react';
import { User } from '../types';
import { useTranslation } from "react-i18next";

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
   const { t } = useTranslation("extra");
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">
              {t("extra:header.title")}
            </h1>
            <p className="text-blue-100 mt-1"></p>
            <p className="text-blue-50 mt-3 font-medium">
              {user.role === 'student' ? 'Студент' : 'Преподаватель'}: {user.surname} {user.name}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            {t("extra:header.logout")}
          </button>
        </div>
      </div>
    </header>
  );
}
