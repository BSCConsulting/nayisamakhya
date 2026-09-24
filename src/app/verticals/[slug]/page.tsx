"use client";

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
import { useLanguage } from "@/context/LanguageContext";
import { use, useEffect, useState } from "react";
import type { DirectoryResource, Vertical } from "@/lib/data/verticals";

type Props = { params: Promise<{ slug: string }> };

export default function VerticalPage({ params }: Props) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const te = language === "te";
  const [vertical, setVertical] = useState<Vertical | null | undefined>(undefined);
  const [resources, setResources] = useState<DirectoryResource[]>([]);
  const [allVerticals, setAllVerticals] = useState<Vertical[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [v, res, all] = await Promise.all([
        fetchVerticalBySlug(slug),
        fetchDirectoryResources(slug),
        fetchAllVerticals(),
      ]);
      if (cancelled) return;
      setVertical(v ?? null);
      setResources(res);
      setAllVerticals(all);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (vertical === null) notFound();
  if (vertical === undefined) {
    return (
      <div className="mx-auto max-w-7xl px-3 py-16 text-center text-sm text-[#71717A]">
        {te ? "లోడ్ అవుతోంది…" : "Loading…"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#EBE8E0] bg-white/80 px-3 py-2 text-xs text-muted backdrop-blur-md"
      >
        <Link href="/" className="inline-flex items-center gap-1 hover:text-ink">
          <Home className="h-3.5 w-3.5" aria-hidden />
          {te ? "హోమ్" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className={te ? "font-telugu text-ink" : "text-ink"}>
          {loc(vertical.title, language)}
        </span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="surface-card sticky top-24 overflow-hidden">
            <div className="border-b border-line bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {te ? "విభాగాలు" : "Verticals"}
              </p>
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
                      } ${te ? "font-telugu" : ""}`}
                    >
                      {loc(v.title, language)}
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
            <h1
              className={`mt-2 text-3xl font-bold tracking-tight text-[#18181B] ${te ? "font-telugu" : ""}`}
            >
              {loc(vertical.title, language)}
            </h1>
            <p
              className={`mt-3 max-w-2xl text-sm leading-relaxed text-[#71717A] ${te ? "font-telugu" : ""}`}
            >
              {loc(vertical.summary, language)}
            </p>
            <p
              id={slug === "welfare" ? "power-250" : undefined}
              className={`mt-4 inline-flex rounded-full border border-line bg-[#F4F2EB] px-3 py-1 text-xs font-medium text-ink ${te ? "font-telugu" : ""}`}
            >
              {loc(vertical.heroNote, language)}
            </p>
          </header>

          <ResourceTable resources={resources} />
        </main>
      </div>
    </div>
  );
}
