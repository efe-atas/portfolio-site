import { marked } from 'marked';

// LaTeX formüllerini işlemek için marked'ı özelleştir
const renderer = new marked.Renderer();

// Matematik formüllerini işle
const processLatex = (text) => {
    if (typeof text !== 'string') return text;
    
    // Blok LaTeX formülleri için
    text = text.replace(/\$\$([^\$]+)\$\$/g, (match, formula) => {
        return `<div class="math display">${formula}</div>`;
    });
    
    // Satır içi LaTeX formülleri için
    text = text.replace(/\$([^\$]+)\$/g, (match, formula) => {
        return `<span class="math inline">${formula}</span>`;
    });
    
    return text;
};

renderer.paragraph = (text) => {
    return `<p>${processLatex(text)}</p>`;
};

renderer.text = (text) => {
    return processLatex(text);
};

// Resimleri işle
renderer.image = (href, title, text) => {
    return `<figure class="blog-image">
        <img src="${href}" alt="${text}" ${title ? `title="${title}"` : ''} loading="lazy" />
        ${text ? `<figcaption>${text}</figcaption>` : ''}
    </figure>`;
};

// Marked ayarlarını güncelle
marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
    highlight: function(code, lang) {
        return code;
    }
});

const blogPosts = {
    'yapay-zeka-ve-derin-ogrenme': {
        frontmatter: {
            title: "Yapay Zeka ve Derin Öğrenme",
            date: "2024-01-01",
            category: "AI/ML",
            author: "Efe Ataş",
            image: "/images/blog/deep-learning-architecture.svg"
        },
        content: `
# Yapay Zeka ve Derin Öğrenme

Modern yapay zeka uygulamaları ve derin öğrenme modellerinin detaylı analizi.

## Giriş

Yapay zeka ve derin öğrenme alanındaki son gelişmeler, teknoloji dünyasını hızla değiştiriyor. Bu yazıda, modern yapay zeka uygulamaları ve derin öğrenme modellerinin detaylı bir analizini yapacağız.

## Derin Öğrenme Nedir?

Derin öğrenme, yapay sinir ağlarının çok katmanlı bir yapıda kullanılmasıyla ortaya çıkan bir makine öğrenmesi yaklaşımıdır. Bu yaklaşım, özellikle büyük veri setleriyle çalışırken etkileyici sonuçlar vermektedir.

### Temel Bileşenler

#### Yapay Sinir Ağları
- Nöronlar
- Katmanlar
- Aktivasyon Fonksiyonları

#### Öğrenme Algoritmaları
- Gradient Descent
- Backpropagation
- Optimizasyon Teknikleri

## Uygulama Alanları

### Görüntü İşleme
- Nesne Tanıma
- Yüz Tanıma
- Medikal Görüntüleme

### Doğal Dil İşleme
- Metin Sınıflandırma
- Makine Çevirisi
- Duygu Analizi

### Ses İşleme
- Konuşma Tanıma
- Müzik Üretimi
- Ses Sentezi

## Kod Örnekleri

\`\`\`python
import tensorflow as tf
from tensorflow.keras import layers

model = tf.keras.Sequential([
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10)
])
\`\`\`

## Gelecek Trendleri

### Transformer Modelleri
- BERT ve türevleri
- Vision Transformers
- Multimodal Transformers

### Az Örnekle Öğrenme
- Few-shot Learning
- Zero-shot Learning
- Transfer Learning

### Açıklanabilir AI
- Model Yorumlanabilirliği
- Şeffaf AI Sistemleri
- Etik AI

## Kaynaklar

1. LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521, 436-444.
2. Vaswani, A., et al. (2017). Attention is all you need. NeurIPS.
`
    },
    'makine-ogrenmesi-pipeline': {
        frontmatter: {
            title: "Makine Öğrenmesi Pipeline",
            date: "2023-12-28",
            category: "AI/ML",
            author: "Efe Ataş",
            image: "/images/blog/ml-pipeline.png"
        },
        content: `
# Makine Öğrenmesi Pipeline

Veri hazırlama, model eğitimi ve deployment süreçlerinin optimizasyonu.

## Giriş

Makine öğrenmesi projelerinin başarısı, iyi tasarlanmış bir pipeline'a bağlıdır. Bu yazıda, etkili bir ML pipeline'ı oluşturmanın temel adımlarını inceleyeceğiz.
`
    },
    'nlp-ve-transformers': {
        frontmatter: {
            title: "NLP ve Transformers",
            date: "2023-12-25",
            category: "AI/ML",
            author: "Efe Ataş",
            image: "/images/blog/transformers.png"
        },
        content: `
# NLP ve Transformers

Doğal dil işleme ve transformer mimarilerinin güncel uygulamaları.

## Giriş

Transformer modelleri, NLP alanında devrim yarattı. Bu yazıda, transformer mimarilerinin temellerini ve güncel uygulamalarını inceleyeceğiz.
`
    }
};

export const getAllPosts = () => {
    return Object.entries(blogPosts).map(([slug, post]) => ({
        slug,
        frontmatter: post.frontmatter,
        content: marked(post.content),
        excerpt: post.content
            .replace(/\$\$[^\$]+\$\$/g, '') // LaTeX formülleri kaldır
            .replace(/\$[^\$]+\$/g, '')
            .replace(/!\[.*?\]\(.*?\)/g, '') // Resimleri kaldır
            .replace(/[#*`]/g, '') // Markdown işaretlerini kaldır
            .slice(0, 200) + '...',
        date: post.frontmatter.date,
        readTime: Math.ceil(post.content.split(' ').length / 200) + ' dk'
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = (slug) => {
    const post = blogPosts[slug];
    if (!post) return null;

    return {
        slug,
        frontmatter: post.frontmatter,
        content: marked(post.content),
        date: post.frontmatter.date,
        readTime: Math.ceil(post.content.split(' ').length / 200) + ' dk'
    };
}; 