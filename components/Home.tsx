import React, { useState, useCallback } from 'react';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';
import { formatContentWithGemini } from '../services/geminiService';
import { downloadPdf } from '../utils/pdfGenerator';
import { SparklesIcon, DocumentArrowDownIcon, ExclamationTriangleIcon, PaintBrushIcon } from './IconComponents';
import { themes } from '../styles/themes'; 
import { StyledPreview } from './StyledPreview';

const Home: React.FC = () => {
  const [rawContent, setRawContent] = useState<string>('');
  const [formattedContent, setFormattedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedThemeName, setSelectedThemeName] = useState<string>(themes[0].name); 

  const handleFormatContent = useCallback(async () => {
    if (!rawContent.trim()) {
      setError('Please enter some content to format.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFormattedContent('');
    try {
      const result = await formatContentWithGemini(rawContent);
      setFormattedContent(result);
    } catch (err) {
      console.error("Formatting error:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during formatting.');
    } finally {
      setIsLoading(false);
    }
  }, [rawContent]);

  const selectedTheme = themes.find(theme => theme.name === selectedThemeName) || themes[0];

  const handleDownloadPdf = useCallback(() => {
    if (!formattedContent.trim()) {
      setError('No formatted content available to download.');
      return;
    }
    if (!selectedTheme) {
      setError('Selected theme not found. Please select a valid theme.');
      return;
    }
    try {
      downloadPdf(formattedContent, 'formatted_ebook.pdf', selectedTheme, null);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during PDF generation.');
    }
  }, [formattedContent, selectedTheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-stone-200 dark:from-slate-800 dark:via-gray-900 dark:to-stone-900 text-gray-800 dark:text-gray-200 py-6 sm:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
            AI Ebook Formatter
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Paste raw text, let AI format it, choose a style, and download your ebook PDF.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md flex items-center shadow-lg">
            <ExclamationTriangleIcon className="h-6 w-6 mr-3 text-red-500 dark:text-red-400" />
            <div>
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Input Content</h2>
            <textarea
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              placeholder="Paste your raw ebook content here..."
              className="w-full h-80 sm:h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-inner focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none transition-colors duration-300"
              aria-label="Raw ebook content input"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Formatted Output (Preview)</h2>
            <div
              className="w-full h-80 sm:h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-inner text-gray-800 dark:text-gray-200 overflow-y-auto transition-colors duration-300"
              aria-label="Styled preview of formatted ebook content"
              style={{ 
                lineHeight: selectedTheme.lineHeightFactor, 
                padding: `${selectedTheme.pageMargins / 2}px`, 
              }}
            >
              {isLoading && !formattedContent && <div className="flex justify-center items-center h-full"><LoadingSpinner /> <span className="ml-2">Formatting...</span></div>}
              {!isLoading && !formattedContent && !error && <p className="text-gray-400 dark:text-gray-500">Formatted content will appear here, styled according to the selected theme.</p>}
              {formattedContent && selectedTheme && <StyledPreview content={formattedContent} theme={selectedTheme} />}
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-10 flex flex-col items-center space-y-6">
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-xs mx-auto">
            <div className="w-full">
              <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Text Theme
              </label>
              <div className="relative">
                <select
                  id="theme-select"
                  value={selectedThemeName}
                  onChange={(e) => setSelectedThemeName(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm appearance-none"
                  aria-label="Select PDF styling theme"
                >
                  {themes.map(theme => (
                    <option key={theme.name} value={theme.name}>{theme.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <PaintBrushIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto pt-4">
            <Button
              onClick={handleFormatContent}
              disabled={isLoading || !rawContent.trim()}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              {isLoading ? 'Formatting...' : 'Format Content'}
            </Button>
            <Button
              onClick={handleDownloadPdf}
              disabled={isLoading || !formattedContent.trim()}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 