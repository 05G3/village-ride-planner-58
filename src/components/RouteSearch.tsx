import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Bus, Navigation } from 'lucide-react';
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf shadow-strong mb-4">
            <Bus className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Plan Your Rural Journey
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover the easiest way to travel between villages. Find bus routes, schedules, and plan your trip with confidence.
        </p>
      </div>

      {/* Search Form Card */}
      <Card className="rural-card shadow-strong">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* From Location */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-rural-green" />
                  {t('search.from')}
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t('search.placeholder.from')}
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="rural-input pl-12 py-4 text-lg"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <LocationButton onLocationFound={handleLocationFound} />
                    <VoiceSearch onVoiceResult={handleVoiceResult} />
                  </div>
                </div>
              </div>

              {/* To Location */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-rural-orange" />
                  {t('search.to')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t('search.placeholder.to')}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="rural-input pl-12 py-4 text-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button 
              type="submit" 
              className="rural-button-primary w-full py-4 text-lg font-semibold touch-target" 
              disabled={loading || !from.trim() || !to.trim()}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('search.finding')}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5" />
                  {t('search.find')}
                </div>
              )}
            </Button>
          </form>

          {/* Quick Search Options */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Bus className="h-4 w-4" />
              {t('search.quick')}
            </p>
            <div className="flex flex-wrap gap-3">
              {quickSearchOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFrom(option.from);
                    setTo(option.to);
                  }}
                  className="text-sm border-rural-green/30 text-rural-green hover:bg-rural-green hover:text-white transition-smooth"
                >
                  {option.from} <ArrowRight className="h-4 w-4 mx-2" /> {option.to}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="rural-card text-center p-6 hover:scale-105 transition-smooth">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-green/10 mx-auto mb-4">
            <MapPin className="h-6 w-6 text-rural-green" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Offline Maps</h3>
          <p className="text-muted-foreground text-sm">Download routes for offline use in remote areas</p>
        </Card>

        <Card className="rural-card text-center p-6 hover:scale-105 transition-smooth">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-orange/10 mx-auto mb-4">
            <Bus className="h-6 w-6 text-rural-orange" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
          <p className="text-muted-foreground text-sm">Get live bus timings and route changes</p>
        </Card>

        <Card className="rural-card text-center p-6 hover:scale-105 transition-smooth">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-sky/10 mx-auto mb-4">
            <Navigation className="h-6 w-6 text-rural-sky" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Smart Navigation</h3>
          <p className="text-muted-foreground text-sm">Find the best routes with walking directions</p>
        </Card>
      </div>
    </div>
  );
};

export default RouteSearch;