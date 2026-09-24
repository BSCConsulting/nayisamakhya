"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useLanguageStore } from "@/lib/store/preferences";
import { cn } from "@/lib/utils";

const chips = [
  "250 యూనిట్ల ఉచిత విద్యుత్ ఎలా పొందాలి?",
  "BC-A స్కాలర్‌షిప్ దరఖాస్తు",
  "భజంత్రి పెన్షన్ స్థితి",
  "మండల అధికారిని సంప్రదించండి",
] as const;

type Msg = { role: "bot" | "user"; text: string };

export function CivicChatbot() {
  const lang = useLanguageStore((s) => s.lang);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text:
        lang === "te"
          ? "నమస్కారం — నేను సమాఖ్య మిత్ర. దిగువ ప్రాంప్ట్‌లు ఎంచుకోండి లేదా ప్రశ్న రాయండి."
          : "Namaskaram — I am Samakhya Mitra. Pick a prompt or type your question.",
    },
  ]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      {
        role: "bot",
        text:
          lang === "te"
            ? "మీ అభ్యర్థన నమోదైంది. సంబంధిత వర్టికల్ పేజీ లేదా మండల కేంద్రం నుంచి వివరాలు చూడండి. అవసరమైతే 1800-NAYI-SEVAకి కాల్ చేయండి."
            : "Request noted. See the related vertical page or mandal hub for details. Call 1800-NAYI-SEVA if urgent.",
      },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open ? (
        <div
          role="dialog"
          aria-label="సమాఖ్య మిత్ర"
          className="flex h-[28rem] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-line bg-[#18181B] px-4 py-3 text-white">
            <div>
              <p className="font-telugu text-sm font-semibold">సమాఖ్య మిత్ర</p>
              <p className="text-[10px] text-zinc-400">
                {lang === "te" ? "సివిక్ అసిస్టెంట్" : "Civic assistant"}
              </p>
            </div>
            <button
              type="button"
              className="tap inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-canvas p-3">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={cn(
                  "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  m.role === "bot"
                    ? "bg-white text-ink border border-line font-telugu"
                    : "ml-auto bg-brand text-white",
                )}
              >
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => send(chip)}
                  className="rounded-full border border-line bg-white px-2.5 py-1 font-telugu text-[11px] text-ink hover:bg-warm"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex gap-2 border-t border-line bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "te" ? "ప్రశ్న రాయండి…" : "Ask a question…"}
              className="h-11 flex-1 rounded-xl border border-line bg-canvas px-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
            />
            <button type="submit" className="btn-brand h-11 w-11 px-0" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="chat-pulse tap inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-hover"
        aria-expanded={open}
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        <span className="font-telugu">సమాఖ్య మిత్ర</span>
      </button>
    </div>
  );
}
