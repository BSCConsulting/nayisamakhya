import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { ResourceTable } from "@/components/ResourceTable";
import {
  fetchAllVerticals,
  fetchDirectoryResources,
  fetchVerticalBySlug,
} from "@/lib/data/verticals";
import { loc } from "@/lib/i18n/dictionary";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await fetchAllVerticals();
  return rows.map((v) => ({ slug: v.slug }));
}

export default async function VerticalPage({ params }: Props) {
  const { slug } = await params;
  const vertical = await fetchVerticalBySlug(slug);
  if (!vertical) notFound();

  const [resources, allVerticals] = await Promise.all([
    fetchDirectoryResources(slug),
    fetchAllVerticals(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#EBE8E0] bg-white/80 px-3 py-2 text-xs text-muted backdrop-blur-md"
      >
        <Link href="/" className="inline-flex items-center gap-1 hover:text-ink">
          <Home className="h-3.5 w-3.5" aria-hidden />
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="font-telugu text-ink">{loc(vertical.title, "te")}</span>
        <span className="text-line">/</span>
        <span>{loc(vertical.title, "en")}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="surface-card sticky top-24 overflow-hidden">
            <div className="border-b border-line bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Verticals
              </p>
              <p className="mt-1 font-telugu text-sm font-bold text-ink">విభాగాలు</p>
            </div>
            <ul className="p-2">
              {allVerticals.map((v) => {
                const active = v.slug === slug;
                return (
                  <li key={v.id}>
                    <Link
                      href={`/verticals/${v.slug}`}
                      className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-[#C2410C] font-semibold text-white"
                          : "text-ink hover:bg-[#F4F2EB]"
                      }`}
                    >
                      <span className="font-telugu">{loc(v.title, "te")}</span>
                      <span className="mt-0.5 block text-[11px] opacity-80">
                        {loc(v.title, "en")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-5">
          <header className="surface-card bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Nayi Samakhya · Directory
            </p>
            <h1 className="mt-2 font-telugu text-3xl font-bold tracking-tight text-[#18181B]">
              {loc(vertical.title, "te")}
            </h1>
            <p className="mt-1 text-lg font-medium text-ink">{loc(vertical.title, "en")}</p>
            <p className="mt-3 max-w-2xl font-telugu text-sm leading-relaxed text-[#71717A]">
              {loc(vertical.summary, "te")}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-muted">{loc(vertical.summary, "en")}</p>
            <p
              id={slug === "welfare" ? "power-250" : undefined}
              className="mt-4 inline-flex rounded-full border border-line bg-[#F4F2EB] px-3 py-1 font-telugu text-xs font-medium text-ink"
            >
              {loc(vertical.heroNote, "te")}
            </p>
          </header>

          <ResourceTable resources={resources} />
        </main>
      </div>
    </div>
  );
}
