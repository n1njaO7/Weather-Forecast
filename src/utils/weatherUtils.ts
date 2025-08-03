export function getWeatherBackground(weatherMain: string, icon: string): string {
  const isDayTime = icon.includes('d');
  
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return isDayTime 
        ? 'from-[#6a11cb] to-[#2575fc]' // Changed: Custom gradient for clear day weather
        : 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for clear night weather
    case 'clouds':
      return isDayTime
        ? 'from-[#6a11cb] to-[#2575fc]' // Changed: Custom gradient for cloudy day weather
        : 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for cloudy night weather
    case 'rain':
    case 'drizzle':
      return 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for rainy weather
    case 'thunderstorm':
      return 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for thunderstorm weather
    case 'snow':
      return 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for snowy weather
    case 'mist':
    case 'fog':
    case 'haze':
      return 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for misty/foggy weather
    default:
      return isDayTime
        ? 'from-[#6a11cb] to-[#2575fc]' // Changed: Custom gradient for default day weather
        : 'from-[#6a11cb] to-[#2575fc]'; // Changed: Custom gradient for default night weather
  }
}

export function getTemperatureColor(temp: number): string {
  if (temp >= 30) return 'text-red-300';
  if (temp >= 20) return 'text-orange-300';
  if (temp >= 10) return 'text-yellow-300';
  if (temp >= 0) return 'text-green-300';
  return 'text-blue-300';
}