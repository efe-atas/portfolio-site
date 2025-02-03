import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { GitHubIcon, LinkedInIcon} from '../components/icons/SocialIcons';
import { PyTorchIcon, TensorFlowIcon, NLPIcon, ComputerVisionIcon, DeepLearningIcon } from '../components/icons/TechIcons';
import { getAllPosts } from '../utils/blogUtils';
import { featuredProjects } from '../data/featuredProjects';

const TechTag = ({ icon: Icon, text }) => (
    <motion.div
        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <Icon className="w-4 h-4 text-gray-700" />
        <span className="text-gray-700 text-sm">{text}</span>
    </motion.div>
);

const Home = () => {
    const { isDark, toggleTheme } = useTheme();
    const recentPosts = getAllPosts().slice(0, 3); // Son 3 blog yazısı

    const navItems = [
        { path: 'about', label: 'Hakkımda' },
        { path: 'blog', label: 'Blog' },
        { path: 'apps', label: 'Uygulamalar' },
        { path: 'contact', label: 'İletişim' },
    ];

    const socialLinks = [
        { 
            name: 'GitHub',
            url: 'https://github.com/efe-atas',
            icon: GitHubIcon,
            hoverColor: 'hover:text-gray-400'
        },
        { 
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/efeatas',
            icon: LinkedInIcon,
            hoverColor: 'hover:text-blue-500'
        },
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
                            <Link to="/" className="text-2xl font-bold text-red-500">EfeAtas</Link>
                        </motion.div>
                        <div className="flex items-center space-x-8">
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

            {/* Main Content */}
            <motion.main 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-24 pb-12 px-4"
            >
                <div className="max-w-4xl mx-auto">
                    {/* Introduction Section */}
                    <motion.section 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-16"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Profile Image */}
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative w-32 h-32 md:w-40 md:h-40"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-md opacity-30"></div>
                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-red-500">
                                    <img 
                                        src="/images/profile.jpeg" 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Introduction Text */}
                            <motion.div 
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex-1 text-center md:text-left"
                            >
                                <h1 className="text-2xl font-bold mb-2">
                                    <span className="text-red-500">Hello</span>, I'm Efe 👋
                                </h1>
                                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    I'm a software engineer specializing in Artificial Intelligence and Machine Learning.
                                    I develop projects in deep learning, natural language processing, and computer vision,
                                    creating innovative solutions using modern AI technologies.
                                </p>
                                {/* AI/ML Skills Tags */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <TechTag icon={ComputerVisionIcon} text="Computer Vision" />
                                    <TechTag icon={PyTorchIcon} text="PyTorch" />
                                    <TechTag icon={TensorFlowIcon} text="TensorFlow" />
                                    <TechTag icon={NLPIcon} text="NLP" />                         
                                    <TechTag icon={DeepLearningIcon} text="Deep Learning" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>

                    {/* Featured Projects */}
                    <motion.section 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto mb-16"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">
                                <span className="text-red-500">My Projects</span>
                            </h2>
                            <motion.div whileHover={{ x: 5 }}>
                                <Link to="/projects" className="text-red-500 hover:text-red-400 transition-colors duration-300">
                                    View All →
                                </Link>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProjects.map((project, index) => (
                                <motion.article
                                    key={project.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={`group relative rounded-xl overflow-hidden shadow-lg ${
                                        isDark ? 'bg-gray-900/30 hover:bg-gray-900/50' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    {project.image && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                            {project.name}
                                            <motion.a
                                                whileHover={{ scale: 1.1 }}
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                                            >
                                                <GitHubIcon className="w-4 h-4" />
                                            </motion.a>
                                        </h3>
                                        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 3).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>

                    {/* Recent Blog Posts */}
                    <motion.section 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-16"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">
                                <span className="text-red-500">Recent Blog Posts</span>
                            </h2>
                            <motion.div whileHover={{ x: 5 }}>
                                <Link to="/blog" className="text-red-500 hover:text-red-400 transition-colors duration-300">
                                    View All →
                                </Link>
                            </motion.div>
                        </div>

                        <div className="grid gap-8">
                            {recentPosts.map((post) => (
                                <motion.article
                                    key={post.slug}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className={`p-6 rounded-lg ${
                                        isDark ? 'bg-gray-900' : 'bg-gray-50'
                                    } hover:shadow-lg transition-shadow`}
                                >
                                    <Link to={`/blog/${post.slug}`}>
                                        <span className="inline-block px-2 py-1 text-xs rounded bg-red-500 text-white mb-4">
                                            {post.frontmatter.category}
                                        </span>
                                        <h2 className="text-2xl font-bold mb-2 hover:text-red-500 transition-colors">
                                            {post.frontmatter.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {post.frontmatter.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{post.frontmatter.author}</span>
                                            <span>{post.date}</span>
                                            <span>{post.readTime} minutes reading</span>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>

                    {/* Social Links */}
                    <motion.section 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center space-x-6"
                    >
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`text-2xl ${link.hoverColor} transition-colors duration-300`}
                            >
                                <link.icon className="w-6 h-6" />
                            </motion.a>
                        ))}
                    </motion.section>
                </div>
            </motion.main>

            {/* Minimal Red Circle */}
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="fixed bottom-8 right-8"
            >
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </motion.div>
        </motion.div>
    );
};

export default Home;