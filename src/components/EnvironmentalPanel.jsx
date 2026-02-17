import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Sun, Moon, Sunrise, Sunset, Activity } from 'lucide-react';

const EnvironmentalPanel = ({ current, astronomy }) => {
    if (!current?.air_quality && !astronomy) return null;

    const aqi = current?.air_quality || {};
    const astro = astronomy?.astro || {};

    const aqiLevels = [
        { label: 'Good', color: 'text-green-400', bg: 'bg-green-500/20' },
        { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
        { label: 'Unhealthy', color: 'text-orange-400', bg: 'bg-orange-500/20' },
        { label: 'Hazardous', color: 'text-red-400', bg: 'bg-red-500/20' }
    ];

    const getAqiStatus = (index) => {
        if (index <= 1) return aqiLevels[0];
        if (index === 2) return aqiLevels[1];
        if (index === 3) return aqiLevels[2];
        return aqiLevels[3];
    };

    const usEpaIndex = aqi['us-epa-index'] || 0;
    const currentStatus = getAqiStatus(usEpaIndex);

    const pollutants = [
        { label: 'PM2.5', value: Math.round(aqi.pm2_5 || 0), unit: 'µg/m³' },
        { label: 'PM10', value: Math.round(aqi.pm10 || 0), unit: 'µg/m³' },
        { label: 'NO2', value: Math.round(aqi.no2 || 0), unit: 'µg/m³' },
        { label: 'O3', value: Math.round(aqi.o3 || 0), unit: 'µg/m³' },
    ];

    return (
        <div
            className="w-full"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem'
            }}
        >
            {/* Air Quality Card */}
            <div className="glass-card !p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Activity className="text-accent-primary" size={18} />
                        <h3 className="text-xs font-black uppercase tracking-widest opacity-60">Air Quality</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${currentStatus.bg} border border-white/5`}>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${currentStatus.color}`}>
                            {currentStatus.label}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-4xl font-black tracking-tighter">{usEpaIndex}</div>
                    <div className="flex-1">
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">EPA Index</div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`h-full flex-1 ${i <= usEpaIndex ? 'bg-accent-primary' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                        <p className="text-white/20 text-[7px] font-black uppercase tracking-widest">PM2.5</p>
                        <p className="text-xs font-bold">{Math.round(aqi.pm2_5 || 0)}</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                        <p className="text-white/20 text-[7px] font-black uppercase tracking-widest">O3</p>
                        <p className="text-xs font-bold">{Math.round(aqi.o3 || 0)}</p>
                    </div>
                </div>
            </div>

            {/* Sun Cycle */}
            <div className="glass-card !p-6 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-4">
                    <Sun className="text-amber-400" size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest opacity-60">Sun Cycle</h3>
                </div>

                <div className="flex justify-between items-center py-2 px-1">
                    <div className="flex flex-col items-center gap-1">
                        <Sunrise className="text-amber-400/50" size={24} />
                        <p className="text-sm font-bold">{astro.sunrise}</p>
                        <p className="text-[7px] font-black uppercase tracking-widest text-white/20">Sunrise</p>
                    </div>

                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mx-2" />

                    <div className="flex flex-col items-center gap-1">
                        <Sunset className="text-orange-500/50" size={24} />
                        <p className="text-sm font-bold">{astro.sunset}</p>
                        <p className="text-[7px] font-black uppercase tracking-widest text-white/20">Sunset</p>
                    </div>
                </div>
            </div>

            {/* Moon Phase */}
            <div className="glass-card !p-6 flex flex-col items-center justify-between text-center">
                <div className="flex items-center gap-2 mb-4 w-full justify-start text-left">
                    <Moon className="text-indigo-400" size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest opacity-60">Moon Phase</h3>
                </div>

                <div className="relative mb-2">
                    <Moon className="text-indigo-200 relative z-10" size={32} strokeWidth={1.5} />
                </div>

                <div className="mt-auto">
                    <p className="text-sm font-bold tracking-tight text-indigo-200">{astro.moon_phase}</p>
                    <p className="text-[7px] font-black uppercase tracking-widest text-white/20">Illumination {astro.moon_illumination}%</p>
                </div>
            </div>
        </div>
    );
};

export default EnvironmentalPanel;
