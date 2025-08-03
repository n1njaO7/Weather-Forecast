export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

export interface LocationData {
  name: string;
  country: string;
  lat: number;
  lon: number;
}