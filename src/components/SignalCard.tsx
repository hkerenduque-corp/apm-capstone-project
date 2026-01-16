import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Calendar, FileText, Table, Sparkles, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Signal, AISummaryResult } from '../types';
import { generateSignalSummary } from '../services/aiService';
import { SourceColors } from '../constants';

interface SignalCardProps {
  signal: Signal;
  index: number;
  onOpenSimulation: () => void;
}

const iconMap = {
  gmail: Mail,
  calendar: Calendar,
  docs: FileText,
  sheets: Table,
};

export const SignalCard: React.FC<SignalCardProps> = ({ signal, index, onOpenSimulation }) => {
  const [summaryData, setSummaryData] = useState<AISummaryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [isPerforming, setIsPerforming] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchSummary = async () => {
      const result = await generateSignalSummary(signal.content, signal.title);
      if (mounted) {
        setSummaryData(result);
        setLoading(false);
      }
    };

    fetchSummary();
    return () => { mounted = false; };
  }, [signal.content, signal.title]);

  const handlePerformTask = () => {
    setIsPerforming(true);
    // Simulate performing the task
    setTimeout(() => {
      setIsPerforming(false);
      setIsCompleted(true);
      // Automatically open simulation to show the result
      setTimeout(() => {
        onOpenSimulation();
      }, 500);
    }, 2000);
  };

  const Icon = iconMap[signal.source];
  // Use softer colors for the list view
  const sourceColor = SourceColors[signal.source].split(' ')[1]; // Extract text color class

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`group border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${expanded ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div 
        className="flex items-center py-4 px-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Icon Column */}
        <div className="flex-shrink-0 mr-4 text-gray-400 group-hover:text-gray-600">
          <Icon size={20} />
        </div>

        {/* Main Content Column */}
        <div className="flex-grow min-w-0 flex items-center">
          <div className="w-48 flex-shrink-0 flex items-center">
             <img 
              src={signal.sender.avatar} 
              alt={signal.sender.name} 
              className="w-6 h-6 rounded-full mr-3 border border-gray-100"
              referrerPolicy="no-referrer"
            />
            <span className={`text-sm font-medium truncate ${signal.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
              {signal.sender.name}
            </span>
          </div>
          
          <div className="flex-grow min-w-0 pr-4">
             <div className="flex items-center">
                <span className={`text-sm truncate mr-2 ${signal.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                  {signal.title}
                </span>
                {signal.priority === 'high' && (
                  <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600">
                    Urgent
                  </span>
                )}
                <span className="mx-2 text-gray-300">-</span>
                <span className="text-sm text-gray-500 truncate">
                  {summaryData?.summary || signal.content.substring(0, 60) + '...'}
                </span>
             </div>
          </div>
        </div>

        {/* Date & Action Column */}
        <div className="flex-shrink-0 flex items-center ml-4">
          <span className="text-xs text-gray-400 mr-4 whitespace-nowrap">
            {new Date(signal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-6 pl-14"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Summary & Actions */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Sparkles size={16} className="text-indigo-500 mr-2" />
                    <h4 className="text-sm font-semibold text-gray-900">AI Summary</h4>
                  </div>
                  
                  {loading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {summaryData?.summary}
                      </p>
                      
                      {summaryData?.actionItems && summaryData.actionItems.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Takeaways</p>
                          <ul className="space-y-2">
                            {summaryData.actionItems.map((item, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-700">
                                <CheckCircle2 size={14} className="mr-2 mt-0.5 text-gray-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Original Message</h4>
                  <p className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {signal.content}
                  </p>
                </div>
              </div>

              {/* Right Column: Suggested Task & Preview */}
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Zap size={16} className="text-indigo-600 mr-2" />
                    <h4 className="text-sm font-bold text-indigo-900">Smart Action</h4>
                  </div>
                  {summaryData?.suggestedTask && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded">
                      {summaryData.suggestedTask.type.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {loading ? (
                  <div className="space-y-3 animate-pulse flex-grow">
                    <div className="h-4 bg-indigo-100 rounded w-1/2"></div>
                    <div className="h-20 bg-indigo-100 rounded w-full"></div>
                  </div>
                ) : summaryData?.suggestedTask ? (
                  <div className="flex flex-col flex-grow">
                    <h5 className="text-sm font-semibold text-indigo-900 mb-1">{summaryData.suggestedTask.title}</h5>
                    <p className="text-xs text-indigo-700 mb-4">{summaryData.suggestedTask.description}</p>
                    
                    <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-inner mb-4 flex-grow overflow-y-auto max-h-60">
                      <p className="text-xs text-gray-500 font-bold uppercase mb-2 tracking-tighter">Preview</p>
                      <p className="text-sm text-gray-800 whitespace-pre-wrap italic">
                        {summaryData.suggestedTask.preview}
                      </p>
                    </div>

                    <div className="mt-auto">
                      {isCompleted ? (
                        <div className="flex items-center justify-center py-2.5 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
                          <CheckCircle2 size={18} className="mr-2" /> Task Completed
                        </div>
                      ) : (
                        <button 
                          onClick={handlePerformTask}
                          disabled={isPerforming}
                          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center shadow-sm ${
                            isPerforming 
                              ? 'bg-indigo-300 text-white cursor-not-allowed' 
                              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                          }`}
                        >
                          {isPerforming ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                              Performing Task...
                            </>
                          ) : (
                            <>Perform Smart Action</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-indigo-400 italic">No automated action suggested for this signal.</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 border-t border-gray-100 pt-4">
               <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                 Dismiss
               </button>
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSimulation();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black rounded-full transition-colors shadow-sm"
               >
                 Open in {signal.source.charAt(0).toUpperCase() + signal.source.slice(1)}
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
