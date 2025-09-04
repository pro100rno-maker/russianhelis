import { notFound } from "next/navigation";
import { strapiFetch } from "@/lib/strapi";

type Helicopter = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description?: string; // richtext/HTML
    gallery?: { data?: { attributes: { url: string; alternativeText?: string } }[] };
    price?: string;
    specs?: string; // JSON/MD/HTML - как у вас заведено
  };
};

export default async function MarketItemPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const data = await strapiFetch<{ data: Helicopter[] }>(
    `/api/helicopters?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&publicationState=live`
  );

  const item = data.data[0];
  if (!item) return notFound();

  const gallery = item.attributes.gallery?.data ?? [];

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{item.attributes.title}</h1>
      {item.attributes.price && <p className="mt-2 text-xl">{item.attributes.price}</p>}

      {gallery.length > 0 && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 my-6">
          {gallery.map((g, i) => (
            <img
              key={i}
              src={g.attributes.url}
              alt={g.attributes.alternativeText ?? item.attributes.title}
              className="w-full h-48 object-cover rounded-xl"
            />
          ))}
        </div>
      )}

      {item.attributes.description && (
        <article
          className="prose max-w-3xl"
          dangerouslySetInnerHTML={{ __html: item.attributes.description }}
        />
      )}
    </main>
  );
}
