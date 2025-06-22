# AI Ebook Formatter

A React application that uses Google's Gemini AI to format raw text content into well-structured ebooks and generate PDFs.

## Features

- AI-powered content formatting using Google Gemini
- Multiple ebook themes and styling options
- PDF generation with custom styling
- Modern, responsive UI with dark mode support

## Prerequisites

- Node.js (version 16 or higher)
- Google Gemini API key

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   - Get your Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory
   - Add your API key to the `.env` file:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

1. Paste your raw ebook content into the input area
2. Click "Format Content" to process it with AI
3. Select a theme for styling
4. Click "Download PDF" to generate and download your formatted ebook

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required)
