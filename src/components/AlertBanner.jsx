import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Info } from 'lucide-react';

const AlertBanner = ({ alerts }) => {
    if (!alerts || !alerts.alert || alerts.alert.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
            >
                <div className="flex flex-col gap-3 py-6">
                    {alerts.alert.map((alert, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group overflow-hidden glass-card !p-0 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 shadow-[2px_0_15px_rgba(239,68,68,0.4)]" />

                            <div className="flex items-start gap-4 p-5">
                                <div className="bg-red-500/20 p-2 rounded-xl text-red-500 mt-0.5">
                                    <AlertTriangle size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-red-400">
                                            {alert.event}
                                        </h4>
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-30 px-2 py-0.5 bg-white/5 rounded-full border border-white/10">
                                            Priority: {alert.severity || 'Normal'}
                                        </span>
                                    </div>
                                    <p className="text-white/80 leading-relaxed font-medium">
                                        {alert.headline}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/40">
                                            <Info size={12} />
                                            <span>Effective until {new Date(alert.expires).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent my-2" />
            </motion.div>
        </AnimatePresence>
    );
};

export default AlertBanner;
