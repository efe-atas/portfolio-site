import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import VideoBackground from '../components/VideoBackground';

const Project = ({ title, description, technologies, imageUrl }) => {
    const { isDark } = useTheme();
    
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`rounded-lg overflow-hidden ${
                isDark ? 'bg-gray-900/70' : 'bg-white/90'
            }`}
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ComputerVisionProjects = () => {
    const { isDark, toggleTheme } = useTheme();

    const projects = [
        {
            title: "Cattle Activity Detection",
            description: "Developed a YOLO-based model to detect and classify cattle activities such as ruminating, eating, standing, and lying down. The system processes video feeds in real-time and provides accurate activity classification.",
            technologies: ["YOLO", "Python", "OpenCV", "Deep Learning"],
            imageUrl: "/images/projects/cattle.jpeg"
        },
        {
            title: "Object Tracking System",
            description: "Implemented various object tracking algorithms including ByteTrack, BoT-SORT, and DeepSORT for robust object tracking in video streams. The system maintains consistent tracking across frames.",
            technologies: ["ByteTrack", "DeepSORT", "Python", "TensorFlow"],
            imageUrl: "/images/projects/cattle.jpeg"
        }
    ];

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
            <div className="max-w-6xl mx-auto pt-24 pb-12 px-4">
                {/* Introduction */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold mb-6">
                        <span className="text-red-500">Computer Vision</span> Projects
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg">
                        Exploring the intersection of artificial intelligence and visual perception through 
                        innovative computer vision projects. From object detection to activity recognition, 
                        these projects demonstrate the power of modern AI in understanding and interpreting 
                        visual information.
                    </p>
                </motion.section>

                {/* Projects Grid */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projects.map((project, index) => (
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
                        {[
                            "YOLO", "OpenCV", "Python", "TensorFlow",
                            "Deep Learning", "ByteTrack", "DeepSORT", "Neural Networks"
                        ].map((tech, index) => (
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