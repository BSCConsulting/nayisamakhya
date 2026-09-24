"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Filter } from "lucide-react";
import type { DirectoryResource } from "@/lib/data/verticals";
import { loc } from "@/lib/i18n/dictionary";
import { useLanguageStore } from "@/lib/store/preferences";
import { cn } from "@/lib/utils";

export function ResourceTable({ resources }: { resources: DirectoryResource[] }) {
  const lang = useLanguageStore((s) => s.lang);
  const categories = useMemo(() => {
    const set = new Map<string, DirectoryResource["category"]>();
    for (const r of resources) set.set(r.category.en, r.category);
    return [...set.values()];
  }, [resources]);

  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? resources
      : resources.filter((r) => r.category.en === active);

  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white p-4">
        <Filter className="h-4 w-4 text-muted" aria-hidden />
        <button
          type="button"
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
            active === "all"
              ? "bg-[#C2410C] text-white"
              : "border border-[#EBE8E0] bg-white text-ink hover:bg-[#F4F2EB]",
            lang === "te" ? "font-telugu" : "",
          )}
        >
          {lang === "te" ? "అన్నీ" : "All"}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.en}
            type="button"
            onClick={() => setActive(cat.en)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              active === cat.en
                ? "bg-[#C2410C] text-white"
                : "border border-[#EBE8E0] bg-white text-ink hover:bg-[#F4F2EB]",
              lang === "te" ? "font-telugu" : "",
            )}
          >
            {loc(cat, lang)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F4F2EB] text-[#18181B]">
            <tr>
              <th className={`px-4 py-3 font-semibold ${lang === "te" ? "font-telugu" : ""}`}>
                {lang === "te" ? "శీర్షిక" : "Title"}
              </th>
              <th className={`px-4 py-3 font-semibold ${lang === "te" ? "font-telugu" : ""}`}>
                {lang === "te" ? "వర్గం" : "Category"}
              </th>
              <th className={`hidden px-4 py-3 font-semibold md:table-cell ${lang === "te" ? "font-telugu" : ""}`}>
                {lang === "te" ? "జిల్లా" : "District"}
              </th>
              <th className={`px-4 py-3 font-semibold ${lang === "te" ? "font-telugu" : ""}`}>
                {lang === "te" ? "నవీకరణ" : "Updated"}
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className={`px-4 py-8 text-center text-muted ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {lang === "te" ? "వనరులు లభ్యం కాలేదు." : "No resources found."}
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-t border-line hover:bg-[#F4F2EB]/60">
                  <td className="px-4 py-3">
                    <p className={`font-medium text-ink ${lang === "te" ? "font-telugu" : ""}`}>
                      {loc(row.title, lang)}
                    </p>
                    <p className={`mt-0.5 text-xs text-muted ${lang === "te" ? "font-telugu" : ""}`}>
                      {loc(row.description, lang)}
                    </p>
                  </td>
                  <td className={`px-4 py-3 text-muted ${lang === "te" ? "font-telugu" : ""}`}>
                    {loc(row.category, lang)}
                  </td>
                  <td className={`hidden px-4 py-3 text-muted md:table-cell ${lang === "te" ? "font-telugu" : ""}`}>
                    {loc(row.district, lang)}
                  </td>
                  <td className="px-4 py-3 metric-tnum text-xs text-muted">
                    {row.updated_at}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={row.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover"
                    >
                      {lang === "te" ? "తెరవండి" : "Open"}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
