'use client';

import { useState } from 'react';
import { FiCopy, FiCheck, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { TestCase } from '@/types/testCase';

interface TestCaseTableProps {
  testCases: TestCase[];
  className?: string;
}

export default function TestCaseTable({ testCases, className = '' }: TestCaseTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    const headers = ['#', 'Summary', 'Given', 'When', 'Then'];
    const csvContent = [
      headers.join(','),
      ...testCases.map((testCase, index) => 
        [
          index + 1,
          `"${testCase.summary}"`,
          `"${testCase.given}"`,
          `"${testCase.when}"`,
          `"${testCase.then}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `test-cases-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (testCases.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No test cases generated yet. Upload your documents and click "Generate Test Cases".
      </div>
    );
  }

  return (
    <div className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Generated Test Cases</h3>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Summary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Given (Precondition)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  When (Action)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Then (Verification)
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testCases.map((testCase, index) => (
                <motion.tr
                  key={testCase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {testCase.summary}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {testCase.given}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {testCase.when}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {testCase.then}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => copyToClipboard(
                        `Summary: ${testCase.summary}\n\nGiven: ${testCase.given}\nWhen: ${testCase.when}\nThen: ${testCase.then}`,
                        testCase.id
                      )}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      title="Copy test case"
                    >
                      {copiedId === testCase.id ? (
                        <FiCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <FiCopy className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
