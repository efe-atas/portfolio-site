import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { GitHubIcon, LinkedInIcon } from '../components/icons/SocialIcons';

const Contact = () => {
    const { isDark, toggleTheme } = useTheme();

    const contactInfo = [
        {
            title: "Email",
            value: "iefeatas@gmail.com",
            link: "mailto:iefeatas@gmail.com"
        },
        {
            title: "Phone",
            value: "+90 111 111 11 11",
            link: "tel:+901111111111"
        },
        {
            title: "Location",
            value: "Ankara, Turkey",
            link: null
        }
    ];

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/efe-atas",
            icon: GitHubIcon,
            description: "Check out my projects and contributions"
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/efeatas",
            icon: LinkedInIcon,
            description: "Connect with me professionally"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen font-['Zen Kaku Gothic New'] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
            {/* Header/Navigation */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`fixed top-0 left-0 w-full z-50 ${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}
            >
                <nav className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link to="/" className="text-base hover:text-red-400 text-red-500 transition-colors duration-300">← Home</Link>
                        </motion.div>
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
                </nav>
            </motion.header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold mb-4">
                        <span className="text-red-500">Get in Touch</span>
                    </h1>
                    <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                </motion.section>

                {/* Contact Information */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}
                        >
                            <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                            {info.link ? (
                                <a
                                    href={info.link}
                                    className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-300`}
                                >
                                    {info.value}
                                </a>
                            ) : (
                                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{info.value}</p>
                            )}
                        </motion.div>
                    ))}
                </motion.section>

                {/* Social Links */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        <span className="text-red-500">Connect</span> with Me
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className={`flex items-center p-6 rounded-lg ${
                                        isDark ? 'bg-gray-900/30 hover:bg-gray-900/50' : 'bg-gray-100 hover:bg-gray-200'
                                    } transition-colors duration-300`}
                                >
                                    <Icon className="w-8 h-8 mr-4" />
                                    <div>
                                        <h3 className="text-lg font-bold">{social.name}</h3>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {social.description}
                                        </p>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default Contact; 