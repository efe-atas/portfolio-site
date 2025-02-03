import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { myApps } from '../data/featuredProjects';
import Header from '../components/Header';

const Apps = () => {
    const { isDark } = useTheme();

    return (
        <>
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="h-16"></div>
                    <h1 className="text-4xl font-bold mb-8 text-center">My Apps</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {myApps.map((app, index) => (
                            <motion.div
                                key={app.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative"
                            >
                                {/* App Screenshot */}
                                <motion.div 
                                    className="relative aspect-[9/19] w-full"
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                >
                                    <motion.img
                                        src={app.screenshots[0]}
                                        alt={`${app.name} screenshot`}
                                        className="w-full h-full object-contain"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ 
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                    />

                                    {/* App Info Overlay */}
                                    <motion.div 
                                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
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
                                            {app.name}
                                        </motion.h3>
                                        <motion.p 
                                            className="text-gray-200 text-base mb-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {app.description}
                                        </motion.p>
                                        <motion.div 
                                            className="flex flex-wrap gap-2 mb-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            {app.tech.map((tech, techIndex) => (
                                                <motion.span
                                                    key={techIndex}
                                                    className="px-3 py-1.5 text-sm rounded-full bg-red-500/80 text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + (techIndex * 0.1) }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center gap-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            {app.appStore && (
                                                <motion.a
                                                    href={app.appStore}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition-opacity"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img 
                                                        src="/images/store-badges/app-store-badge.svg" 
                                                        alt="Download on App Store" 
                                                        className="h-9"
                                                    />
                                                </motion.a>
                                            )}
                                            {app.playStore && (
                                                <motion.a
                                                    href={app.playStore}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition-opacity"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img 
                                                        src="/images/store-badges/google-play-badge.png" 
                                                        alt="Get it on Google Play" 
                                                        className="h-12"
                                                    />
                                                </motion.a>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Apps; 