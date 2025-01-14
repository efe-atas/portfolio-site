import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { getAllPosts } from '../utils/blogUtils';

const Blog = () => {
    const { isDark, toggleTheme } = useTheme();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            const allPosts = getAllPosts();
            setPosts(allPosts);
        } catch (error) {
            console.error('Blog yazıları yüklenirken hata oluştu:', error);
        }
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
            {/* Navigation */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`fixed top-0 left-0 w-full ${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm z-50`}
            >
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link to="/" className="text-red-500 hover:text-red-400 transition-colors duration-300">← Ana Sayfa</Link>
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
                </div>
            </motion.nav>

            {/* Main Content */}
            <motion.main 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-24 pb-12 px-4"
            >
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="text-red-500">Blog</span>
                        </h1>
                        <p className={`max-w-xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Yapay Zeka, Makine Öğrenmesi ve Yazılım Geliştirme üzerine yazılar
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post, index) => (
                            <motion.article 
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ y: -5 }}
                                className={`group relative rounded-lg overflow-hidden transition-colors duration-300 ${
                                    isDark ? 'bg-gray-900/30 hover:bg-gray-900/50' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                <Link to={`/blog/${post.slug}`} className="block p-6">
                                    {/* Category Badge */}
                                    <div className="mb-2">
                                        <span className="inline-block px-2 py-1 text-xs rounded bg-red-500 text-white">
                                            {post.frontmatter.category}
                                        </span>
                                    </div>
                                    
                                    {/* Title and Read Time */}
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                                            {post.frontmatter.title}
                                        </h2>
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                            {post.readTime}
                                        </span>
                                    </div>
                                    
                                    {/* Excerpt */}
                                    <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {post.excerpt}
                                    </p>
                                    
                                    {/* Date and Read More */}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className={isDark ? 'text-gray-500' : 'text-gray-600'}>
                                            {post.date}
                                        </span>
                                        <span className="text-red-500 group-hover:text-red-400 transition-colors duration-300">
                                            Devamını Oku →
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
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

export default Blog; 