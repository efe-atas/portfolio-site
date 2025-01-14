import { useState, useEffect } from 'react';

const useGitHubProjects = (username) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
                if (!response.ok) {
                    throw new Error('GitHub API isteği başarısız oldu');
                }
                const repos = await response.json();

                // Projeleri işle ve kategorize et
                const processedProjects = await Promise.all(repos.map(async (repo) => {
                    // README dosyasını çek
                    let description = repo.description;
                    if (!description) {
                        try {
                            const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`);
                            if (readmeResponse.ok) {
                                const readmeData = await readmeResponse.json();
                                const readmeContent = atob(readmeData.content);
                                // İlk paragrafı al
                                description = readmeContent.split('\n\n')[0].replace(/[#\n]/g, '').trim();
                            }
                        } catch (error) {
                            console.log(`README çekilemedi: ${repo.name}`);
                        }
                    }

                    // Kategoriyi belirle
                    let category = 'other';
                    const topics = repo.topics || [];
                    const languages = repo.language ? [repo.language.toLowerCase()] : [];
                    
                    if (topics.includes('frontend') || languages.some(lang => ['javascript', 'typescript', 'react', 'vue', 'angular'].includes(lang))) {
                        category = 'frontend';
                    } else if (topics.includes('backend') || languages.some(lang => ['python', 'java', 'go', 'ruby', 'php'].includes(lang))) {
                        category = 'backend';
                    } else if (topics.includes('fullstack')) {
                        category = 'fullstack';
                    } else if (topics.includes('ai') || topics.includes('machine-learning')) {
                        category = 'ai';
                    } else if (topics.includes('devops')) {
                        category = 'devops';
                    }

                    // Demo URL'ini belirle
                    const demoUrl = repo.homepage || null;

                    return {
                        name: repo.name,
                        description: description || 'Açıklama bulunmuyor.',
                        tech: [repo.language, ...(repo.topics || [])].filter(Boolean),
                        github: repo.html_url,
                        demo: demoUrl,
                        category: category,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        updatedAt: repo.updated_at
                    };
                }));

                // Projeleri güncelleme tarihine göre sırala
                const sortedProjects = processedProjects.sort((a, b) => 
                    new Date(b.updatedAt) - new Date(a.updatedAt)
                );

                setProjects(sortedProjects);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchProjects();
        }
    }, [username]);

    return { projects, loading, error };
};

export default useGitHubProjects; 