import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'route.finder': 'Rural Bus Route Finder',
    'route.subtitle': 'Find the best route to your village',
    'search.from': 'From (City)',
    'search.to': 'To (Village/Town)',
    'search.placeholder.from': 'Enter city name',
    'search.placeholder.to': 'Enter village name',
    'search.find': 'Find Route',
    'search.finding': 'Finding Route...',
    'search.quick': 'Quick search:',
    'journey.steps': 'Journey Steps',
    'journey.transfers': 'transfer',
    'journey.transfers.plural': 'transfers',
    'journey.take.bus': 'Take',
    'journey.walk': 'Walk',
    'journey.steps.count': 'Steps',
    'journey.bus.rides': 'Bus Rides',
    'journey.transfers.count': 'Transfers',
    'journey.total.time': 'Total Time',
    'journey.estimated.fare': 'Estimated Fare',
    'route.fastest': 'Fastest Route',
    'route.cheapest': 'Budget Route',
    'route.comfortable': 'Comfort Route',
    'route.direct': 'Direct Route',
    'route.map': 'Route Map',
    'voice.search': 'Voice Search',
    'return.trip': 'Plan Return Trip'
  },
  te: {
    'route.finder': 'గ్రామీణ బస్సు మార్గ కనుగొనే యంత్రం',
    'route.subtitle': 'మీ గ్రామానికి ఉత్తమ మార్గాన్ని కనుగొనండి',
    'search.from': 'నుండి (నగరం)',
    'search.to': 'వరకు (గ్రామం/పట్టణం)',
    'search.placeholder.from': 'నగర పేరు నమోదు చేయండి',
    'search.placeholder.to': 'గ్రామ పేరు నమోదు చేయండి',
    'search.find': 'మార్గం కనుగొనండి',
    'search.finding': 'మార్గం వెతుకుతోంది...',
    'search.quick': 'శీఘ్ర శోధన:',
    'journey.steps': 'ప్రయాణ దశలు',
    'journey.transfers': 'మార్పు',
    'journey.transfers.plural': 'మార్పులు',
    'journey.take.bus': 'తీసుకోండి',
    'journey.walk': 'నడవండి',
    'journey.steps.count': 'దశలు',
    'journey.bus.rides': 'బస్సు ప్రయాణలు',
    'journey.transfers.count': 'మార్పులు',
    'journey.total.time': 'మొత్తం సమయం',
    'journey.estimated.fare': 'అంచనా ధర',
    'route.fastest': 'వేగవంతమైన మార్గం',
    'route.cheapest': 'చౌక మార్గం',
    'route.comfortable': 'సౌకర్య మార్గం',
    'route.direct': 'ప్రత్యక్ష మార్గం',
    'route.map': 'మార్గ పటం',
    'voice.search': 'వాయిస్ శోధన',
    'return.trip': 'తిరుగు ప్రయాణం ప్లాన్ చేయండి'
  },
  hi: {
    'route.finder': 'ग्रामीण बस मार्ग खोजक',
    'route.subtitle': 'अपने गाँव के लिए सर्वोत्तम मार्ग खोजें',
    'search.from': 'से (शहर)',
    'search.to': 'तक (गाँव/कस्बा)',
    'search.placeholder.from': 'शहर का नाम दर्ज करें',
    'search.placeholder.to': 'गाँव का नाम दर्ज करें',
    'search.find': 'मार्ग खोजें',
    'search.finding': 'मार्ग खोजा जा रहा है...',
    'search.quick': 'त्वरित खोज:',
    'journey.steps': 'यात्रा चरण',
    'journey.transfers': 'बदलाव',
    'journey.transfers.plural': 'बदलाव',
    'journey.take.bus': 'लें',
    'journey.walk': 'चलें',
    'journey.steps.count': 'चरण',
    'journey.bus.rides': 'बस यात्राएँ',
    'journey.transfers.count': 'बदलाव',
    'journey.total.time': 'कुल समय',
    'journey.estimated.fare': 'अनुमानित किराया',
    'route.fastest': 'सबसे तेज़ मार्ग',
    'route.cheapest': 'किफायती मार्ग',
    'route.comfortable': 'सुविधाजनक मार्ग',
    'route.direct': 'सीधा मार्ग',
    'route.map': 'मार्ग मानचित्र',
    'voice.search': 'वॉइस खोज',
    'return.trip': 'वापसी यात्रा की योजना बनाएं'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language') as Language | null;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : prev === 'te' ? 'hi' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};