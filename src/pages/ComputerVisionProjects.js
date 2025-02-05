import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import VideoBackground from '../components/VideoBackground';
import { featuredProjects } from '../data/featuredProjects';

const Project = ({ name, description, tech, image, github }) => {
    const { isDark } = useTheme();
    
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`rounded-lg overflow-hidden ${
                isDark ? 'bg-gray-900/70' : 'bg-gray-900/70'
            }`}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {name}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    )}
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-300 '}`}>
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tech.map((t, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-800 text-gray-300'
                            }`}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ComputerVisionProjects = () => {
    const { isDark, toggleTheme } = useTheme();

    // Computer Vision ile ilgili projeleri filtrele - daha geniş kriterler
    const cvProjects = featuredProjects.filter(project => 
        project.tech.some(tech => 
            [
                'Computer Vision',
                'OpenCV', 
                'YOLO',
                'Object Detection',
                'Image Processing',
                'Image Recognition',
                'Video Processing',
                'Face Detection',
                'Pose Estimation',
                'Segmentation',
                'CNN',
                'Deep Learning',
                'Machine Learning',
                'AI',
                'Neural Networks',
                'TensorFlow',
                'PyTorch',
                'Keras'
            ].some(keyword => 
                tech.toLowerCase().includes(keyword.toLowerCase())
            )
        )
    );

    // Eğer hiç proje bulunamazsa tüm projeleri göster
    const projectsToShow = cvProjects.length > 0 ? cvProjects : featuredProjects;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen font-['Zen Kaku Gothic New'] relative text-white"
        >
            <VideoBackground />

            {/* Header/Navigation */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-sm"
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
                            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '🌞' : '🌙'}
                        </motion.button>
                    </div>
                </nav>
            </motion.header>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto pt-24 pb-8 px-4">
                {/* Projects Grid */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projectsToShow.map((project, index) => (
                        <Project key={index} {...project} />
                    ))}
                </motion.section>

                {/* Technologies Used */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">
                        <span className="text-red-500">Technologies</span> & Tools
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {Array.from(new Set(projectsToShow.flatMap(project => project.tech))).map((tech, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className="px-4 py-2 rounded-full bg-white-500/20 text-white-400"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default ComputerVisionProjects; 