const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherAPI {
  static async getCurrentWeather(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      current: {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        weather: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
      },
    };
  }

  static async getForecast(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    return await response.json();
  }

  static async searchLocations(query: string) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search locations');
    }
    
    return await response.json();
  }

  static getWeatherIconUrl(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}