import React, { useState } from 'react';
import { Cloud, Sun, ToggleLeft, ToggleRight } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import { getWeatherBackground } from './utils/weatherUtils';

function App() {
  const { weather, forecast, loading, error, fetchWeatherData, retry } = useWeather();
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const backgroundGradient = weather 
    ? getWeatherBackground(weather.current.weather.main, weather.current.weather.icon)
    : 'from-blue-400 via-blue-500 to-blue-600';

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchWeatherData(lat, lon);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000`}>
      <div className="min-h-screen bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="h-8 w-8 text-white" />
              <h1 className="text-3xl font-bold text-white">WeatherScope</h1>
            </div>
            <p className="text-white/80 text-lg">Real-time weather insights at your fingertips</p>
          </header>

          {/* Search and Unit Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <SearchBar onLocationSelect={handleLocationSelect} isLoading={loading} />
            
            <button
              onClick={toggleUnit}
              className="flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-200"
            >
              <span className={unit === 'C' ? 'font-bold' : 'opacity-70'}>°C</span>
              {unit === 'C' ? (
                <ToggleLeft className="h-5 w-5" />
              ) : (
                <ToggleRight className="h-5 w-5" />
              )}
              <span className={unit === 'F' ? 'font-bold' : 'opacity-70'}>°F</span>
            </button>
          </div>

          {/* Main Content */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={retry} />
          ) : weather && forecast ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <WeatherCard weather={weather} unit={unit} />
              <ForecastCard forecast={forecast} unit={unit} />
            </div>
          ) : null}

          {/* Footer */}
          <footer className="text-center mt-12 text-white/60">
            <p>Weather data provided by OpenWeatherMap</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;