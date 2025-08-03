import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '../types/weather';
import { WeatherAPI } from '../services/weatherApi';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherAPI.getCurrentWeather(lat, lon),
        WeatherAPI.getForecast(lat, lon)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const initializeWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Default to London if geolocation fails
          fetchWeatherData(51.5074, -0.1278);
        }
      );
    } else {
      // Default to London if geolocation is not supported
      fetchWeatherData(51.5074, -0.1278);
    }
  };

  useEffect(() => {
    initializeWeather();
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherData,
    retry: initializeWeather
  };
}