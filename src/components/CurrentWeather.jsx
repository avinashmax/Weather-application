import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Sun, Eye, MapPin, Clock } from 'lucide-react';

const CurrentWeather = ({ data }) => {
    if (!data || !data.current) return null;

    const { current, location } = data;

    const metrics = [
        { icon: <Wind size={24} />, label: 'Wind Speed', value: `${current.wind_kph} km/h`, color: 'text-blue-400' },
        { icon: <Droplets size={24} />, label: 'Humidity', value: `${current.humidity}%`, color: 'text-cyan-400' },
        { icon: <Sun size={24} />, label: 'UV Index', value: current.uv, color: 'text-amber-400' },
        { icon: <Eye size={24} />, label: 'Visibility', value: `${current.vis_km} km`, color: 'text-purple-400' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 120 } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 w-full"
        >
            <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
                <div className="text-left">
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <MapPin size={20} className="text-accent-primary" />
                        <span className="text-xl font-medium tracking-wide uppercase opacity-70">{location.country}</span>
                    </div>
                    <h1 className="location-title text-left">{location.name}</h1>
                    <div className="flex items-center gap-2 mt-2 text-white/40">
                        <Clock size={16} />
                        <span>{location.localtime}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="glass-card p-4 flex items-center gap-4 border-none shadow-none bg-white/5">
                        <img
                            src={current.condition.icon}
                            alt={current.condition.text}
                            className="w-16 h-16 rounded-2xl"
                        />
                        <div className="text-right">
                            <p className="text-2xl font-bold tracking-tight">{current.condition.text}</p>
                            <p className="text-white/40 text-sm">Condition Observed</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col md:flex-row items-center gap-12 py-4 text-left justify-start">
                <div className="relative">
                    <h2 className="hero-temp">{Math.round(current.temp_c)}°</h2>
                    <div className="absolute -top-4 -right-8 w-12 h-12 bg-accent-primary rounded-full blur-2xl opacity-50" />
                </div>
                <div className="flex flex-col md:border-l border-white/10 md:pl-12 gap-1 text-left">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-bold">Real Feel</span>
                    <span className="text-5xl font-semibold">{Math.round(current.feelslike_c)}°</span>
                    <p className="text-white/30 text-sm mt-2 max-w-[200px]">
                        The temperature currently feels significantly {current.feelslike_c > current.temp_c ? 'warmer' : 'cooler'} than the actual recording.
                    </p>
                </div>
            </motion.div>

            <motion.div
                variants={item}
                className="metrics-grid w-full"
            >
                {metrics.map((m) => (
                    <div key={m.label} className="glass-card metric-card flex flex-col items-center text-center !p-4 gap-2">
                        <div className={`${m.color} p-2 w-fit rounded-xl bg-white/5`}>
                            {m.icon}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-white/40 text-[9px] font-black uppercase tracking-wider">{m.label}</p>
                            <p className="text-lg font-bold tracking-tight">{m.value}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CurrentWeather;
