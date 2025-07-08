import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface NavigationProps {
  onBack?: () => void;
  onHome?: () => void;
  title?: string;
}

const Navigation: React.FC<NavigationProps> = ({ onBack, onHome, title }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Indietro</span>
          </button>
        )}
        {onHome && (
          <button
            onClick={onHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Home size={20} />
            <span>Menu</span>
          </button>
        )}
      </div>
      {title && (
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      )}
      <div className="w-20"></div>
    </div>
  );
};

export default Navigation;