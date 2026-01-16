import React, { useState } from 'react';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { SignalCard } from './SignalCard';
import { SimulationView } from './SimulationView';
import { MOCK_SIGNALS } from '../data/mockSignals';
import { SourceType, Signal } from '../types';
import { Search, Zap } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export const Dashboard: React.FC = () => {
  const [activeSource, setActiveSource] = useState<SourceType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatingSignal, setSimulatingSignal] = useState<Signal | null>(null);

  const filteredSignals = MOCK_SIGNALS.filter(s => {
    const matchesSource = activeSource === 'all' || s.source === activeSource;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center pt-20 sm:pt-32 px-4 pb-12">
        {/* Hero / Logo Section */}
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="flex items-center justify-center mb-8 select-none tracking-tighter">
            <span className="text-[5.5rem] font-medium text-[#4285F4]">G</span>
            <span className="text-[5.5rem] font-medium text-[#EA4335]">o</span>
            <span className="text-[5.5rem] font-medium text-[#FBBC05]">o</span>
            <span className="text-[5.5rem] font-medium text-[#4285F4]">g</span>
            <span className="text-[5.5rem] font-medium text-[#34A853]">l</span>
            <span className="text-[5.5rem] font-medium text-[#EA4335]">e</span>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl relative mb-8 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your workspace signals..."
              className="block w-full pl-12 pr-5 py-3.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:border-gray-300 transition-all text-base"
            />
          </div>
        </div>

        {/* Shortcuts / Filters */}
        <FilterBar activeSource={activeSource} onSourceChange={setActiveSource} />

        {/* List Content */}
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             {filteredSignals.length > 0 ? (
               <div className="divide-y divide-gray-100">
                 {filteredSignals.map((signal, index) => (
                   <SignalCard 
                    key={signal.id} 
                    signal={signal} 
                    index={index} 
                    onOpenSimulation={() => setSimulatingSignal(signal)}
                   />
                 ))}
               </div>
             ) : (
               <div className="text-center py-12">
                 <p className="text-gray-500">No signals found matching your criteria.</p>
               </div>
             )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {simulatingSignal && (
          <SimulationView 
            signal={simulatingSignal} 
            onClose={() => setSimulatingSignal(null)} 
          />
        )}
      </AnimatePresence>
      
      <footer className="py-4 text-center text-xs text-gray-400 border-t border-gray-100 bg-gray-50">
        <p>SignalFlow Workspace Intelligence &copy; 2025</p>
      </footer>
    </div>
  );
};
