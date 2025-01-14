import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const YapayZekaVeDerinOgrenme = () => {
    const { isDark, toggleTheme } = useTheme();

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
                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="mb-6">
                            <span className="inline-block px-2 py-1 text-xs rounded bg-red-500 text-white mb-4">
                                AI/ML
                            </span>
                            <h1 className="text-4xl font-bold mb-4">Yapay Zeka ve Derin Öğrenme</h1>
                            <div className="flex items-center justify-center gap-4 text-sm">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    Efe Ataş
                                </span>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    2024-01-01
                                </span>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    6 dk okuma
                                </span>
                            </div>
                        </div>
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                            <img 
                                src="/images/blog/deep-learning-architecture.svg" 
                                alt="Derin Öğrenme Mimarisi" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </header>

                    {/* Content */}
                    <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''} prose-headings:text-red-500`}>
                        <h2>Giriş</h2>
                        <p>
                            Yapay zeka ve derin öğrenme, günümüz teknoloji dünyasının en hızlı gelişen alanlarından biridir.
                            Bu yazıda, modern yapay zeka uygulamaları ve derin öğrenme modellerinin detaylı bir analizini yapacağız.
                        </p>

                        <h2>Teorik Altyapı</h2>
                        <h3>Yapay Sinir Ağları</h3>
                        <p>
                            Yapay sinir ağları, biyolojik sinir sistemlerinden esinlenerek geliştirilmiş matematiksel modellerdir.
                            Temel bileşenleri:
                        </p>
                        <ul>
                            <li>Nöronlar: Bilgi işleme birimleri</li>
                            <li>Ağırlıklar: Bağlantıların güçleri</li>
                            <li>Aktivasyon Fonksiyonları: Çıktı değerlerini belirleyen matematiksel fonksiyonlar</li>
                        </ul>

                        <figure className="blog-image">
                            <img src="/images/blog/neural-network.svg" alt="Yapay Sinir Ağı" className="w-full" />
                            <figcaption>Yapay Sinir Ağı Mimarisi</figcaption>
                        </figure>

                        <h3>Derin Öğrenme Mimarileri</h3>
                        <p>
                            Modern derin öğrenme mimarileri, çok katmanlı yapılarıyla karmaşık problemleri çözebilmektedir.
                            Özellikle CNN (Convolutional Neural Networks) ve Transformer gibi mimariler, görüntü işleme ve
                            doğal dil işleme alanlarında çığır açıcı sonuçlar elde etmiştir.
                        </p>

                        <h2>Uygulama Alanları</h2>
                        <h3>Bilgisayarlı Görü</h3>
                        <figure className="blog-image">
                            <img src="/images/blog/cnn-architecture.svg" alt="CNN Mimarisi" className="w-full" />
                            <figcaption>CNN (Convolutional Neural Network) Mimarisi</figcaption>
                        </figure>

                        <h3>Doğal Dil İşleme</h3>
                        <figure className="blog-image">
                            <img src="/images/blog/transformers.svg" alt="Transformer Mimarisi" className="w-full" />
                            <figcaption>Transformer Mimarisi</figcaption>
                        </figure>

                        <h2>Gelecek Trendleri</h2>
                        <figure className="blog-image">
                            <img src="/images/blog/future-trends.svg" alt="Gelecek Trendleri" className="w-full" />
                            <figcaption>Yapay Zeka Gelecek Trendleri</figcaption>
                        </figure>

                        <h3>Açıklanabilir AI</h3>
                        <ul>
                            <li>Model yorumlanabilirliği</li>
                            <li>Etik AI gelişimi</li>
                        </ul>

                        <h3>Federe Öğrenme</h3>
                        <ul>
                            <li>Dağıtık veri işleme</li>
                            <li>Gizlilik korumalı öğrenme</li>
                        </ul>

                        <h2>Pratik Uygulamalar</h2>
                        <figure className="blog-image">
                            <img src="/images/blog/ai-applications.svg" alt="AI Uygulamaları" className="w-full" />
                            <figcaption>Modern Yapay Zeka Uygulamaları</figcaption>
                        </figure>

                        <h2>Kaynaklar</h2>
                        <ol>
                            <li>LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521, 436-444.</li>
                            <li>Vaswani, A., et al. (2017). Attention is all you need. NeurIPS.</li>
                            <li>Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. NeurIPS.</li>
                        </ol>
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

export default YapayZekaVeDerinOgrenme; 