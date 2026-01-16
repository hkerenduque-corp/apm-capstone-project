import React from 'react';
import { Mail, Calendar, FileText, Table, LayoutGrid } from 'lucide-react';
import { SourceType } from '../types';

interface FilterBarProps {
  activeSource: SourceType | 'all';
  onSourceChange: (source: SourceType | 'all') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeSource, onSourceChange }) => {
  const sources: { id: SourceType | 'all'; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'gmail', label: 'Gmail', icon: Mail },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'docs', label: 'Docs', icon: FileText },
    { id: 'sheets', label: 'Sheets', icon: Table },
  ];

  return (
    <div className="flex justify-center space-x-4 mb-10">
      {sources.map((source) => {
        const Icon = source.icon;
        const isActive = activeSource === source.id;
        
        return (
          <button
            key={source.id}
            onClick={() => onSourceChange(source.id)}
            className={`flex flex-col items-center group transition-all duration-200 ${isActive ? 'scale-105' : 'hover:scale-105'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
              isActive 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
            }`}>
              <Icon size={20} />
            </div>
            <span className={`text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
              {source.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
