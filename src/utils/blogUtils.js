import matter from 'gray-matter';

// Blog yazılarını dinamik olarak import et
const importAll = (r) => {
    const files = {};
    r.keys().forEach((key) => {
        const fileName = key.replace(/^\.\//, '');
        files[fileName] = r(key);
    });
    return files;
};

// Markdown dosyalarını import et
const markdownFiles = importAll(
    require.context('../content/blog', false, /\.md$/, 'sync')
);

export const getAllPosts = () => {
    try {
        const posts = Object.entries(markdownFiles).map(([fileName, module]) => {
            const slug = fileName.replace(/\.md$/, '');
            const fileContent = module.default || module;
            
            if (typeof fileContent !== 'string') {
                console.error('Invalid markdown content for file:', fileName);
                return null;
            }

            try {
                const { data: frontmatter, content } = matter(fileContent);
                
                // Okuma süresini hesapla (ortalama 200 kelime/dakika)
                const wordCount = content.split(/\s+/g).length;
                const readTime = Math.ceil(wordCount / 200);

                return {
                    slug,
                    frontmatter,
                    content,
                    readTime,
                    date: new Date(frontmatter.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                };
            } catch (error) {
                console.error('Error parsing markdown file:', fileName, error);
                return null;
            }
        }).filter(Boolean); // null değerleri filtrele

        // Tarihe göre sırala (en yeni en üstte)
        return posts.sort((a, b) => 
            new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    } catch (error) {
        console.error('Error getting all posts:', error);
        return [];
    }
};

export const getPostBySlug = (slug) => {
    try {
        const posts = getAllPosts();
        return posts.find(post => post.slug === slug);
    } catch (error) {
        console.error('Post bulunamadı:', error);
        return null;
    }
}; 