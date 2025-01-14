import React from 'react';

const Footer = () => {
    const socialLinks = [
        { name: 'GitHub', icon: '/github.svg', url: '#' },
        { name: 'LinkedIn', icon: '/linkedin.svg', url: '#' },
        { name: 'Twitter', icon: '/twitter.svg', url: '#' }
    ];

    return (
        <footer className="relative bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                            Portfolio
                        </h3>
                        <p className="text-gray-400">
                            Building the future, one line of code at a time.
                        </p>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#about" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">About</a></li>
                            <li><a href="#projects" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">Projects</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>
                    
                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-200">Connect</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
                                    aria-label={link.name}
                                >
                                    <img src={link.icon} alt={link.name} className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
                </div>
            </div>
            
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-purple-900/20"></div>
            </div>
        </footer>
    );
};

export default Footer; 