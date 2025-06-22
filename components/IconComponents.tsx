
import React from 'react';

interface IconProps {
  className?: string;
}

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.638-1.638L12 9.75l2.188-1.25a2.25 2.25 0 001.638-1.638L17 5.25l1.25 2.188a2.25 2.25 0 001.638 1.638L22.5 9.75l-2.188 1.25a2.25 2.25 0 00-1.638 1.638z" />
  </svg>
);

export const DocumentArrowDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const PaintBrushIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-3.013-1.325L3.655 15.5H2.25a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75h2.005l2.502-2.327ZM19.5 3.75l-3.344 3.344a4.5 4.5 0 00-5.286 6.832l-2.686 2.493V20.25h.5A.75.75 0 009 21H3a.75.75 0 00-.75-.75V18c0-.414.336-.75.75.75h.328l2.648-2.456A6 6 0 0115.75 3c1.233 0 2.404.372 3.398 1.052a.75.75 0 01.352.948l-.462 1.232a.75.75 0 01-.948.352A4.482 4.482 0 0015.75 4.5a4.5 4.5 0 00-3.344 1.406L15.75 9l3.75-3.75Z" />
  </svg>
);
