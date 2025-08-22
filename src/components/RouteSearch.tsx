import React, { useState } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import LocationButton from '@/components/LocationButton';
import VoiceSearch from '@/components/VoiceSearch';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteSearchProps {
  onSearch: (from: string, to: string) => void;
  loading: boolean;
}

const RouteSearch: React.FC<RouteSearchProps> = ({ onSearch, loading }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      onSearch(from.trim(), to.trim());
    }
  };

  const handleVoiceResult = (voiceFrom: string, voiceTo: string) => {
    setFrom(voiceFrom);
    setTo(voiceTo);
  };

  const handleLocationFound = (latitude: number, longitude: number, address?: string) => {
    if (address) {
      // Try to extract city/area name from the address
      const addressParts = address.split(',');
      const cityName = addressParts.find(part => 
        part.trim().length > 0 && 
        !part.match(/^\d/) && 
        !part.includes('PIN') &&
        !part.includes('India')
      )?.trim() || `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
      
      setFrom(cityName);
    } else {
      setFrom(`Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
    }
  };

  const quickSearchOptions = [
    { from: 'Vijayawada', to: 'Kotha Rajanagaram' },
    { from: 'Hyderabad', to: 'Karimnagar' },
    { from: 'Warangal', to: 'Bhadrachalam' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              🚍 {t('route.finder')}
            </h1>
            <LanguageToggle />
          </div>
          <p className="text-muted-foreground">
            {t('route.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('search.from')}</label>
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t('search.placeholder.from')}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <LocationButton onLocationFound={handleLocationFound} />
                  <VoiceSearch onVoiceResult={handleVoiceResult} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('search.to')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('search.placeholder.to')}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={loading || !from.trim() || !to.trim()}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('search.finding')}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {t('search.find')}
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">{t('search.quick')}</p>
          <div className="flex flex-wrap gap-2">
            {quickSearchOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setFrom(option.from);
                  setTo(option.to);
                }}
                className="text-xs"
              >
                {option.from} <ArrowRight className="h-3 w-3 mx-1" /> {option.to}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteSearch;