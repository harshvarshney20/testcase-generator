'use client';

import { motion } from 'framer-motion';
import { TestCase } from '@/types/testCase';

interface TestCaseSummaryProps {
  testCases: TestCase[];
  onViewDetails: (scrollToTable?: boolean) => void;
}

export default function TestCaseSummary({ testCases, onViewDetails }: TestCaseSummaryProps) {
  if (testCases.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No test cases generated yet. Upload your documents and click "Generate Test Cases".
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Generated Test Cases</h3>
          <div className="text-sm text-gray-500">
            {testCases.length} test cases generated
          </div>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {testCases.map((testCase, index) => (
            <motion.div
              key={testCase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <span className="text-indigo-600 mr-2">#{index + 1}</span>
                    {testCase.summary}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onViewDetails(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            View Full Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
