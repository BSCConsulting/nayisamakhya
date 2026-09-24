"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loc, t } from "@/lib/i18n/dictionary";
import { strategicSteps } from "@/lib/data/metrics";
import { useLanguageStore } from "@/lib/store/preferences";
import { Stagger, fadeUpItem } from "@/components/motion/primitives";

export function StrategicTimeline() {
  const lang = useLanguageStore((s) => s.lang);
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState(strategicSteps[0]?.id ?? "01");
  const openIndex = Math.max(
    0,
    strategicSteps.findIndex((s) => s.id === openId),
  );
  const progress = ((openIndex + 1) / strategicSteps.length) * 100;

  return (
    <section className="px-4 pb-28 md:pb-16" aria-labelledby="strategy-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="strategy-heading"
              className={`text-2xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("strategyTitle", lang)}
            </h2>
            <p
              className={`mt-1 text-sm text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("strategySub", lang)}
            </p>
          </div>
          <div className="w-full max-w-xs sm:w-48">
            <div className="mb-1 flex justify-between text-[11px] text-slate-500">
              <span className={lang === "te" ? "font-telugu" : ""}>
                {t("strategyProgress", lang)}
              </span>
              <span className="metric-tnum">
                {openIndex + 1}/{strategicSteps.length}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: reduce ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-6">
          <span
            className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-slate-200 md:left-[1.35rem]"
            aria-hidden
          />
          <Stagger as="ol" className="space-y-3">
            {strategicSteps.map((step, index) => {
              const open = openId === step.id;
              const pattern =
                step.pattern === "civic" ? "pattern-civic" : "pattern-dots";
              const Item = reduce ? "li" : motion.li;
              return (
                <Item
                  key={step.id}
                  className="relative pl-10 md:pl-12"
                  {...(reduce ? {} : { variants: fadeUpItem })}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(step.id)}
                    className={`absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold transition-colors md:h-9 md:w-9 ${
                      open
                        ? "bg-brand text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    {step.number}
                  </button>

                  <article
                    className={`bento-card overflow-hidden ${pattern} ${
                      open ? "ring-1 ring-brand/20" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={`tap flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${lang === "te" ? "font-telugu" : ""}`}
                      onClick={() => setOpenId(step.id)}
                      aria-expanded={open}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-slate-900">
                          {loc(step.title, lang)}
                        </span>
                        {!open ? (
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {loc(step.body, lang)}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-xs text-slate-400" aria-hidden>
                        {open ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          key="body"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p
                            className={`border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                          >
                            {loc(step.body, lang)}
                          </p>
                          <p className="px-4 pb-3 text-[10px] font-mono tracking-widest text-slate-400">
                            STEP {index + 1} / {strategicSteps.length}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                </Item>
              );
            })}
          </Stagger>
        </div>

        <p
          className={`mt-6 text-center text-xs tracking-wide text-slate-500 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("strategyFooter", lang)}
        </p>
      </div>
    </section>
  );
}
