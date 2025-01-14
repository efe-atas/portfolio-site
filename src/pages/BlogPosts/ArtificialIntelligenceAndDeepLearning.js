import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ArtificialIntelligenceAndDeepLearning = () => {
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

            {/* Blog Content */}
            <article className="max-w-4xl mx-auto pt-24 pb-12 px-4">
                {/* Blog Header */}
                <motion.header
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-red-500">Artificial Intelligence</span> and Deep Learning
                    </h1>
                    <div className={`flex items-center justify-center gap-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>By Efe Ataş</span>
                        <span>•</span>
                        <span>January 1, 2024</span>
                        <span>•</span>
                        <span>6 min read</span>
                    </div>
                </motion.header>

                {/* Blog Image */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <img
                        src="/images/ai-deep-learning.jpg"
                        alt="Artificial Intelligence and Deep Learning"
                        className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                    />
                </motion.div>

                {/* Blog Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}
                >
                    <h2>Introduction to Artificial Intelligence</h2>
                    <p>
                        Artificial Intelligence (AI) represents one of the most transformative technologies of our time. 
                        It encompasses the development of computer systems capable of performing tasks that typically 
                        require human intelligence. These tasks include visual perception, speech recognition, 
                        decision-making, and language translation.
                    </p>

                    <h2>Deep Learning: A Subset of AI</h2>
                    <p>
                        Deep Learning, a subset of machine learning within AI, has revolutionized how we approach 
                        complex problems. It uses artificial neural networks inspired by the human brain to learn 
                        from large amounts of data. Through multiple layers of processing, these networks can 
                        identify patterns and features at increasing levels of abstraction.
                    </p>

                    <h3>Key Components of Deep Learning</h3>
                    <ul>
                        <li>Neural Networks</li>
                        <li>Training Data</li>
                        <li>Optimization Algorithms</li>
                        <li>Model Architecture</li>
                    </ul>

                    <h2>Applications in Modern Technology</h2>
                    <p>
                        The applications of AI and Deep Learning are vast and growing. From healthcare and 
                        autonomous vehicles to recommendation systems and natural language processing, these 
                        technologies are reshaping industries and creating new possibilities.
                    </p>

                    <h3>Impact on Various Industries</h3>
                    <ul>
                        <li>Healthcare: Disease diagnosis and drug discovery</li>
                        <li>Finance: Risk assessment and fraud detection</li>
                        <li>Transportation: Autonomous vehicles and traffic management</li>
                        <li>Entertainment: Content recommendations and gaming</li>
                    </ul>

                    <h2>Future Prospects</h2>
                    <p>
                        As we continue to advance in AI and Deep Learning, we can expect even more breakthrough 
                        applications. The future holds promise for more sophisticated AI systems that can better 
                        understand and interact with humans, while also solving increasingly complex problems.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        The field of AI and Deep Learning continues to evolve rapidly, offering new opportunities 
                        and challenges. As we move forward, it's crucial to understand both the potential and 
                        limitations of these technologies, ensuring their responsible development and implementation.
                    </p>
                </motion.div>
            </article>
        </motion.div>
    );
};

export default ArtificialIntelligenceAndDeepLearning; 