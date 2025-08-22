import React from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-2 ${language === 'en' ? 'bg-rural-green text-white' : ''}`}
      >
        EN
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage('te')}
        className={`flex items-center gap-2 ${language === 'te' ? 'bg-rural-green text-white' : ''}`}
      >
        తెలుగు
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage('hi')}
        className={`flex items-center gap-2 ${language === 'hi' ? 'bg-rural-green text-white' : ''}`}
      >
        हिंदी
      </Button>
    </div>
  );
};

export default LanguageToggle;