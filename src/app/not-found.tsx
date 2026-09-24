import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-mono text-sm tracking-widest text-slate-400">404</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 font-telugu">
          పేజీ కనబడలేదు
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This mandal or page could not be found.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="tap inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white"
          >
            Home
          </Link>
          <Link
            href="/mandals"
            className="tap inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-900"
          >
            Mandals
          </Link>
        </div>
      </div>
    </section>
  );
}
