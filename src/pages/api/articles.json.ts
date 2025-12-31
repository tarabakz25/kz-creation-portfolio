import type { APIRoute } from 'astro';

export type Article = {
  title: string;
  url: string;
  publishedAt?: string;
  imageUrl?: string;
}

export const GET: APIRoute = async ({ request }) => {
  const username = import.meta.env.NOTE_USERNAME || new URL(request.url).searchParams.get('user');
  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required' }), { status: 400 });
  }

  const url = `https://note.com/api/v2/creators/${encodeURIComponent(username)}/contents?kind=note`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      return new Response(JSON.stringify({ error: `Failed to fetch articles: ${res.status} ${errorText}` }), { 
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const json = await res.json();
    const contents = json.data?.contents ?? [];
    
    // デバッグ用: 実際のAPIレスポンス構造を確認
    console.log('Note.com API Response structure:', JSON.stringify(json, null, 2));
    if (contents.length > 0) {
      console.log('First item structure:', JSON.stringify(contents[0], null, 2));
    }
    
    // Note.com APIの実際の構造に合わせてマッピング
    const articles = contents
      .map((item: any) => {
        // Note.com APIの構造を確認: name, key, publishAt, publishedAt など
        const title = item?.name || item?.title || '';
        const key = item?.key || '';
        const publishAt = item?.publishAt || item?.publishedAt || '';
        const eyecatch = item?.eyecatch || item?.thumbnail || '';
        
        // URLの構築: https://note.com/{username}/n/{key}
        const articleUrl = key 
          ? `https://note.com/${username}/n/${key}`
          : item?.url || '';
        
        return {
          title,
          url: articleUrl,
          publishedAt: publishAt,
          imageUrl: eyecatch,
        };
      })
      .filter((article: Article) => article.title && article.url)
      .sort((a: Article, b: Article) => {
        if (!a.publishedAt || !b.publishedAt) return 0;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

    return new Response(JSON.stringify({ items: articles }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: `Internal Server Error: ${errorMessage}` }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
