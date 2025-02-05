import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { getPostBySlug } from '../utils/blogUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaGithub, FaTwitter, FaLinkedin, FaShare } from 'react-icons/fa';

const BlogPost = () => {
    const { isDark, toggleTheme } = useTheme();
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopyClick = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopySuccess('Kopyalandı!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: post.frontmatter.title,
                    text: post.frontmatter.description,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Bağlantı kopyalandı!');
            }
        } catch (error) {
            console.error('Paylaşım sırasında hata oluştu:', error);
        }
    };

    useEffect(() => {
        try {
            const postData = getPostBySlug(slug);
            setPost(postData);
            document.title = postData?.frontmatter?.title || 'Blog Yazısı';
        } catch (error) {
            console.error('Blog yazısı yüklenirken hata oluştu:', error);
        }
    }, [slug]);

    if (!post) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center`}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Yükleniyor...</h1>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    const customComponents = {
        h1: ({node, ...props}) => (
            <h1 {...props} className="text-3xl font-bold mt-8 mb-4 text-red-500" />
        ),
        h2: ({node, ...props}) => (
            <h2 {...props} className="text-2xl font-bold mt-6 mb-3 text-red-500" />
        ),
        h3: ({node, ...props}) => (
            <h3 {...props} className="text-xl font-bold mt-4 mb-2 text-red-500" />
        ),
        p: ({node, ...props}) => (
            <p {...props} className="my-4 leading-relaxed" />
        ),
        a: ({node, ...props}) => (
            <a {...props} className="text-red-500 hover:text-red-600 underline" target="_blank" rel="noopener noreferrer" />
        ),
        code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && match) {
                return (
                    <div className="relative group">
                        <button
                            onClick={() => handleCopyClick(String(children))}
                            className="absolute right-2 top-2 bg-gray-700 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copySuccess || 'Kopyala'}
                        </button>
                        <SyntaxHighlighter
                            style={isDark ? vscDarkPlus : tomorrow}
                            language={language}
                            PreTag="div"
                            className="rounded-lg !my-4"
                            showLineNumbers={true}
                            wrapLines={true}
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    </div>
                );
            }
            return (
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                </code>
            );
        },
        pre: ({node, ...props}) => (
            <pre {...props} className="bg-transparent" />
        ),
        ul: ({node, ...props}) => (
            <ul {...props} className="list-disc list-inside my-4 space-y-2" />
        ),
        ol: ({node, ...props}) => (
            <ol {...props} className="list-decimal list-inside my-4 space-y-2" />
        ),
        li: ({node, ...props}) => (
            <li {...props} className="ml-4" />
        ),
        blockquote: ({node, ...props}) => (
            <blockquote {...props} className="border-l-4 border-red-500 pl-4 my-4 italic" />
        ),
        img: ({node, ...props}) => (
            <img {...props} className="max-w-full h-auto rounded-lg my-4" loading="lazy" />
        ),
        table: ({node, ...props}) => (
            <div className="overflow-x-auto my-4">
                <table {...props} className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" />
            </div>
        ),
        th: ({node, ...props}) => (
            <th {...props} className="px-4 py-2 bg-gray-100 dark:bg-gray-800" />
        ),
        td: ({node, ...props}) => (
            <td {...props} className="px-4 py-2 border-t border-gray-200 dark:border-gray-700" />
        )
    };

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
                            <Link to="/" className="text-red-500 hover:text-red-400 transition-colors duration-300">← Home</Link>
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
                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="mb-6">
                            <span className="inline-block px-2 py-1 text-xs rounded bg-red-500 text-white mb-4">
                                {post.frontmatter.category}
                            </span>
                            <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
                            <div className="flex items-center justify-center gap-4 text-sm">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    {post.frontmatter.author}
                                </span>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    {post.date}
                                </span>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    {post.readTime} minutes reading
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                {post.frontmatter.github && (
                                    <a
                                        href={post.frontmatter.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-2xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-300"
                                        title="GitHub"
                                    >
                                        <FaGithub />
                                    </a>
                                )}
                                <a
                                    href="https://twitter.com/efeatas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-300"
                                    title="Twitter"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="https://linkedin.com/in/efeatas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-300"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin />
                                </a>
                                <button
                                    onClick={handleShare}
                                    className="text-2xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-300"
                                    title="Paylaş"
                                >
                                    <FaShare />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className={`markdown-content ${isDark ? 'dark' : ''}`}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={customComponents}
                            className="break-words"
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
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

export default BlogPost; 