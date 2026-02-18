import React, { useState, useEffect } from 'react';
import { weatherService } from './services/api';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HistoryView from './components/HistoryView';
import EnvironmentalPanel from './components/EnvironmentalPanel';
import AlertBanner from './components/AlertBanner';
import SportsEvents from './components/SportsEvents';
import Logo from './components/Logo';
import WeatherAnimations from './components/WeatherAnimations';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCw, LayoutDashboard, History as HistoryIcon } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [astronomyData, setAstronomyData] = useState(null);
  const [sportsData, setSportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'history'

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Current + 3-day Forecast (includes alerts/aqi)
      const forecast = await weatherService.getForecast(location, 3);
      setWeatherData(forecast);

      // 2. Fetch Astronomy and Sports
      const [astro, sports] = await Promise.all([
        weatherService.getAstronomyData(location),
        weatherService.getSportsData(location)
      ]);
      setAstronomyData(astro);
      setSportsData(sports);

      // 3. Fetch Last 7 Days History
      const historyPromises = [];
      const today = new Date();
      for (let i = 1; i <= 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        historyPromises.push(weatherService.getHistory(location, dateStr));
      }
      const results = await Promise.all(historyPromises);
      setHistoryData(results);

    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Could not fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050510]">
      {/* Dynamic Background Elements */}
      <AnimatePresence mode="wait">
        {weatherData && (
          <motion.img
            key={`img-${weatherData.location.country}`}
            src={`https://source.unsplash.com/featured/1920x1080?${weatherData.location.country},landmark,nature`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="country-bg-image"
            alt=""
          />
        )}
      </AnimatePresence>

      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary blur-[150px] opacity-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary blur-[150px] opacity-10 pointer-events-none" />

      <WeatherAnimations conditionCode={weatherData?.current?.condition?.code} />

      <AnimatePresence>
        {weatherData && (
          <motion.div
            key={weatherData.location.country}
            initial={{ opacity: 0, scale: 1.1, x: 100 }}
            animate={{ opacity: 0.05, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="country-bg-text"
          >
            {weatherData.location.country}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="premium-container relative z-10 min-h-screen flex flex-col">
        <header className="weather-header py-8">
          <div className="flex-1 flex justify-start">
            <SearchBar onSelectLocation={fetchWeatherData} />
          </div>

          <div className="flex-shrink-0 mx-8">
            <Logo />
          </div>

          <div className="flex-1 flex justify-end">
            {/* Bulletproof Ultra-Premium Navigation */}
            <div className="premium-nav-container">
              <motion.div
                layoutId="luxuryIndicator"
                className="nav-indicator-pill"
                initial={false}
                animate={{
                  left: viewMode === 'current' ? '6px' : 'calc(50% + 2px)',
                  right: viewMode === 'current' ? 'calc(50% + 2px)' : '6px',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />

              <button
                onClick={() => setViewMode('current')}
                className={`premium-nav-btn ${viewMode === 'current' ? 'active' : ''}`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`premium-nav-btn ${viewMode === 'history' ? 'active' : ''}`}
              >
                <HistoryIcon size={20} />
                <span>History</span>
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center py-20"
            >
              <div className="relative">
                <div className="w-20 h-20 border-2 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
                <div className="absolute inset-0 w-20 h-20 border-2 border-accent-secondary/10 border-b-accent-secondary rounded-full animate-spin [animation-duration:2s]" />
              </div>
              <p className="mt-8 text-2xl font-light tracking-widest text-gradient animate-pulse">
                SYNCING ATMOSPHERE
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center py-20"
            >
              <div className="glass-card p-12 flex flex-col items-center max-w-md text-center border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                <div className="bg-red-500/10 p-4 rounded-full mb-6">
                  <AlertCircle size={48} className="text-red-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Sync Interrupted</h3>
                <p className="text-white/50 mb-8">
                  {error.includes('API key') || error.includes('401')
                    ? "Your API key appears to be invalid or restricted. Please check your WeatherAPI dashboard."
                    : error}
                </p>
                <div className="flex flex-col gap-4 w-full">
                  <button
                    onClick={() => fetchWeatherData(weatherData?.location?.name || 'London')}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-105 active:scale-95"
                  >
                    <RefreshCw size={18} />
                    <span>Try Again</span>
                  </button>

                  {(error.includes('API key') || error.includes('401')) && (
                    <a
                      href="https://www.weatherapi.com/my/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium tracking-widest text-accent-primary uppercase hover:opacity-80 transition-opacity"
                    >
                      WeatherAPI Dashboard →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="flex-1"
            >
              {viewMode === 'current' ? (
                <div className="flex flex-col gap-8 pb-12">
                  <AlertBanner alerts={weatherData.alerts} />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                      <CurrentWeather data={weatherData} />
                      <EnvironmentalPanel
                        current={weatherData.current}
                        astronomy={astronomyData}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <Forecast data={weatherData} />
                    </div>
                  </div>

                  <SportsEvents sports={sportsData} />
                </div>
              ) : (
                <div className="pb-12">
                  <HistoryView data={historyData} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="py-12 mt-auto text-center">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-6" />
          <p className="text-white/20 text-xs font-medium tracking-[0.2em] uppercase">
            Powered by WeatherAPI.com & Antigravity Design
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
