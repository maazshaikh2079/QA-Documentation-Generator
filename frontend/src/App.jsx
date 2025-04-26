import { useState } from 'react';
import TestCaseGen from './components/TestCaseGen';
import TestPlanGen from './components/TestPlanGen';
import DefectReportGen from './components/DefectReportGen';

const App = () => {
  const [activeTab, setActiveTab] = useState(null);

  const renderComponent = () => {
    switch (activeTab) {
      case 'testcase':
        return <TestCaseGen />;
      case 'testplan':
        return <TestPlanGen />;
      case 'defect':
        return <DefectReportGen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        {!activeTab ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                QA Documentation Generator
              </h1>
              <p className="text-gray-600 text-lg">
                Generate professional QA documentation with AI-powered assistance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
                onClick={() => setActiveTab('testplan')}
                className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-400 opacity-0 transition-opacity" />
                <img
                  src="test_plan.jpg"
                  alt="Test Plan"
                  className="relative z-10 h-28 w-28 mx-auto mb-6"
                />
                <h2 className="relative z-10 text-2xl font-bold text-gray-800 mb-3">
                  Test Plan Generator
                </h2>
                <p className="relative z-10 text-gray-600">
                  Design structured test plans effortlessly. Ideal for project planning and strategy.
                </p>
              </div>
              <div
                onClick={() => setActiveTab('testcase')}
                className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0" />
                <img
                  src="test_case.jpg"
                  alt="Test Case"
                  className="relative z-10 h-28 w-28 mx-auto mb-6 transform transition-transform"
                />
                <h2 className="relative z-10 text-2xl font-bold text-gray-800 mb-3">
                  Test Case Generator
                </h2>
                <p className="relative z-10 text-gray-600">
                  Create comprehensive test cases with AI assistance. Perfect for detailed testing scenarios.
                </p>
              </div>
              <div
                onClick={() => setActiveTab('defect')}
                className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0" />
                <img
                  src="defect_report.jpg"
                  alt="Defect Report"
                  className="relative z-10 h-28 w-28 mx-auto mb-6 transform transition-transform"
                />
                <h2 className="relative z-10 text-2xl font-bold text-gray-800 mb-3">
                  Defect Report Generator
                </h2>
                <p className="relative z-10 text-gray-600">
                  Document and track defects efficiently. Streamline your bug reporting process.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setActiveTab(null)}
              className="cursor-pointer mb-8 group flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-medium">Back to Dashboard</span>
            </button>
            {renderComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
