import { useState, useEffect } from 'react';
import { Client } from '@notionhq/client';

const useNotionPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // API anahtarı ve veritabanı ID'si kontrolü
                const apiKey = import.meta.env.VITE_NOTION_API_KEY;
                const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

                console.log('Environment Check:', {
                    hasApiKey: Boolean(apiKey),
                    hasDatabaseId: Boolean(databaseId),
                    env: import.meta.env.MODE
                });

                if (!apiKey) {
                    throw new Error('Notion API anahtarı eksik. Lütfen .env dosyasını kontrol edin.');
                }

                if (!databaseId) {
                    throw new Error('Notion veritabanı ID\'si eksik. Lütfen .env dosyasını kontrol edin.');
                }

                // Notion istemcisini oluştur
                const notion = new Client({ auth: apiKey });

                // Veritabanı sorgusu
                const response = await notion.databases.query({
                    database_id: databaseId,
                    filter: {
                        and: [
                            {
                                property: 'status',
                                status: {
                                    equals: 'Public'
                                }
                            }
                        ]
                    },
                    sorts: [
                        {
                            property: 'date',
                            direction: 'descending',
                        }
                    ]
                });

                console.log('Database Query Response:', {
                    success: true,
                    results: response.results.length
                });

                // Blog yazılarını işle
                const processedPosts = await Promise.all(
                    response.results.map(async (page) => {
                        try {
                            // Sayfa içeriğini çek
                            const content = await notion.blocks.children.list({
                                block_id: page.id
                            });

                            return {
                                id: page.id,
                                title: page.properties.title?.title[0]?.plain_text || 'Başlıksız',
                                slug: page.properties.slug?.rich_text[0]?.plain_text || page.id,
                                status: page.properties.status?.status?.name || 'Private',
                                type: page.properties.type?.select?.name || 'Post',
                                category: page.properties.category?.multi_select?.map(cat => ({
                                    id: cat.id,
                                    name: cat.name,
                                    color: cat.color
                                })) || [],
                                tags: page.properties.tags?.multi_select?.map(tag => ({
                                    id: tag.id,
                                    name: tag.name,
                                    color: tag.color
                                })) || [],
                                summary: page.properties.summary?.rich_text[0]?.plain_text || '',
                                author: {
                                    name: page.properties.author?.people[0]?.name || 'İsmail Efe',
                                    avatar: page.properties.author?.people[0]?.avatar_url
                                },
                                date: page.properties.date?.date?.start || page.created_time,
                                content: content.results || []
                            };
                        } catch (err) {
                            console.error('Post Processing Error:', {
                                pageId: page.id,
                                error: err.message
                            });
                            return null;
                        }
                    })
                );

                // Geçerli yazıları filtrele ve state'i güncelle
                const validPosts = processedPosts.filter(post => post !== null);
                console.log('Valid Posts:', {
                    total: validPosts.length,
                    posts: validPosts.map(p => ({ id: p.id, title: p.title }))
                });

                setPosts(validPosts);
                setError(null);
            } catch (error) {
                console.error('Notion API Error:', {
                    message: error.message,
                    code: error.code,
                    status: error.status
                });
                setError(error.message || 'Blog yazıları yüklenirken bir hata oluştu');
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default useNotionPosts; 