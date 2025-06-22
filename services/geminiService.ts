import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Environment variable check:', {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      API_KEY: process.env.API_KEY,
      hasApiKey: !!apiKey
    });
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable not set. Please configure it to use the AI features.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const formatContentWithGemini = async (rawText: string): Promise<string> => {
  try {
    const client = getAiClient();
    const model = 'gemini-1.5-flash';

    const prompt = `You are an expert ebook formatter. Your task is to structure the provided raw text content into a clean, well-organized format suitable for an ebook.
The output MUST be plain text.
Identify and use the following markers for different content elements:
- Ebook Title: Start the line with '#T# ' (e.g., '#T# The Grand Adventure')
- Author Name: Start the line with '#A# ' (e.g., '#A# Jane Doe'). If no clear author, omit this marker.
- Introduction: Mark the beginning of the introduction section with '#I# ' on its own line, followed by the introduction paragraphs. If no clear introduction, omit this marker. Subsequent paragraphs of the introduction should be plain text.
- Chapter Titles: Start the line with '#C# ' (e.g., '#C# Chapter 1: The Beginning')
- Section Headings: Start the line with '#S# ' (e.g., '#S# Part 1.1: The Discovery')
- Paragraphs: Standard text, separated by a single blank line from other elements or markers. Preserve intentional line breaks within paragraphs if they seem poetic or for emphasis.

Do not use any other markdown (like **, _, \`\`\`), HTML, or special formatting characters beyond the specified markers.
Ensure the overall flow is logical and easy to read. If specific elements like Title or Author are not clearly identifiable in the raw text, omit their respective markers.

Here is the content to format:
---
${rawText}
---
`;

    const response = await client.models.generateContent({
      model: model,
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });
    
    if (response && response.text) {
        return response.text.trim();
    } else {
        console.error("Gemini API returned an unexpected response structure or empty text:", response);
        throw new Error("Failed to format content: The AI service returned an invalid response.");
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Handle different types of errors
    if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as any).message;
        if (errorMessage && errorMessage.includes('GEMINI_API_KEY')) {
            throw new Error("API Key is missing or not configured. Please set the GEMINI_API_KEY environment variable.");
        }
        throw new Error(`Failed to format content due to an API error: ${errorMessage}`);
    } else if (typeof error === 'string') {
        throw new Error(`Failed to format content: ${error}`);
    } else {
        throw new Error('Failed to format content due to an unknown API error. Please check the browser console for details.');
    }
  }
};
