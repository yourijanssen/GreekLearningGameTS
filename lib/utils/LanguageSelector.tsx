import { LanguageOption } from '@/types/auth';
import React from 'react';

interface LanguageSelectorProps {
  selectedLanguage: LanguageOption;
  onLanguageChange: (language: LanguageOption) => void;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <label style={{ marginRight: '1rem' }}>
        <input
          type="radio"
          value="english"
          checked={selectedLanguage === 'english'}
          onChange={(e) => onLanguageChange(e.target.value as LanguageOption)}
        /> English - Greek
      </label>
      <label>
        <input
          type="radio"
          value="dutch"
          checked={selectedLanguage === 'dutch'}
          onChange={(e) => onLanguageChange(e.target.value as LanguageOption)}
        /> Dutch - Greek
      </label>
    </div>
  );
};