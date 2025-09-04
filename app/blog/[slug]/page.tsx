import { notFound } from "next/navigation";
import { strapiFetch } from "@/lib/strapi";

type Post = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string; // richtext как HTML или текст; при необходимости отрендерьте безопасно
    publishedAt: string;
  };
};

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const data = await strapiFetch<{ data: Post[] }>(
    `/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&publicationState=live`
  );

  const post = data.data[0];
  if (!post) return notFound();

  return (
    <main className="container mx-auto px-4 py-10 prose max-w-3xl">
      <h1>{post.attributes.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.attributes.publishedAt).toLocaleDateString("ru-RU")}
      </p>
      {/* Если content в HTML: dangerouslySetInnerHTML. Если в Markdown — отрендерьте MD. */}
      <div
        dangerouslySetInnerHTML={{ __html: post.attributes.content }}
      />
    </main>
  );
}
