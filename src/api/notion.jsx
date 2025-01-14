import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_API_KEY
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function getPosts() {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            sorts: [
                {
                    property: 'updatedAt',
                    direction: 'descending',
                }
            ],
            filter: {
                and: [
                    {
                        property: 'status',
                        status: {
                            equals: 'Public'
                        }
                    }
                ]
            }
        });

        const posts = await Promise.all(
            response.results.map(async (page) => {
                // Sayfa içeriğini çek
                const content = await notion.blocks.children.list({
                    block_id: page.id
                });

                return {
                    ...page,
                    content: content.results
                };
            })
        );

        return posts;
    } catch (error) {
        console.error('Notion API Error:', error);
        throw new Error('Blog yazıları yüklenirken bir hata oluştu');
    }
}

export async function getPostBySlug(slug) {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
                and: [
                    {
                        property: 'slug',
                        rich_text: {
                            equals: slug
                        }
                    },
                    {
                        property: 'status',
                        status: {
                            equals: 'Public'
                        }
                    }
                ]
            }
        });

        if (!response.results.length) {
            throw new Error('Yazı bulunamadı');
        }

        const page = response.results[0];
        const content = await notion.blocks.children.list({
            block_id: page.id
        });

        return {
            ...page,
            content: content.results
        };
    } catch (error) {
        console.error('Notion API Error:', error);
        throw new Error('Blog yazısı yüklenirken bir hata oluştu');
    }
}

// Notion bloklarını HTML'e dönüştür
export function renderNotionBlock(block) {
    switch (block.type) {
        case 'paragraph':
            return {
                type: 'text',
                content: block.paragraph.rich_text.map(text => text.plain_text).join('')
            };
        case 'heading_1':
            return {
                type: 'h1',
                content: block.heading_1.rich_text.map(text => text.plain_text).join('')
            };
        case 'heading_2':
            return {
                type: 'h2',
                content: block.heading_2.rich_text.map(text => text.plain_text).join('')
            };
        case 'heading_3':
            return {
                type: 'h3',
                content: block.heading_3.rich_text.map(text => text.plain_text).join('')
            };
        case 'bulleted_list_item':
            return {
                type: 'list',
                listType: 'bullet',
                content: block.bulleted_list_item.rich_text.map(text => text.plain_text).join('')
            };
        case 'numbered_list_item':
            return {
                type: 'list',
                listType: 'number',
                content: block.numbered_list_item.rich_text.map(text => text.plain_text).join('')
            };
        case 'code':
            return {
                type: 'code',
                language: block.code.language,
                content: block.code.rich_text.map(text => text.plain_text).join('')
            };
        case 'image':
            return {
                type: 'image',
                url: block.image.file?.url || block.image.external?.url,
                caption: block.image.caption?.map(text => text.plain_text).join('')
            };
        case 'quote':
            return {
                type: 'quote',
                content: block.quote.rich_text.map(text => text.plain_text).join('')
            };
        case 'divider':
            return {
                type: 'divider'
            };
        default:
            return null;
    }
} 