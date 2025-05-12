
import React from 'react';
import { ArrowRight } from 'lucide-react';

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
      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-aiPrimary to-aiPrimary/90 hover:from-aiPrimary/90 hover:to-aiPrimary rounded-lg transition-all duration-300 shadow-lg hover:shadow-aiPrimary/30 transform hover:-translate-y-0.5 group gap-2"
    >
      <span>{text}</span>
      <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

export default CtaButton;
