import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { myApps } from '../data/featuredProjects';
import Header from '../components/Header';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Apps = () => {
    const { isDark } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextApp = () => {
        setCurrentIndex((prev) => (prev + 1) % myApps.length);
    };

    const prevApp = () => {
        setCurrentIndex((prev) => (prev - 1 + myApps.length) % myApps.length);
    };

    // Önceki, mevcut ve sonraki uygulamaları belirle
    const prevAppIndex = (currentIndex - 1 + myApps.length) % myApps.length;
    const nextAppIndex = (currentIndex + 1) % myApps.length;

    return (
        <>
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                <div className="max-w-6xl mx-auto px-4 py-8 relative">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-14"
                    >
                        <h1 className="text-2xl font-bold mb-2">
                            <span className="text-red-500"></span> 
                        </h1>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Swipe through my latest mobile app projects
                        </p>
                    </motion.div>

                    {/* Carousel Container */}
                    <div className="relative h-[600px] flex items-center justify-center">
                        {/* Previous App (Sol) */}
                        <motion.div
                            className="absolute left-0 w-1/5 opacity-50 transform -translate-x-1/4 scale-75 cursor-pointer"
                            onClick={prevApp}
                            whileHover={{ scale: 0.8 }}
                        >
                            <div className="relative aspect-[9/16]">
                                <img
                                    src={myApps[prevAppIndex].screenshots[0]}
                                    alt={`${myApps[prevAppIndex].name} screenshot`}
                                    className="w-full h-full object-contain rounded-2xl"
                                />
                            </div>
                        </motion.div>

                        {/* Current App (Orta) */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-2/5 z-10"
                            >
                                <div className="relative aspect-[9/16]">
                                    <img
                                        src={myApps[currentIndex].screenshots[0]}
                                        alt={`${myApps[currentIndex].name} screenshot`}
                                        className="w-full h-full object-contain rounded-2xl shadow-2xl"
                                    />
                                    {/* App Info Overlay */}
                                    <motion.div 
                                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.h3 
                                            className="text-white text-xl font-bold mb-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {myApps[currentIndex].name}
                                        </motion.h3>
                                        <motion.p 
                                            className="text-gray-200 text-sm mb-4 line-clamp-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {myApps[currentIndex].description}
                                        </motion.p>
                                        <motion.div 
                                            className="flex flex-wrap gap-2 mb-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            {myApps[currentIndex].tech.map((tech, techIndex) => (
                                                <motion.span
                                                    key={techIndex}
                                                    className="px-3 py-1 text-sm rounded-full bg-red-500/80 text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center justify-center gap-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            {myApps[currentIndex].appStore && (
                                                <motion.a
                                                    href={myApps[currentIndex].appStore}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition-opacity"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img 
                                                        src="/images/store-badges/app-store-badge.svg" 
                                                        alt="Download on App Store" 
                                                        className="h-8"
                                                    />
                                                </motion.a>
                                            )}
                                            {myApps[currentIndex].playStore && (
                                                <motion.a
                                                    href={myApps[currentIndex].playStore}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition-opacity"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img 
                                                        src="/images/store-badges/google-play-badge.png" 
                                                        alt="Get it on Google Play" 
                                                        className="h-10"
                                                    />
                                                </motion.a>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Next App (Sağ) */}
                        <motion.div
                            className="absolute right-0 w-1/5 opacity-50 transform translate-x-1/4 scale-75 cursor-pointer"
                            onClick={nextApp}
                            whileHover={{ scale: 0.8 }}
                        >
                            <div className="relative aspect-[9/16]">
                                <img
                                    src={myApps[nextAppIndex].screenshots[0]}
                                    alt={`${myApps[nextAppIndex].name} screenshot`}
                                    className="w-full h-full object-contain rounded-2xl"
                                />
                            </div>
                        </motion.div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevApp}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full ${
                                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                            } shadow-lg hover:bg-red-500 hover:text-white transition-colors z-20`}
                        >
                            <FaChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextApp}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full ${
                                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                            } shadow-lg hover:bg-red-500 hover:text-white transition-colors z-20`}
                        >
                            <FaChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-3 mt-8">
                        {myApps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentIndex 
                                        ? 'bg-red-500' 
                                        : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Apps; 