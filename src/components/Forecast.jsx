import React from 'react';
import { motion } from 'framer-motion';

const Forecast = ({ data }) => {
    if (!data || !data.forecast) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 flex flex-col h-full bg-white/[0.02]"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold tracking-tight">3-DAY FORECAST</h3>
                <div className="h-px flex-1 mx-4 bg-white/10" />
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    width: '100%'
                }}
            >
                {data.forecast.forecastday.map((day, i) => (
                    <motion.div
                        key={day.date}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group"
                    >
                        <span className="font-black text-lg uppercase tracking-wider text-accent-primary leading-tight mb-1">
                            {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
                        </span>
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-4">{day.date}</span>

                        <div className="p-3 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-500">
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 h-12" />
                        </div>

                        <span className="text-xs font-bold text-white/60 mb-6 max-w-[120px] line-clamp-2">
                            {day.day.condition.text}
                        </span>

                        <div className="flex gap-6 mt-auto pt-4 border-t border-white/5 w-full justify-center">
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-black text-white">{Math.round(day.day.maxtemp_c)}°</span>
                                <span className="text-[9px] uppercase font-bold text-white/20 tracking-[0.2em]">High</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-black text-white/40">{Math.round(day.day.mintemp_c)}°</span>
                                <span className="text-[9px] uppercase font-bold text-white/20 tracking-[0.2em]">Low</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-auto pt-6">
                <div className="p-4 rounded-2xl bg-accent-primary/5 border border-accent-primary/10">
                    <p className="text-[10px] uppercase font-bold text-accent-primary tracking-widest mb-1">Observation</p>
                    <p className="text-xs text-white/50 leading-relaxed">
                        Data provided by WeatherAPI. Accurate for the next 72 hours.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Forecast;
