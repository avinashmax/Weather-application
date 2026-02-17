import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherAnimations = ({ conditionCode }) => {
    // WeatherAPI.com condition codes: https://www.weatherapi.com/docs/weather_conditions.json

    const isRain = (conditionCode >= 1180 && conditionCode <= 1201) || (conditionCode >= 1240 && conditionCode <= 1246) || conditionCode === 1063;
    const isSnow = (conditionCode >= 1210 && conditionCode <= 1225) || (conditionCode >= 1255 && conditionCode <= 1264) || conditionCode === 1066;
    const isCloudy = [1003, 1006, 1009, 1030].includes(conditionCode);
    const isSunny = conditionCode === 1000;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            <AnimatePresence>
                {isRain && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="raindrop"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {isSnow && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-white rounded-full opacity-60"
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    left: `${Math.random() * 100}%`,
                                    top: '-10px',
                                }}
                                animate={{
                                    y: ['0vh', '110vh'],
                                    x: [0, (Math.random() - 0.5) * 200],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 5,
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {isCloudy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="cloud"
                                style={{
                                    top: `${5 + i * 12}%`,
                                    width: `${300 + Math.random() * 300}px`,
                                    height: `${150 + Math.random() * 50}px`,
                                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                                    borderRadius: '50%',
                                    animationDuration: `${25 + Math.random() * 25}s`,
                                    animationDelay: `${-Math.random() * 25}s`,
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {isSunny && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-10 right-10"
                    >
                        <div className="sun-glow" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WeatherAnimations;
