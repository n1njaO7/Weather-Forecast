export function getWeatherBackground(weatherMain: string, icon: string): string {
  const isDayTime = icon.includes('d');
  
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return isDayTime 
        ? 'from-blue-400 via-blue-500 to-blue-600'
        : 'from-indigo-900 via-purple-900 to-blue-900';
    case 'clouds':
      return isDayTime
        ? 'from-gray-400 via-gray-500 to-gray-600'
        : 'from-gray-700 via-gray-800 to-gray-900';
    case 'rain':
    case 'drizzle':
      return 'from-gray-600 via-blue-700 to-blue-800';
    case 'thunderstorm':
      return 'from-gray-800 via-gray-900 to-black';
    case 'snow':
      return 'from-blue-200 via-blue-300 to-blue-400';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'from-gray-300 via-gray-400 to-gray-500';
    default:
      return isDayTime
        ? 'from-blue-400 via-blue-500 to-blue-600'
        : 'from-indigo-900 via-purple-900 to-blue-900';
  }
}

export function getTemperatureColor(temp: number): string {
  if (temp >= 30) return 'text-red-300';
  if (temp >= 20) return 'text-orange-300';
  if (temp >= 10) return 'text-yellow-300';
  if (temp >= 0) return 'text-green-300';
  return 'text-blue-300';
}