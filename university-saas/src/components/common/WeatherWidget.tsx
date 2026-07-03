import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer } from 'lucide-react';

interface WeatherData {
  temp: number;
  windspeed: number;
  weathercode: number;
  city: string;
}

const WMO_ICON: Record<number, React.ReactNode> = {};

function getWeatherIcon(code: number) {
  if (code === 0) return <Sun className="w-5 h-5 text-amber-400" />;
  if (code <= 3) return <Cloud className="w-5 h-5 text-slate-400" />;
  if (code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
  if (code <= 77) return <CloudSnow className="w-5 h-5 text-blue-200" />;
  return <CloudRain className="w-5 h-5 text-indigo-400" />;
}

function getWeatherLabel(code: number) {
  if (code === 0) return 'Ensoleillé';
  if (code <= 3) return 'Nuageux';
  if (code <= 67) return 'Pluvieux';
  if (code <= 77) return 'Neigeux';
  return 'Orageux';
}

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
          );
          const data = await res.json();
          const cw = data.current_weather;

          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const geoData = await geoRes.json();
          const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || 'Votre ville';

          setWeather({ temp: Math.round(cw.temperature), windspeed: Math.round(cw.windspeed), weathercode: cw.weathercode, city });
        } catch {
          setWeather({ temp: 21, windspeed: 12, weathercode: 1, city: 'Paris' });
        } finally {
          setLoading(false);
        }
      },
      () => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true')
          .then((r) => r.json())
          .then((data) => {
            const cw = data.current_weather;
            setWeather({ temp: Math.round(cw.temperature), windspeed: Math.round(cw.windspeed), weathercode: cw.weathercode, city: 'Paris' });
          })
          .catch(() => setWeather({ temp: 21, windspeed: 12, weathercode: 1, city: 'Paris' }))
          .finally(() => setLoading(false));
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 animate-pulse">
        <div className="w-4 h-4 bg-slate-200 rounded-full" />
        <div className="w-16 h-3 bg-slate-200 rounded" />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors cursor-default" title={`${weather.city} — ${getWeatherLabel(weather.weathercode)}`}>
      {getWeatherIcon(weather.weathercode)}
      <div className="text-xs">
        <span className="font-black text-slate-800">{weather.temp}°C</span>
        <span className="text-slate-400 ml-1 hidden sm:inline">{weather.city}</span>
      </div>
      <div className="hidden md:flex items-center gap-1 text-slate-400 text-xs">
        <Wind className="w-3 h-3" />
        <span>{weather.windspeed} km/h</span>
      </div>
    </div>
  );
};
