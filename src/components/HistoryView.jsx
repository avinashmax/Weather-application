import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Calendar } from 'lucide-react';

const HistoryView = ({ data }) => {
    if (!data || !data.length) return null;

    // Find max/min for chart scaling
    const temps = data.map(d => d.forecast.forecastday[0].day.avgtemp_c);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const range = maxTemp - minTemp || 1;

    const getChartPoints = () => {
        return temps.map((temp, i) => {
            const x = 15 + (i / (data.length - 1)) * 70; // Centered 70% span (from 15 to 85)
            const y = 80 - ((temp - minTemp) / range) * 60;
            return `${x},${y}`;
        }).join(' ');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6 w-full"
        >
            {/* Chart Section */}
            <div className="glass-card p-8 min-h-[300px] relative overflow-hidden bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                    <Thermometer className="text-accent-primary" size={24} />
                    <h3 className="text-lg font-bold tracking-tight uppercase">Temp Trend</h3>
                </div>

                <div className="relative h-40 w-full mt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Area under line */}
                        <path
                            d={`M 15,100 L ${getChartPoints()} L 85,100 Z`}
                            fill="url(#chartGradient)"
                            className="transition-all duration-1000"
                        />

                        {/* Main Trend Line */}
                        <polyline
                            points={getChartPoints()}
                            fill="none"
                            stroke="var(--accent-primary)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-[0_0_8px_var(--accent-primary)]"
                        />

                        {/* Data Points and Labels */}
                        {temps.map((temp, i) => {
                            const x = 15 + (i / (data.length - 1)) * 70;
                            const y = 80 - ((temp - minTemp) / range) * 60;
                            return (
                                <g key={i}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="2.5"
                                        fill="white"
                                        stroke="var(--accent-primary)"
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x={x}
                                        y={y - 8}
                                        textAnchor="middle"
                                        fill="white"
                                        className="text-[10px] font-black font-sans"
                                        style={{ fontSize: '6px' }}
                                    >
                                        {Math.round(temp)}°
                                    </text>
                                    <text
                                        x={x}
                                        y="105"
                                        textAnchor="middle"
                                        fill="rgba(255,255,255,0.4)"
                                        className="text-[8px] font-bold uppercase tracking-widest"
                                        style={{ fontSize: '5px' }}
                                    >
                                        {new Date(data[i].forecast.forecastday[0].date).toLocaleDateString(undefined, { weekday: 'short' })}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Grid of Days */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '1rem',
                    width: '100%'
                }}
            >
                {data.map((dayData, i) => {
                    const day = dayData.forecast.forecastday[0];
                    return (
                        <motion.div
                            key={day.date}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/[0.05] transition-all min-w-0"
                        >
                            <span className="text-xs font-black text-accent-primary uppercase tracking-widest mb-1.5 whitespace-nowrap">
                                {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
                            </span>
                            <span className="text-[8px] text-white/20 uppercase tracking-[0.1em] mb-4 whitespace-nowrap">{day.date}</span>

                            <img
                                src={day.day.condition.icon}
                                alt={day.day.condition.text}
                                className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform"
                            />

                            <div className="flex flex-col gap-2 mt-auto">
                                <span className="text-xl font-bold font-sans tracking-wide">{Math.round(day.day.avgtemp_c)}°</span>
                                <span className="text-[9px] text-white/30 uppercase font-black tracking-widest leading-tight line-clamp-2">{day.day.condition.text}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default HistoryView;
