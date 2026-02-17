import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center pointer-events-none select-none"
        >
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent-primary)" />
                        <stop offset="100%" stopColor="var(--accent-secondary)" />
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Abstract Cloud Shapes */}
                <path
                    d="M30 65C30 54 39 45 50 45C54.4 45 58.5 46.5 61.7 49M30 65C21.7 65 15 58.3 15 50C15 41.7 21.7 35 30 35C33 35 35.8 35.9 38.1 37.4M61.7 49C70 49 76.7 55.7 76.7 64C76.7 72.3 70 79 61.7 79H30"
                    stroke="url(#logoGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#neonGlow)"
                    className="opacity-80"
                />

                {/* Stylized Sun */}
                <circle
                    cx="65" cy="35" r="15"
                    stroke="url(#logoGradient)"
                    strokeWidth="3.5"
                    filter="url(#neonGlow)"
                />
                <path
                    d="M65 12V18M65 52V58M88 35H82M48 35H42M81.3 18.7L77 23M53 47L48.7 51.3M81.3 51.3L77 47M53 23L48.7 18.7"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        </motion.div>
    );
};

export default Logo;
