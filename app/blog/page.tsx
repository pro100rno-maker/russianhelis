export const dynamic = 'force-dynamic';
import Link from "next/link";
import { strapiFetch } from "@/lib/strapi";

type StrapiImage = {
  url: string;
  alternativeText?: string;
};

type Post = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    publishedAt: string;
    cover?: { data?: { attributes: StrapiImage } };
  };
};

export default async function BlogPage() {
  const data = await strapiFetch<{ data: Post[] }>(
    "/api/posts?populate=cover&sort=publishedAt:desc"
  );

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Блог</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((post) => {
          const img = post.attributes.cover?.data?.attributes;
          return (
            <Link
              key={post.id}
              href={`/blog/${post.attributes.slug}`}
              className="block rounded-2xl shadow hover:shadow-lg transition overflow-hidden bg-white"
            >
              {img?.url && (
                <img
                  src={img.url}
                  alt={img.alternativeText ?? post.attributes.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {post.attributes.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(post.attributes.publishedAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
