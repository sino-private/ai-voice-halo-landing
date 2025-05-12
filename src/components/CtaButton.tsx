
import React from 'react';

interface CtaButtonProps {
  text: string;
  link: string;
}

const CtaButton = ({ text, link }: CtaButtonProps) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aiPrimary hover:bg-aiPrimary/90 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-aiPrimary/20 transform hover:-translate-y-0.5"
    >
      {text}
    </a>
  );
};

export default CtaButton;
