import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { GitHubIcon, LinkedInIcon} from '../components/icons/SocialIcons';
import { PyTorchIcon, TensorFlowIcon, NLPIcon, ComputerVisionIcon, DeepLearningIcon } from '../components/icons/TechIcons';
import { getAllPosts } from '../utils/blogUtils';
import { featuredProjects } from '../data/featuredProjects';
import Header from '../components/Header';
import { FaTwitter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    const allPosts = getAllPosts();
    const [currentPostPage, setCurrentPostPage] = useState(0);
    const [currentProjectPage, setCurrentProjectPage] = useState(0);
    const itemsPerPage = 3;
    
    const totalPostPages = Math.ceil(allPosts.length / itemsPerPage);
    const totalProjectPages = Math.ceil(featuredProjects.length / itemsPerPage);

    const nextPostPage = () => {
        setCurrentPostPage((prev) => (prev + 1) % totalPostPages);
    };

    const prevPostPage = () => {
        setCurrentPostPage((prev) => (prev - 1 + totalPostPages) % totalPostPages);
    };

    const nextProjectPage = () => {
        setCurrentProjectPage((prev) => (prev + 1) % totalProjectPages);
    };

    const prevProjectPage = () => {
        setCurrentProjectPage((prev) => (prev - 1 + totalProjectPages) % totalProjectPages);
    };

    const currentPosts = allPosts.slice(currentPostPage * itemsPerPage, (currentPostPage + 1) * itemsPerPage);
    const currentProjects = featuredProjects.slice(currentProjectPage * itemsPerPage, (currentProjectPage + 1) * itemsPerPage);

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
        <>
            <Header />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`min-h-screen font-['Zen Kaku Gothic New'] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                {/* Main Content */}
                <motion.main 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="pt-8 pb-12 px-4"
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
                                    <div className="flex justify-between items-center mb-2">
                                        <h1 className="text-2xl font-bold">
                                            <span className="text-red-500">Hello</span>, I'm Efe 👋
                                        </h1>
                                        <div className="flex items-center gap-3">
                                            <a
                                                href="https://github.com/efe-atas"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-base ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-300`}
                                                title="GitHub"
                                            >
                                                <GitHubIcon className="w-5 h-5" />
                                            </a>
                                            <a
                                                href="https://linkedin.com/in/efeatas"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-base ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-300`}
                                                title="LinkedIn"
                                            >
                                                <LinkedInIcon className="w-5 h-5" />
                                            </a>
                                            <a
                                                href="https://twitter.com/efeatas"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-base ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-300`}
                                                title="Twitter"
                                            >
                                                <FaTwitter className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
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

                            <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProjects.map((project, index) => (
                                        <motion.article
                                            key={project.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className={`group relative rounded-xl overflow-hidden shadow-lg border border-red-500/30 hover:border-red-500 transition-colors duration-300 ${
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

                                {/* Navigation Controls */}
                                {featuredProjects.length > itemsPerPage && (
                                    <>
                                        {/* Navigation Buttons */}
                                        <button
                                            onClick={prevProjectPage}
                                            className={`absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                                                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                                            } shadow-lg hover:bg-red-500 hover:text-white transition-colors`}
                                        >
                                            <FaChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextProjectPage}
                                            className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                                                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                                            } shadow-lg hover:bg-red-500 hover:text-white transition-colors`}
                                        >
                                            <FaChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Page Indicators */}
                                        <div className="flex justify-center gap-2 mt-6">
                                            {[...Array(totalProjectPages)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentProjectPage(index)}
                                                    className={`w-2 h-2 rounded-full transition-colors ${
                                                        index === currentProjectPage 
                                                            ? 'bg-red-500' 
                                                            : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.section>

                        {/* Recent Blog Posts */}
                        <motion.section 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-4xl mx-auto mb-16"
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

                            <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentPosts.map((post, index) => (
                                        <motion.article
                                            key={post.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className={`group relative rounded-xl overflow-hidden shadow-lg border border-red-500/30 hover:border-red-500 transition-colors duration-300 ${
                                                isDark ? 'bg-gray-900/30 hover:bg-gray-900/50' : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        >
                                            {post.frontmatter.image ? (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={post.frontmatter.image}
                                                        alt={post.frontmatter.title}
                                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-500/80 to-red-600/80">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                                            {post.frontmatter.category === 'Yapay Zeka' && (
                                                                <DeepLearningIcon className="w-8 h-8 text-white" />
                                                            )}
                                                            {post.frontmatter.category === 'Düşünceler' && (
                                                                <span className="text-3xl text-white">💭</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
                                                        {post.frontmatter.category}
                                                    </span>
                                                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {post.date}
                                                    </span>
                                                </div>
                                                <Link to={`/blog/${post.slug}`}>
                                                    <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                                                        {post.frontmatter.title}
                                                    </h3>
                                                    <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {post.frontmatter.description}
                                                    </p>
                                                </Link>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>

                                {/* Navigation Controls */}
                                {allPosts.length > itemsPerPage && (
                                    <>
                                        {/* Navigation Buttons */}
                                        <button
                                            onClick={prevPostPage}
                                            className={`absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                                                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                                            } shadow-lg hover:bg-red-500 hover:text-white transition-colors`}
                                        >
                                            <FaChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextPostPage}
                                            className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                                                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                                            } shadow-lg hover:bg-red-500 hover:text-white transition-colors`}
                                        >
                                            <FaChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Page Indicators */}
                                        <div className="flex justify-center gap-2 mt-6">
                                            {[...Array(totalPostPages)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentPostPage(index)}
                                                    className={`w-2 h-2 rounded-full transition-colors ${
                                                        index === currentPostPage 
                                                            ? 'bg-red-500' 
                                                            : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
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
        </>
    );
};

export default Home;