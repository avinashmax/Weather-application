import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { weatherService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSelectLocation }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length > 2) {
                try {
                    const data = await weatherService.searchLocations(query);
                    setSuggestions(data);
                    setIsOpen(true);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (loc) => {
        onSelectLocation(`${loc.lat},${loc.lon}`);
        setQuery(loc.name);
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSelectLocation(query.trim());
            setIsOpen(false);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-input-wrapper" ref={dropdownRef}>
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 2 && setIsOpen(true)}
                />
                {query && (
                    <X
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/50 hover:text-white"
                        size={18}
                        onClick={() => { setQuery(''); setSuggestions([]); }}
                    />
                )}

                <AnimatePresence>
                    {isOpen && suggestions.length > 0 && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute w-full mt-2 glass-card overflow-hidden z-50 p-2 border-white/10"
                            style={{ listStyle: 'none', background: 'rgba(10, 10, 20, 0.9)', backdropFilter: 'blur(20px)' }}
                        >
                            {suggestions.map((loc) => (
                                <li
                                    key={loc.id}
                                    className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
                                    onClick={() => handleSelect(loc)}
                                >
                                    <MapPin size={16} className="text-accent-primary" />
                                    <div>
                                        <div className="font-medium">{loc.name}</div>
                                        <div className="text-xs text-white/50">{loc.region}, {loc.country}</div>
                                    </div>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default SearchBar;
