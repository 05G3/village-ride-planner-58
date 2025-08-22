import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface VoiceSearchProps {
  onVoiceResult: (from: string, to: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice search not supported",
        description: "Your browser doesn't support voice search",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      
      // Parse voice input to extract from and to locations
      const parseVoiceInput = (text: string) => {
        // English patterns
        const englishPatterns = [
          /(?:route from|from)\s+(.+?)\s+(?:to)\s+(.+)/,
          /(?:go from|travel from)\s+(.+?)\s+(?:to)\s+(.+)/,
          /(.+?)\s+(?:to)\s+(.+)/
        ];

        // Telugu patterns (phonetic)
        const teluguPatterns = [
          /(.+?)\s+(?:nunchi|nundi)\s+(.+?)\s+(?:varaku|ki)/,
          /(.+?)\s+(?:to)\s+(.+)/
        ];

        const patterns = language === 'te' ? [...teluguPatterns, ...englishPatterns] : englishPatterns;

        for (const pattern of patterns) {
          const match = text.match(pattern);
          if (match) {
            return {
              from: match[1].trim(),
              to: match[2].trim()
            };
          }
        }

        return null;
      };

      const parsed = parseVoiceInput(transcript);
      if (parsed) {
        onVoiceResult(parsed.from, parsed.to);
        toast({
          title: "Voice search successful",
          description: `Found route from ${parsed.from} to ${parsed.to}`
        });
      } else {
        toast({
          title: "Could not parse voice input",
          description: "Try saying 'route from [city] to [village]'",
          variant: "destructive"
        });
      }
    };

    recognition.onerror = (event: any) => {
      toast({
        title: "Voice search error",
        description: event.error,
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={startVoiceSearch}
      disabled={isListening}
      className="flex items-center gap-2"
    >
      {isListening ? (
        <>
          <MicOff className="h-4 w-4 animate-pulse text-destructive" />
          Listening...
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" />
          {t('voice.search')}
        </>
      )}
    </Button>
  );
};

export default VoiceSearch;