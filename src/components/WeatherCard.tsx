import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherAPI } from '../services/weatherApi';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  const convertTemp = (temp: number) => {
    return unit === 'F' ? Math.round((temp * 9/5) + 32) : temp;
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          {weather.location.name}, {weather.location.country}
        </h2>
        <p className="text-white/80 capitalize">
          {weather.current.weather.description}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <img
          src={WeatherAPI.getWeatherIconUrl(weather.current.weather.icon)}
          alt={weather.current.weather.description}
          className="w-20 h-20 mr-4"
        />
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">
            {convertTemp(weather.current.temp)}°{unit}
          </div>
          <div className="text-white/80">
            Feels like {convertTemp(weather.current.feels_like)}°{unit}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Droplets className="h-6 w-6 text-blue-300 mx-auto mb-2" />
          <div className="text-white/80 text-sm">Humidity</div>
          <div className="text-white font-semibold">{weather.current.humidity}%</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Wind className="h-6 w-6 text-green-300 mx-auto mb-2" />
          <div className="text-white/80 text-sm">Wind</div>
          <div className="text-white font-semibold">
            {weather.current.wind_speed} m/s {getWindDirection(weather.current.wind_deg)}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Gauge className="h-6 w-6 text-purple-300 mx-auto mb-2" />
          <div className="text-white/80 text-sm">Pressure</div>
          <div className="text-white font-semibold">{weather.current.pressure} hPa</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Eye className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
          <div className="text-white/80 text-sm">Visibility</div>
          <div className="text-white font-semibold">
            {Math.round(weather.current.visibility / 1000)} km
          </div>
        </div>
      </div>
    </div>
  );
}