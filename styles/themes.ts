export interface StyleAttributes {
  fontFamily?: 'helvetica' | 'times' | 'courier';
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  fontSize: number;
  color?: string; // Hex color string e.g., '#RRGGBB'
  spacingBefore?: number; // Space in mm before the element
  spacingAfter: number;   // Space in mm after the element
  charSpace?: number; // Optional character spacing
}

export interface EbookTheme {
  name: string;
  title: StyleAttributes;
  author: StyleAttributes;
  introduction: StyleAttributes;
  chapter: StyleAttributes;
  section: StyleAttributes;
  paragraph: StyleAttributes;
  pageMargins: number; // in mm
  lineHeightFactor: number;
  backgroundColor: string; // Background color for the theme
  backgroundGradient?: string; // Optional gradient background
}

export const themes: EbookTheme[] = [
  {
    name: "Default",
    pageMargins: 20,
    lineHeightFactor: 1.4,
    backgroundColor: "#FFFFFF",
    title: { fontSize: 24, fontStyle: 'bold', spacingBefore: 0, spacingAfter: 10, color: '#000000', fontFamily: 'helvetica' },
    author: { fontSize: 14, fontStyle: 'italic', spacingBefore: 0, spacingAfter: 8, color: '#555555', fontFamily: 'helvetica' },
    introduction: { fontSize: 12, fontStyle: 'normal', spacingBefore: 5, spacingAfter: 5, color: '#000000', fontFamily: 'helvetica' },
    chapter: { fontSize: 20, fontStyle: 'bold', spacingBefore: 10, spacingAfter: 8, color: '#000000', fontFamily: 'helvetica' },
    section: { fontSize: 16, fontStyle: 'bold', spacingBefore: 8, spacingAfter: 6, color: '#000000', fontFamily: 'helvetica' },
    paragraph: { fontSize: 12, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 4, color: '#000000', fontFamily: 'helvetica' },
  },
  {
    name: "Modern",
    pageMargins: 22,
    lineHeightFactor: 1.5,
    backgroundColor: "#F8FAFC",
    backgroundGradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
    title: { fontSize: 26, fontStyle: 'bold', spacingBefore: 0, spacingAfter: 12, color: '#2C3E50', fontFamily: 'helvetica' }, // Dark Blue-Gray
    author: { fontSize: 15, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 10, color: '#7F8C8D', fontFamily: 'helvetica' }, // Medium Gray
    introduction: { fontSize: 12, fontStyle: 'normal', spacingBefore: 6, spacingAfter: 6, color: '#34495E', fontFamily: 'helvetica' }, // Darker Blue-Gray
    chapter: { fontSize: 22, fontStyle: 'bold', spacingBefore: 12, spacingAfter: 10, color: '#16A085', fontFamily: 'helvetica' }, // Teal
    section: { fontSize: 18, fontStyle: 'bold', spacingBefore: 9, spacingAfter: 7, color: '#1ABC9C', fontFamily: 'helvetica' }, // Lighter Teal
    paragraph: { fontSize: 11, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 5, color: '#34495E', fontFamily: 'helvetica' },
  },
  {
    name: "Classic",
    pageMargins: 20,
    lineHeightFactor: 1.6,
    backgroundColor: "#FEFEFE",
    backgroundGradient: "linear-gradient(135deg, #FEFEFE 0%, #F5F5DC 100%)",
    title: { fontSize: 28, fontStyle: 'bold', spacingBefore: 0, spacingAfter: 14, color: '#000000', fontFamily: 'times' },
    author: { fontSize: 16, fontStyle: 'italic', spacingBefore: 0, spacingAfter: 12, color: '#2F2F2F', fontFamily: 'times' },
    introduction: { fontSize: 13, fontStyle: 'italic', spacingBefore: 7, spacingAfter: 7, color: '#000000', fontFamily: 'times' },
    chapter: { fontSize: 22, fontStyle: 'bold', spacingBefore: 12, spacingAfter: 9, color: '#000000', fontFamily: 'times' },
    section: { fontSize: 18, fontStyle: 'bold', spacingBefore: 9, spacingAfter: 7, color: '#000000', fontFamily: 'times' },
    paragraph: { fontSize: 12, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 4, color: '#000000', fontFamily: 'times' },
  },
  {
    name: "Minimalist",
    pageMargins: 25,
    lineHeightFactor: 1.45,
    backgroundColor: "#FAFAFA",
    title: { fontSize: 22, fontStyle: 'bold', spacingBefore: 0, spacingAfter: 10, color: '#111111', fontFamily: 'helvetica' },
    author: { fontSize: 13, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 8, color: '#444444', fontFamily: 'helvetica' },
    introduction: { fontSize: 11, fontStyle: 'normal', spacingBefore: 5, spacingAfter: 5, color: '#222222', fontFamily: 'helvetica' },
    chapter: { fontSize: 18, fontStyle: 'bold', spacingBefore: 10, spacingAfter: 7, color: '#111111', fontFamily: 'helvetica' },
    section: { fontSize: 15, fontStyle: 'bold', spacingBefore: 7, spacingAfter: 5, color: '#111111', fontFamily: 'helvetica' },
    paragraph: { fontSize: 11, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 4, color: '#222222', fontFamily: 'helvetica' },
  },
  {
    name: "Warm",
    pageMargins: 20,
    lineHeightFactor: 1.5,
    backgroundColor: "#FFF8F0",
    backgroundGradient: "linear-gradient(135deg, #FFF8F0 0%, #FEF3E2 100%)",
    title: { fontSize: 24, fontStyle: 'bold', spacingBefore: 0, spacingAfter: 12, color: '#8B4513', fontFamily: 'helvetica' },
    author: { fontSize: 14, fontStyle: 'italic', spacingBefore: 0, spacingAfter: 10, color: '#A0522D', fontFamily: 'helvetica' },
    introduction: { fontSize: 12, fontStyle: 'normal', spacingBefore: 6, spacingAfter: 6, color: '#654321', fontFamily: 'helvetica' },
    chapter: { fontSize: 20, fontStyle: 'bold', spacingBefore: 12, spacingAfter: 8, color: '#CD853F', fontFamily: 'helvetica' },
    section: { fontSize: 16, fontStyle: 'bold', spacingBefore: 8, spacingAfter: 6, color: '#D2691E', fontFamily: 'helvetica' },
    paragraph: { fontSize: 11, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 5, color: '#654321', fontFamily: 'helvetica' },
  },
  {
    name: "Cool",
    pageMargins: 22,
    lineHeightFactor: 1.4,
    backgroundColor: "#F0F8FF",
    backgroundGradient: "linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%)",
    title: { fontSize: 26, fontStyle: 'bold', spacingBefore: 0, spacingAfter: 12, color: '#1E3A8A', fontFamily: 'helvetica' },
    author: { fontSize: 15, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 10, color: '#475569', fontFamily: 'helvetica' },
    introduction: { fontSize: 12, fontStyle: 'normal', spacingBefore: 6, spacingAfter: 6, color: '#1E40AF', fontFamily: 'helvetica' },
    chapter: { fontSize: 22, fontStyle: 'bold', spacingBefore: 12, spacingAfter: 8, color: '#3B82F6', fontFamily: 'helvetica' },
    section: { fontSize: 18, fontStyle: 'bold', spacingBefore: 8, spacingAfter: 6, color: '#60A5FA', fontFamily: 'helvetica' },
    paragraph: { fontSize: 11, fontStyle: 'normal', spacingBefore: 0, spacingAfter: 5, color: '#1E40AF', fontFamily: 'helvetica' },
  }
];
