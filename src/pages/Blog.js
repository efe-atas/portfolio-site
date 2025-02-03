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
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = newest first

    const allPosts = getAllPosts();
    
    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(allPosts.map(post => post.frontmatter.category))];
        return cats.sort();
    }, [allPosts]);

    // Filtered and sorted posts
    const filteredAndSortedPosts = useMemo(() => {
        let posts = [...allPosts];
        
        // Category filter
        if (selectedCategory !== 'All') {
            posts = posts.filter(post => post.frontmatter.category === selectedCategory);
        }

        // Time sorting
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
                <div className="max-w-4xl mx-auto px-4 py-2">
                    <div className="h-16"></div>
                    <div className="h-16"></div>
                    {/* Filters */}
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-red-500 text-white'
                                            : isDark
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>

                        {/* Sorting Options */}
                        <div className="flex items-center gap-2">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Sort:</span>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className={`px-3 py-2 rounded-lg text-sm ${
                                    isDark
                                        ? 'bg-gray-800 text-white border-gray-700'
                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                } border focus:outline-none focus:ring-2 focus:ring-red-500`}
                            >
                                <option value="desc">Newest</option>
                                <option value="asc">Oldest</option>
                            </select>
                        </div>
                    </div>

                    {/* Blog Posts */}
                    <div className="grid gap-8">
                        {filteredAndSortedPosts.map((post) => (
                            <motion.article
                                key={post.slug}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`p-6 rounded-lg ${
                                    isDark ? 'bg-gray-900' : 'bg-gray-50'
                                } hover:shadow-lg transition-shadow`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Link to={`/blog/${post.slug}`} className="flex-1">
                                        <span className="inline-block px-2 py-1 text-xs rounded bg-red-500 text-white mb-4">
                                            {post.frontmatter.category}
                                        </span>
                                        <h2 className="text-2xl font-bold mb-2 hover:text-red-500 transition-colors">
                                            {post.frontmatter.title}
                                        </h2>
                                    </Link>
                                    {post.frontmatter.github && (
                                        <motion.a
                                            href={post.frontmatter.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`ml-4 p-2 rounded-full ${
                                                isDark 
                                                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                                                    : 'hover:bg-gray-200 text-gray-600 hover:text-black'
                                            } transition-all`}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <GitHubIcon className="w-6 h-6" />
                                        </motion.a>
                                    )}
                                </div>
                                <Link to={`/blog/${post.slug}`}>
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

                        {/* No posts found message */}
                        {filteredAndSortedPosts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    No posts found in this category.
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