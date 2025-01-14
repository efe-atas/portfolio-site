import React from 'react';

const Header = () => {
    return (
        <header className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white">
            {/* Glassmorphism Nav Bar */}
            <nav className="backdrop-blur-md bg-white/10 fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <span className="text-2xl font-bold tracking-tight">Portfolio</span>
                        <ul className="flex space-x-8">
                            <li><a href="#about" className="hover:text-pink-400 transition-colors duration-300">About</a></li>
                            <li><a href="#projects" className="hover:text-pink-400 transition-colors duration-300">Projects</a></li>
                            <li><a href="#contact" className="hover:text-pink-400 transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        You Have Found Me!
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                        Welcome to my digital playground where innovation meets design
                    </p>
                </div>
                
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black/50 to-black"></div>
                </div>
            </div>
        </header>
    );
};

export default Header; 