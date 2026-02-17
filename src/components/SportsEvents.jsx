import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, ExternalLink } from 'lucide-react';

const SportsEvents = ({ sports }) => {
    if (!sports) return null;

    const allEvents = [
        ...(sports.football || []).map(e => ({ ...e, type: 'Football' })),
        ...(sports.cricket || []).map(e => ({ ...e, type: 'Cricket' })),
        ...(sports.golf || []).map(e => ({ ...e, type: 'Golf' })),
    ];

    if (allEvents.length === 0) return null;

    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-3">
                <Trophy className="text-accent-secondary" size={24} />
                <h3 className="text-xl font-black uppercase tracking-widest text-gradient">Sports in Region</h3>
            </div>

            <div
                className="no-scrollbar"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: '1rem',
                    paddingBottom: '1rem',
                    width: '100%'
                }}
            >
                {allEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card !p-5 min-w-[300px] flex-shrink-0 flex flex-col gap-4 hover:border-accent-secondary/30 transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div className="px-2 py-0.5 bg-white/5 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                                    {event.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-bold">
                                <Calendar size={12} />
                                <span>{event.start}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-base leading-tight mb-2 truncate">{event.match || event.name}</h4>
                            <div className="flex items-center gap-2 text-white/40 text-xs text-nowrap">
                                <MapPin size={12} />
                                <span className="truncate">{event.stadium}, {event.country}</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-30 truncate max-w-[150px]">{event.tournament}</span>
                            <div className="text-accent-secondary opacity-40 group-hover:opacity-100 transition-opacity">
                                <ExternalLink size={14} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SportsEvents;
