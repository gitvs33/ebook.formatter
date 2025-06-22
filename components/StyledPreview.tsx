import React from 'react';
import { EbookTheme, StyleAttributes } from '../styles/themes';

// Types for content parsing (can be shared with pdfGenerator if refactored)
type PDFElementType = 'title' | 'author' | 'introduction' | 'chapter' | 'section' | 'paragraph' | 'blank';

interface PDFElement {
  text: string;
  type: PDFElementType;
  key: string; // For React list keys
}

const parseContentForPreview = (content: string): PDFElement[] => {
  const lines = content.split('\n');
  const pdfElements: PDFElement[] = [];
  let isIntroductionSection = false;
  let elementKey = 0;

  for (const line of lines) {
    elementKey++;
    if (line.startsWith('#T# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'title', key: `el-${elementKey}` });
      isIntroductionSection = false;
    } else if (line.startsWith('#A# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'author', key: `el-${elementKey}` });
      isIntroductionSection = false;
    } else if (line.trim() === '#I#') {
      // #I# itself doesn't render text, but sets the mode for subsequent paragraphs
      isIntroductionSection = true; 
    } else if (line.startsWith('#C# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'chapter', key: `el-${elementKey}` });
      isIntroductionSection = false;
    } else if (line.startsWith('#S# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'section', key: `el-${elementKey}` });
      isIntroductionSection = false;
    } else if (line.trim() === '') {
       // Represent blank lines with a non-breaking space to ensure they take up some space for styling
      pdfElements.push({ text: '\u00A0', type: 'blank', key: `el-${elementKey}` });
    } else {
      pdfElements.push({ text: line.trim(), type: isIntroductionSection ? 'introduction' : 'paragraph', key: `el-${elementKey}` });
    }
  }
  // Filter out #I# markers as they are control elements, not displayable text elements
  return pdfElements.filter(el => el.text.trim() !== '#I#');
};


const getWebFontFamily = (pdfFont?: 'helvetica' | 'times' | 'courier'): string => {
  switch (pdfFont) {
    case 'helvetica':
      return 'Helvetica, Arial, sans-serif';
    case 'times':
      return '"Times New Roman", Times, serif';
    case 'courier':
      return '"Courier New", Courier, monospace';
    default:
      return 'Helvetica, Arial, sans-serif'; // Default web-safe font
  }
};

const getElementStyle = (elementType: PDFElementType, theme: EbookTheme): React.CSSProperties => {
  let styleAttrs: StyleAttributes;
  let semanticElement: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' = 'p';

  switch (elementType) {
    case 'title':
      styleAttrs = theme.title;
      semanticElement = 'h1';
      break;
    case 'author':
      styleAttrs = theme.author;
      semanticElement = 'h4'; // Or a p with distinct styling
      break;
    case 'introduction':
      styleAttrs = theme.introduction;
      break;
    case 'chapter':
      styleAttrs = theme.chapter;
      semanticElement = 'h2';
      break;
    case 'section':
      styleAttrs = theme.section;
      semanticElement = 'h3';
      break;
    case 'paragraph':
    default:
      styleAttrs = theme.paragraph;
      break;
    case 'blank': // Handle blank lines specifically if needed, e.g. for consistent height
      return {
          fontSize: `${theme.paragraph.fontSize * 0.75}px`, // Smaller than normal text or fixed height
          lineHeight: theme.lineHeightFactor,
          height: `${theme.paragraph.spacingAfter > 0 ? theme.paragraph.spacingAfter / 2 : 2}px`, // Give it some height based on spacing
          display: 'block' // Ensure it takes block space
      };
  }
  
  const styles: React.CSSProperties = {
    fontFamily: getWebFontFamily(styleAttrs.fontFamily),
    fontSize: `${styleAttrs.fontSize}px`, // Assuming theme fontSize (pts for PDF) can be used as px for preview
    color: styleAttrs.color, // Restore the theme-specific color
    marginTop: `${styleAttrs.spacingBefore || 0}px`,
    marginBottom: `${styleAttrs.spacingAfter}px`,
    lineHeight: theme.lineHeightFactor,
    fontWeight: (styleAttrs.fontStyle && styleAttrs.fontStyle.includes('bold')) ? 'bold' : 'normal',
    fontStyle: (styleAttrs.fontStyle && styleAttrs.fontStyle.includes('italic')) ? 'italic' : 'normal',
    letterSpacing: styleAttrs.charSpace ? `${styleAttrs.charSpace / 10}em` : 'normal', // charSpace is usually small
  };

  if (elementType === 'title' || elementType === 'chapter' || elementType === 'section') {
      styles.display = 'block'; // Ensure headings take full width
  }
  
  return styles;
};


interface StyledPreviewProps {
  content: string;
  theme: EbookTheme;
}

export const StyledPreview: React.FC<StyledPreviewProps> = ({ content, theme }) => {
  if (!content.trim()) {
    return <p className="text-gray-400 dark:text-gray-500">Formatted content will appear here, styled according to the selected theme.</p>;
  }

  const elements = parseContentForPreview(content);

  const getTagName = (type: PDFElementType): keyof JSX.IntrinsicElements => {
    switch (type) {
        case 'title': return 'h1';
        case 'author': return 'h4'; // Using h4 for author for semantic structure
        case 'chapter': return 'h2';
        case 'section': return 'h3';
        case 'introduction':
        case 'paragraph':
        case 'blank': // Render blank lines as p or div to hold space
        default: return 'p';
    }
  }

  // Apply theme background
  const containerStyle: React.CSSProperties = {
    background: theme.backgroundGradient || theme.backgroundColor,
    minHeight: '100%',
    padding: '16px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      {elements.map((element) => {
        const style = getElementStyle(element.type, theme);
        const TagName = getTagName(element.type);
        
        // For blank lines, ensure they render with some content to take up space defined by styles
        const textContent = element.type === 'blank' ? '\u00A0' : element.text;

        return <TagName key={element.key} style={style}>{textContent}</TagName>;
      })}
    </div>
  );
};
