import { EbookTheme } from '../styles/themes'; 

declare var jsPDF: any;

type PDFElementType = 'title' | 'author' | 'introduction' | 'chapter' | 'section' | 'paragraph' | 'blank';

interface PDFElement {
  text: string;
  type: PDFElementType;
}

const parseFormattedContent = (content: string): PDFElement[] => {
  const lines = content.split('\n');
  const pdfElements: PDFElement[] = [];
  let isIntroductionSection = false;

  for (const line of lines) {
    if (line.startsWith('#T# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'title' });
      isIntroductionSection = false;
    } else if (line.startsWith('#A# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'author' });
      isIntroductionSection = false;
    } else if (line.trim() === '#I#') {
      isIntroductionSection = true; 
    } else if (line.startsWith('#C# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'chapter' });
      isIntroductionSection = false;
    } else if (line.startsWith('#S# ')) {
      pdfElements.push({ text: line.substring(4).trim(), type: 'section' });
      isIntroductionSection = false;
    } else if (line.trim() === '') {
      pdfElements.push({ text: '', type: 'blank' });
    }
    else {
      pdfElements.push({ text: line.trim(), type: isIntroductionSection ? 'introduction' : 'paragraph' });
    }
  }
  return pdfElements.filter(el => !(el.type === 'blank' && el.text === '')); 
};

export const downloadPdf = (
  formattedContent: string, 
  filename: string, 
  theme: EbookTheme,
  backgroundImageData: string | null // New parameter for background image base64 data
): void => {
  if (typeof jsPDF === 'undefined' && typeof (window as any).jspdf === 'undefined') {
    throw new Error('jsPDF library is not loaded. Please ensure it is included in your HTML.');
  }
  
  const JSPDFConstructor = typeof jsPDF !== 'undefined' ? jsPDF : (window as any).jspdf.jsPDF;
  if (!JSPDFConstructor) {
      throw new Error('jsPDF constructor could not be found. Please check library loading.');
  }

  const doc = new JSPDFConstructor({ unit: 'mm', format: 'a4' });
  const parsedElements = parseFormattedContent(formattedContent);

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = theme.pageMargins || 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // Function to add background image if available
  const addBackgroundImage = () => {
    if (backgroundImageData) {
      try {
        // Ensure image type is correctly inferred or specified if needed, assuming PNG for base64
        // The alias 'null' for image alias parameter might be needed if jsPDF errors on undefined
        doc.addImage(backgroundImageData, 'PNG', 0, 0, pageWidth, pageHeight, null, 'FAST');
      } catch (e) {
        console.error("Error adding background image:", e);
        // Optionally, inform the user or degrade gracefully
      }
    } else if (theme.backgroundColor && theme.backgroundColor !== '#FFFFFF') {
      // Add theme background color if no image is provided and theme has a non-white background
      try {
        doc.setFillColor(theme.backgroundColor);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
      } catch (e) {
        console.error("Error adding theme background color:", e);
      }
    }
  };
  
  // Add background to the first page
  addBackgroundImage();

  const addPageIfNeeded = (neededSpace: number) => {
    if (yPos + neededSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      // Add background to new pages
      addBackgroundImage();
    }
  };

  parsedElements.forEach((element) => {
    if (element.type === 'blank') {
        const blankSpace = (theme.paragraph.fontSize * (theme.lineHeightFactor || 1.4) * 0.352778) / 2 ; // approx half line height
        addPageIfNeeded(blankSpace); 
        yPos += blankSpace;
        return;
    }

    let style = theme.paragraph; 
    switch (element.type) {
      case 'title': style = theme.title; break;
      case 'author': style = theme.author; break;
      case 'introduction': style = theme.introduction; break;
      case 'chapter': style = theme.chapter; break;
      case 'section': style = theme.section; break;
    }

    if (style.spacingBefore && style.spacingBefore > 0) {
        addPageIfNeeded(style.spacingBefore);
        yPos += style.spacingBefore;
    }
    
    doc.setFont(style.fontFamily || 'helvetica', style.fontStyle || 'normal');
    doc.setFontSize(style.fontSize);
    doc.setTextColor(style.color || '#000000');
    
    const textToRender = element.text || " "; 
    const splitText = doc.splitTextToSize(textToRender, contentWidth);
    
    const textBlockHeight = (splitText.length * style.fontSize * (theme.lineHeightFactor || 1.4) * 0.352778);

    addPageIfNeeded(textBlockHeight);

    doc.text(splitText, margin, yPos, { charSpace: style.charSpace || 0, lineHeightFactor: (theme.lineHeightFactor || 1.4) });
    yPos += textBlockHeight;
    
    if (style.spacingAfter > 0) {
        addPageIfNeeded(style.spacingAfter);
        yPos += style.spacingAfter;
    }
  });

  doc.save(filename);
};
