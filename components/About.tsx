import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-stone-200 dark:from-slate-800 dark:via-gray-900 dark:to-stone-900 text-gray-800 dark:text-gray-200 py-6 sm:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
            About AI Ebook Formatter
          </h1>
        </header>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Transform Your Content with AI-Powered Formatting
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              AI Ebook Formatter is a cutting-edge tool that leverages the power of Google's Gemini AI to transform 
              raw text content into beautifully formatted ebooks. Whether you're an author, content creator, or 
              educator, our platform helps you create professional-looking PDFs with minimal effort.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Key Features
            </h3>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li><strong>AI-Powered Formatting:</strong> Advanced natural language processing to structure and enhance your content</li>
              <li><strong>Multiple Themes:</strong> Choose from various professional styling options</li>
              <li><strong>Instant Preview:</strong> See your formatted content before downloading</li>
              <li><strong>PDF Export:</strong> Download your formatted ebook as a high-quality PDF</li>
              <li><strong>User-Friendly Interface:</strong> Simple, intuitive design for seamless workflow</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              How It Works
            </h3>
            
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Paste your raw text content into the input area</li>
              <li>Click "Format Content" to process with AI</li>
              <li>Preview the formatted result in real-time</li>
              <li>Select your preferred styling theme</li>
              <li>Download your professionally formatted PDF</li>
            </ol>

            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Technology Stack
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Built with modern web technologies including React, TypeScript, and powered by Google's Gemini AI API. 
              Our platform ensures fast, reliable, and secure content processing.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">
                Ready to Get Started?
              </h4>
              <p className="text-purple-600 dark:text-purple-400">
                Try our AI Ebook Formatter today and experience the future of content formatting. 
                Transform your raw text into professional ebooks in minutes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 