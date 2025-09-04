import Link from "next/link";
import { strapiFetch } from "@/lib/strapi";

type Media = { url: string; alternativeText?: string };
type Helicopter = {
  id: number;
  attributes: {
    title: string;
    slug?: string; // если есть
    price?: string;
    thumbnail?: { data?: { attributes: Media } };
    short?: string;
  };
};

export default async function MarketPage() {
  const data = await strapiFetch<{ data: Helicopter[] }>(
    "/api/helicopters?populate=thumbnail&sort=publishedAt:desc"
  );

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Маркетплейс</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((item) => {
          const img = item.attributes.thumbnail?.data?.attributes;
          const slugOrId = item.attributes.slug ?? String(item.id);
          return (
            <Link
              key={item.id}
              href={`/market/${slugOrId}`}
              className="block rounded-2xl shadow hover:shadow-lg transition overflow-hidden bg-white"
            >
              {img?.url && (
                <img
                  src={img.url}
                  alt={img.alternativeText ?? item.attributes.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {item.attributes.title}
                </h2>
                {item.attributes.price && (
                  <p className="mt-1 text-sm text-gray-700">{item.attributes.price}</p>
                )}
                {item.attributes.short && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {item.attributes.short}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
