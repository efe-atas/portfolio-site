import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navItems = [
        { path: 'about', label: 'About' },
        { path: 'blog', label: 'Blog' },
        { path: 'apps', label: 'Apps' },
        { path: 'contact', label: 'Contact' },
    ];

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlHeader);
        
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.header 
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className={`fixed top-0 left-0 w-full z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md shadow-lg`}
                    >
                        <nav className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Link to="/" className="text-2xl font-bold text-red-500 font-merriweather">EfeAtas</Link>
                                </motion.div>
                                <div className="flex items-center space-x-8 font-inter">
                                    <ul className="flex space-x-8">
                                        {navItems.map((item) => (
                                            <motion.li
                                                key={item.path}
                                                whileHover={{ y: -2 }}
                                                whileTap={{ y: 0 }}
                                            >
                                                <Link 
                                                    to={`/${item.path}`} 
                                                    className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-300`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <motion.button
                                        whileHover={{ rotate: 180 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleTheme}
                                        className="p-2 rounded-full hover:bg-gray-800/10 transition-colors duration-300"
                                        aria-label="Toggle theme"
                                    >
                                        {isDark ? '🌞' : '🌙'}
                                    </motion.button>
                                </div>
                            </div>
                        </nav>
                    </motion.header>
                )}
            </AnimatePresence>
            {/* Spacer div to prevent content from going under fixed header */}
            <div className="h-16"></div>
        </>
    );
};

export default Header; 