import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';
import { WeatherAPI } from '../services/weatherApi';
import { LocationData } from '../types/weather';

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number) => void;
  isLoading: boolean;
}

export default function SearchBar({ onLocationSelect, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length > 2) {
        setSearchLoading(true);
        try {
          const locations = await WeatherAPI.searchLocations(query);
          setSuggestions(locations);
          setShowSuggestions(true);
        } catch (error) {
          setSuggestions([]);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleLocationSelect = (location: LocationData) => {
    setQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    onLocationSelect(location.lat, location.lon);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />
          {searchLoading && (
            <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white animate-spin" />
          )}
        </div>
        <button
          onClick={handleCurrentLocation}
          disabled={isLoading}
          className="ml-3 p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
        >
          <MapPin className="h-4 w-4" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl border border-white/30 shadow-lg z-10 overflow-hidden">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-white/20 transition-colors duration-150 flex items-center gap-2 text-gray-700"
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{location.name}, {location.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}