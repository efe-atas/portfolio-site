import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getAllPosts } from '../utils/blogUtils';
import Header from '../components/Header';
import { GitHubIcon } from '../components/icons/SocialIcons';

const Blog = () => {
    const { isDark } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');

    const allPosts = getAllPosts();
    
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(allPosts.map(post => post.frontmatter.category))];
        return cats.sort();
    }, [allPosts]);

    const filteredAndSortedPosts = useMemo(() => {
        let posts = [...allPosts];
        
        if (selectedCategory !== 'All') {
            posts = posts.filter(post => post.frontmatter.category === selectedCategory);
        }

        posts.sort((a, b) => {
            const dateA = new Date(a.frontmatter.date);
            const dateB = new Date(b.frontmatter.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        return posts;
    }, [allPosts, selectedCategory, sortOrder]);

    return (
        <>
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                {/* Hero Section */}
                <div className={`w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-20`}>
                    <div className="max-w-4xl mx-auto px-4">
                        <motion.h1 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl font-bold mb-4"
                        >
                            Blog
                        </motion.h1>
                        <motion.p 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            Thoughts, learnings, and experiences in AI and software development.
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Filters */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6"
                    >
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 transform scale-105'
                                            : isDark
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg'
                                    }`}
                                    whileHover={{ scale: selectedCategory === category ? 1.05 : 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                                    isDark
                                        ? 'bg-gray-800 text-white border-gray-700'
                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                } border-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300`}
                            >
                                <option value="desc">Newest First</option>
                                <option value="asc">Oldest First</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Blog Posts Grid */}
                    <div className="grid gap-8">
                        {filteredAndSortedPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-2xl ${
                                    isDark ? 'bg-gray-900/50' : 'bg-white'
                                } shadow-xl hover:shadow-2xl transition-all duration-300`}
                            >
                                <Link to={`/blog/${post.slug}`} className="block p-8">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        {post.frontmatter.image && (
                                            <div className="md:w-1/3">
                                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                                    <img 
                                                        src={post.frontmatter.image} 
                                                        alt={post.frontmatter.title}
                                                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                                                    {post.frontmatter.category}
                                                </span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {post.date}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-3 group-hover:text-red-500 transition-colors">
                                                {post.frontmatter.title}
                                            </h2>
                                            <p className={`mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {post.frontmatter.description}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        By {post.frontmatter.author}
                                                    </span>
                                                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        • {post.readTime} min read
                                                    </span>
                                                </div>
                                                {post.frontmatter.github && (
                                                    <motion.a
                                                        href={post.frontmatter.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`p-2 rounded-full ${
                                                            isDark 
                                                                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                                                                : 'hover:bg-gray-100 text-gray-600 hover:text-black'
                                                        } transition-all`}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <GitHubIcon className="w-5 h-5" />
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}

                        {filteredAndSortedPosts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`text-center py-20 rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}
                            >
                                <h3 className="text-2xl font-bold mb-2">No posts found</h3>
                                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Try selecting a different category or check back later.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Blog; 