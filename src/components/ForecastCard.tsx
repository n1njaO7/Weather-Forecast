import React from 'react';
import { WeatherAPI } from '../services/weatherApi';
import { ForecastData } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastData;
  unit: 'C' | 'F';
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const convertTemp = (temp: number) => {
    return unit === 'F' ? Math.round((temp * 9/5) + 32) : temp;
  };

  // Group forecast by day and get one entry per day
  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      
      <div className="space-y-3">
        {dailyForecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <img
                src={WeatherAPI.getWeatherIconUrl(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-10 h-10"
              />
              <div>
                <div className="text-white font-medium">
                  {index === 0 ? 'Today' : getDayName(day.dt)}
                </div>
                <div className="text-white/70 text-sm capitalize">
                  {day.weather[0].description}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-semibold">
                {convertTemp(Math.round(day.main.temp_max))}°{unit}
              </div>
              <div className="text-white/70 text-sm">
                {convertTemp(Math.round(day.main.temp_min))}°{unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}