'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiCheck, FiFileText, FiFile, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import TestCaseTable from '@/app/components/test-case/TestCaseTable';
import TestCaseSummary from '@/app/components/test-case/TestCaseSummary';
import { TestCase } from '@/types/testCase';

interface TestConfig {
  testCaseTypes: string[];
  outputFormat: string;
}

const DEFAULT_CONFIG: TestConfig = {
  testCaseTypes: [],
  outputFormat: 'Excel File (.xlsx)'
};

export default function TestCaseGeneratorPage() {
  const [config, setConfig] = useState<TestConfig>(DEFAULT_CONFIG);
  const { testCaseTypes, outputFormat } = config;
  const [pumlFile, setPumlFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = (scrollToTable = false) => {
    setShowFullDetails(true);
    if (scrollToTable && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const testTypes = [
    'Functional Testing',
    'Integration Testing',
    'Regression Testing',
    'Performance Testing',
    'Security Testing',
    'API Testing'
  ];

  const outputFormats = [
    'Excel File (.xlsx)',
    'Postman Collection (.json)',
    'TestRail Import (.json)'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'puml' | 'pdf') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'puml') setPumlFile(file);
      else setPdfFile(file);
    }
  };

  const toggleTestType = (type: string) => {
    setConfig((prev) => ({
      ...prev,
      testCaseTypes: prev.testCaseTypes.includes(type)
        ? prev.testCaseTypes.filter((t) => t !== type)
        : [...prev.testCaseTypes, type]
    }));
  };

  const handleOutputFormatChange = (format: string) => {
    setConfig((prev) => ({
      ...prev,
      outputFormat: format
    }));
  };

  const isFormComplete = () => {
    return testCaseTypes.length > 0 && outputFormat && pumlFile && pdfFile;
  };

  const handleGenerateTestCases = () => {
    if (!isFormComplete()) return;
    
    setIsGenerating(true);
    
    // Simulate API call to generate test cases
    setTimeout(() => {
      const newTestCases: TestCase[] = [
        {
          id: 'TC-001',
          summary: 'Verify user can login with valid credentials',
          given: 'User has valid credentials and is not logged in',
          when: 'User submits login form with valid email and password',
          then: 'User should be redirected to dashboard and session should be created',
          testCaseType: 'Functional',
          status: 'draft',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'TC-002',
          summary: 'Verify error message with invalid credentials',
          given: 'User is on login page',
          when: 'User submits login form with invalid email or password',
          then: 'Appropriate error message should be displayed',
          testCaseType: 'Functional',
          status: 'draft',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'TC-003',
          summary: 'Verify password reset functionality',
          given: 'User has requested password reset',
          when: 'User clicks on reset link and submits new password',
          then: 'Password should be updated and user should be able to login with new password',
          testCaseType: 'Functional',
          status: 'draft',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'TC-004',
          summary: 'Verify session timeout after 30 minutes of inactivity',
          given: 'User is logged in and inactive for 30 minutes',
          when: 'User performs any action after session timeout',
          then: 'User should be redirected to login page',
          testCaseType: 'Security',
          status: 'draft',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'TC-005',
          summary: 'Verify concurrent login prevention',
          given: 'User is already logged in from one device',
          when: 'Same user logs in from another device',
          then: 'First session should be terminated and user should be notified',
          testCaseType: 'Security',
          status: 'draft',
          lastUpdated: new Date().toISOString()
        }
      ];
      
      setTestCases(newTestCases);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Test Case Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your design documents and let Tele Test generate test cases of your choice.
          </p>
        </motion.div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left side - Configuration and File Upload */}
              <div className="space-y-8">
                {/* Test Case Types */}
                <div className="space-y-6 bg-white/50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FiFileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Test Case Types</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Select the types of test cases to generate</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {testTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleTestType(type)}
                          className={`flex items-center px-4 py-3 rounded-lg border transition-all ${
                            config.testCaseTypes.includes(type)
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 flex items-center justify-center ${
                            config.testCaseTypes.includes(type)
                              ? 'border-indigo-500 bg-indigo-500 text-white'
                              : 'border-gray-300 bg-white'
                          }`}>
                            {config.testCaseTypes.includes(type) && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Output Format */}
                <div className="space-y-6 bg-white/50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FiFileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Output Format</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Select the output format for generated test cases</p>
                    <div className="space-y-2">
                      {outputFormats.map((format) => (
                        <button
                          key={format}
                          type="button"
                          onClick={() => handleOutputFormatChange(format)}
                          className={`w-full flex items-center px-4 py-3 rounded-lg border transition-all ${
                            outputFormat === format
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 flex items-center justify-center ${
                            outputFormat === format
                              ? 'border-indigo-500 bg-indigo-500 text-white'
                              : 'border-gray-300 bg-white'
                          }`}>
                            {outputFormat === format && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-sm font-medium">{format}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* File Uploads */}
                <div className="space-y-6 bg-white/50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FiUpload className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Upload Design Documents</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block">
                      <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
                        pumlFile ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white/50'
                      }`}>
                        <div className="p-3 bg-indigo-100 rounded-full mb-3">
                          <FiFile className="w-6 h-6 text-indigo-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {pumlFile ? pumlFile.name : 'Upload PUML File (LLD)'}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">.puml files only</p>
                        <span className="px-5 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                          {pumlFile ? 'Change File' : 'Select File'}
                        </span>
                        <input
                          type="file"
                          accept=".puml"
                          onChange={(e) => handleFileUpload(e, 'puml')}
                          className="hidden"
                        />
                      </div>
                    </label>
                    
                    <label className="block">
                      <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
                        pdfFile ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white/50'
                      }`}>
                        <div className="p-3 bg-indigo-100 rounded-full mb-3">
                          <FiFile className="w-6 h-6 text-indigo-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {pdfFile ? pdfFile.name : 'Upload PDF File (API Spec)'}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">.pdf files only</p>
                        <span className="px-5 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                          {pdfFile ? 'Change File' : 'Select File'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, 'pdf')}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={handleGenerateTestCases}
                  disabled={!isFormComplete() || isGenerating}
                  className={`w-full group relative overflow-hidden flex items-center justify-center py-4 px-6 rounded-xl text-base font-medium text-white transition-all duration-300 ${
                    isFormComplete() 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-200' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <span className={`relative z-10 flex items-center ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
                    Generate Test Cases
                    <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Right side - Test Cases Summary */}
              <div className="lg:pl-8">
                <TestCaseSummary 
                  testCases={testCases} 
                  onViewDetails={handleViewDetails} 
                />
              </div>
            </div>
          </div>
          
          {/* Full Test Cases Table Section */}
          <div ref={tableRef}>
          {showFullDetails && testCases.length > 0 && (
            <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <button 
                    onClick={() => setShowFullDetails(false)}
                    className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    title="Back to summary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  Detailed Test Cases
                </h2>
                <div className="text-sm text-gray-500">
                  {testCases.length} test cases
                </div>
              </div>
              <TestCaseTable testCases={testCases} />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
