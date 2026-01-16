import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Check, X, FileText, Mail, Table, Calendar as CalendarIcon, MoreVertical, Search, Menu, Star, Trash2, Archive, Inbox, Clock, Paperclip, Smile, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Signal } from '../types';

interface SimulationViewProps {
  signal: Signal;
  onClose: () => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({ signal, onClose }) => {
  const [step, setStep] = useState(0);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderGmail = () => (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Gmail Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <Menu size={20} className="text-gray-500" />
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 p-1 rounded">
              <Mail size={16} className="text-white" />
            </div>
            <span className="text-xl text-gray-600">Gmail</span>
          </div>
        </div>
        <div className="flex-grow max-w-2xl mx-8">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <input className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:bg-white focus:shadow-md outline-none" placeholder="Search mail" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm">A</div>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 p-4 space-y-2 border-r border-gray-100">
          <button className="bg-white shadow-md border border-gray-100 rounded-2xl px-6 py-4 flex items-center space-x-3 mb-4 hover:shadow-lg transition-shadow">
            <span className="text-2xl">+</span>
            <span className="font-medium">Compose</span>
          </button>
          <div className="flex items-center space-x-4 px-4 py-2 bg-red-50 text-red-600 rounded-r-full">
            <Inbox size={18} />
            <span className="font-medium">Inbox</span>
          </div>
          <div className="flex items-center space-x-4 px-4 py-2 text-gray-600">
            <Star size={18} />
            <span>Starred</span>
          </div>
          <div className="flex items-center space-x-4 px-4 py-2 text-gray-600">
            <Clock size={18} />
            <span>Snoozed</span>
          </div>
          <div className="flex items-center space-x-4 px-4 py-2 text-gray-600">
            <Send size={18} />
            <span>Sent</span>
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-grow p-8 overflow-y-auto">
          <div className="flex items-center space-x-4 mb-8">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-4">
              <Archive size={18} className="text-gray-500" />
              <Trash2 size={18} className="text-gray-500" />
              <Mail size={18} className="text-gray-500" />
            </div>
          </div>

          <h1 className="text-2xl text-gray-800 mb-6">{signal.title}</h1>
          
          <div className="flex items-start space-x-4 mb-8">
            <img src={signal.sender.avatar} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
            <div className="flex-grow">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">{signal.sender.name}</span>
                <span className="text-xs text-gray-500">10:30 AM (2 hours ago)</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">to me</div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {signal.content}
              </div>
            </div>
          </div>

          {/* Reply Simulation */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
                  <span>Reply to {signal.sender.name}</span>
                  <X size={16} />
                </div>
                <div className="p-4 min-h-[200px] relative">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-800 text-sm"
                  >
                    {applied ? (
                      <div className="text-gray-800">
                        {signal.simulationData?.newValue}
                      </div>
                    ) : (
                      <div className="text-gray-400 italic">Drafting reply...</div>
                    )}
                  </motion.div>
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setApplied(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {applied ? <><Check size={18} className="mr-2" /> Sent</> : 'Send'}
                    </button>
                    <div className="flex space-x-3 text-gray-400">
                      <ImageIcon size={18} />
                      <LinkIcon size={18} />
                      <Smile size={18} />
                      <Paperclip size={18} />
                    </div>
                  </div>
                  <Trash2 size={18} className="text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const renderDocs = () => (
    <div className="flex flex-col h-full bg-[#F8F9FA] font-sans">
      {/* Docs Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <FileText size={32} className="text-blue-500" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-800 font-medium">{signal.title}</span>
              <Star size={16} className="text-gray-400" />
            </div>
            <div className="flex space-x-3 text-xs text-gray-600">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span>Format</span>
              <span>Tools</span>
              <span>Extensions</span>
              <span>Help</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-medium flex items-center">
            <Check size={18} className="mr-2" /> Share
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm">A</div>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Document Canvas */}
        <div className="flex-grow flex justify-center p-8 overflow-y-auto">
          <div className="w-[816px] min-h-[1056px] bg-white shadow-md p-20 relative">
            <h1 className="text-3xl font-bold mb-8">{signal.title}</h1>
            <p className="text-gray-800 leading-loose mb-6">
              This document outlines the core requirements for the upcoming project launch. 
              The primary focus is on user experience and system reliability.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h2 className="text-xl font-semibold mb-2">User Authentication Flow</h2>
              <p className="text-gray-700">
                The authentication flow must be seamless across all devices. 
                We will support OAuth2 and traditional email/password login.
              </p>
            </div>
            <p className="text-gray-800 leading-loose">
              Security is paramount. All data in transit must be encrypted using TLS 1.3.
              We will also implement rate limiting to prevent brute force attacks.
            </p>

            {/* Comment Sidebar Simulation */}
            <div className="absolute top-40 -right-72 w-64">
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white border border-blue-200 rounded-lg shadow-lg p-4"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <img src={signal.sender.avatar} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                      <span className="text-sm font-bold">{signal.sender.name}</span>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">
                      {signal.content.split('\n')[0]}
                    </p>
                    <div className="border-t border-gray-100 pt-3">
                      {applied ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-600 font-medium"
                        >
                          <div className="flex items-center mb-1">
                            <span className="font-bold mr-2">You</span>
                            <span className="text-gray-400">Just now</span>
                          </div>
                          {signal.simulationData?.newValue}
                        </motion.div>
                      ) : (
                        <button 
                          onClick={() => setApplied(true)}
                          className="w-full py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                        >
                          Reply with AI Draft
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSheets = () => (
    <div className="flex flex-col h-full bg-[#F8F9FA] font-sans">
      {/* Sheets Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <Table size={32} className="text-green-600" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-800 font-medium">{signal.title}</span>
              <Star size={16} className="text-gray-400" />
            </div>
            <div className="flex space-x-3 text-xs text-gray-600">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span>Format</span>
              <span>Data</span>
              <span>Tools</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-medium flex items-center">
            <Check size={18} className="mr-2" /> Share
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm">A</div>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-grow overflow-auto bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-10 bg-gray-100 border border-gray-200"></th>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(col => (
                <th key={col} className="bg-gray-100 border border-gray-200 py-1 text-xs font-normal text-gray-600 w-32">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="bg-gray-100 border border-gray-200 text-center text-xs text-gray-600">{rowIndex + 1}</td>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(col => {
                  const isTarget = col === 'E' && rowIndex === 44; // E45
                  return (
                    <td 
                      key={col} 
                      className={`border border-gray-200 px-2 py-1 text-sm relative ${isTarget ? 'bg-blue-50 ring-2 ring-blue-500 z-10' : ''}`}
                    >
                      {isTarget ? (
                        <div className="flex justify-between items-center">
                          <motion.span
                            animate={applied ? { color: '#059669', fontWeight: 'bold' } : {}}
                          >
                            {applied ? signal.simulationData?.newValue : signal.simulationData?.originalValue}
                          </motion.span>
                          {step >= 1 && !applied && (
                            <motion.button 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              onClick={() => setApplied(true)}
                              className="absolute -top-10 left-0 bg-blue-600 text-white px-3 py-1 rounded shadow-lg text-xs whitespace-nowrap"
                            >
                              Apply Fix: {signal.simulationData?.newValue}
                            </motion.button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">---</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-8"
    >
      <div className="w-full h-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {signal.source === 'gmail' && renderGmail()}
        {signal.source === 'docs' && renderDocs()}
        {signal.source === 'sheets' && renderSheets()}
        
        {/* Fallback for other sources */}
        {['calendar'].includes(signal.source) && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <CalendarIcon size={64} className="text-orange-500" />
            <h2 className="text-2xl font-bold">Simulating {signal.source}...</h2>
            <p className="text-gray-500">This feature is coming soon for {signal.source}.</p>
            <button onClick={onClose} className="px-6 py-2 bg-gray-900 text-white rounded-full">Go Back</button>
          </div>
        )}

        {/* Floating Control */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-4 border border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium">Simulation Active</span>
          </div>
          <div className="w-px h-4 bg-gray-700"></div>
          <button onClick={onClose} className="text-sm font-bold hover:text-gray-300 transition-colors">Exit Simulation</button>
        </div>
      </div>
    </motion.div>
  );
};
