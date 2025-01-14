import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaTools } from 'react-icons/fa';
import { BsKanban } from 'react-icons/bs';
import { IoSchoolOutline } from 'react-icons/io5';
import { SiPython, SiTensorflow } from 'react-icons/si';

const About = () => {
    const { isDark, toggleTheme } = useTheme();

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
                {/* Education Section */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-2">
                        <FaGraduationCap className="text-2xl" />
                        Education
                    </h2>
                    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}>
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <IoSchoolOutline />
                            TED University
                        </h3>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Bachelor of Science in Computer Engineering, Secondary Field in Business Management</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>August 2022 – May 2026</p>
                    </div>
                </motion.section>

                {/* Experience Section */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-2">
                        <FaBriefcase className="text-2xl" />
                        Experience
                    </h2>
                    
                    {/* TÜBİTAK Experience */}
                    <div className={`p-6 rounded-lg mb-6 ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}>
                        <h3 className="text-xl font-semibold">TÜBİTAK 2247-C Undergraduate Research Assistant</h3>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>September 2024 – Present</p>
                        <p className="text-sm mb-1">Wellztech Information and Advanced Technologies Inc., METU TEKNOKENT, Ankara</p>
                        <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Developed a YOLO-based model to detect cattle and classify activities such as ruminating, eating, standing, and lying down using Python and OpenCV</li>
                            <li>Prepared and labeled a dataset of video frames to train the YOLO model for cattle behavior analysis</li>
                            <li>Built an image preprocessing pipeline to enhance YOLO model accuracy and detection consistency</li>
                            <li>Conducted research on object tracking algorithms, including ByteTrack, BoT-SORT, and DeepSORT</li>
                        </ul>
                    </div>

                    {/* Limak Experience */}
                    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}>
                        <h3 className="text-xl font-semibold">Flutter Developer Intern</h3>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>June 2024 – August 2024</p>
                        <p className="text-sm mb-1">Limak Technology Software Defense Industry and Trade Inc., Bilkent CYBERPARK</p>
                        <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Developed user interfaces using Flutter, focusing on responsiveness and a user-friendly experience</li>
                            <li>Enhanced skills in state management, widget lifecycle, and cross-platform development</li>
                            <li>Gained proficiency in integrating APIs, managing layouts, and optimizing performance</li>
                        </ul>
                    </div>
                </motion.section>

                {/* Projects Section */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-2">
                        <BsKanban className="text-2xl" />
                        Projects
                    </h2>
                    
                    {/* Cat&Dog Classification Project */}
                    <div className={`p-6 rounded-lg mb-6 ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}>
                        <h3 className="text-xl font-semibold">Cat&Dog Image Classification</h3>
                        <p className={`text-sm mb-2 italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Python (TensorFlow, Keras, NumPy)</p>
                        <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Developed a CNN model using TensorFlow and Keras to classify cat and dog images</li>
                            <li>Implemented data augmentation techniques to improve model generalization</li>
                        </ul>
                    </div>

                    {/* Image Processing Project */}
                    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}>
                        <h3 className="text-xl font-semibold">Image Processing and 2D DCT Implementation</h3>
                        <p className={`text-sm mb-2 italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Python, OpenCV</p>
                        <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Developed custom functions for image loading and display operations using OpenCV</li>
                            <li>Implemented the 2D Discrete Cosine Transform (DCT) algorithm in Python without external libraries</li>
                        </ul>
                    </div>
                </motion.section>

                {/* Technical Skills */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-2">
                        <FaTools className="text-2xl" />
                        Technical Skills
                    </h2>
                    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <FaLaptopCode />
                                Programming Languages
                            </h3>
                            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-3`}>
                                <SiPython /> Python,
                                C, SQL, Dart
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Development Tools</h3>
                            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Git, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Libraries</h3>
                            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-3`}>
                                <SiTensorflow /> TensorFlow,
                                PyTorch, OpenCV, Ultralytics, pandas, NumPy, Matplotlib
                            </p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default About;