"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { estimate, type QuoteInput } from "@/lib/quote-rules";

type Answers = Partial<QuoteInput> & {
  email?: string;
  company?: string;
  notes?: string;
};

const STEPS = 6;

export function QuoteWizard() {
  const t = useTranslations("quote");
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<{ low: number; high: number; tier: string } | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pick = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setError("");
    if (step < STEPS - 1) setStep(step + 1);
  };

  const submit = async () => {
    const email = answers.email?.trim() ?? "";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(t("errorEmail"));
      return;
    }
    setSubmitting(true);
    const input: QuoteInput = {
      projectType: answers.projectType!,
      scale: answers.scale!,
      timeline: answers.timeline!,
      needAI: answers.needAI!,
      needI18n: answers.needI18n ?? false,
    };
    const est = estimate(input);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, email, company: answers.company, notes: answers.notes, locale, estimateLow: est.low, estimateHigh: est.high }),
      });
    } catch {
      // Lead persistence failure shouldn't block showing the estimate
    }
    setResult(est);
    setSubmitting(false);
  };

  const fmt = (n: number) => `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;

  if (result) {
    const tiers = [
      { id: "light", name: t("tierLight"), range: t("tierLightRange") },
      { id: "standard", name: t("tierStandard"), range: t("tierStandardRange") },
      { id: "flagship", name: t("tierFlagship"), range: t("tierFlagshipRange") },
    ];
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
        <p className="text-muted-foreground mb-2">{t("resultTitle")}</p>
        <div className="text-5xl md:text-7xl font-medium text-accent glow mb-6">
          {fmt(result.low)} – {fmt(result.high)}
        </div>
        <p className="text-sm text-muted-foreground mb-10 max-w-lg">{t("resultNote")}</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-5 ${
                tier.id === result.tier
                  ? "border-accent bg-accent/10"
                  : "border-border bg-background"
              }`}
            >
              {tier.id === result.tier && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                  {t("recommended")}
                </div>
              )}
              <div className="font-medium">{tier.name}</div>
              <div className="font-mono text-sm text-muted-foreground mt-1">{tier.range}</div>
            </div>
          ))}
        </div>
        <a
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
        >
          {t("talk")} →
        </a>
      </div>
    );
  }

  const optionBtn = (label: string, onClick: () => void, selected: boolean) => (
    <button
      key={label}
      onClick={onClick}
      className={`text-left px-6 py-4 rounded-2xl border transition ${
        selected
          ? "border-accent bg-accent/10 text-foreground"
          : "border-border bg-surface hover:border-accent/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  const steps: React.ReactNode[] = [
    // Q1 project type
    <div key="q1" className="grid sm:grid-cols-2 gap-3">
      {(
        [
          ["website", t("q1a")],
          ["tool", t("q1b")],
          ["agent", t("q1c")],
          ["saas", t("q1d")],
          ["mobile", t("q1e")],
          ["other", t("q1f")],
        ] as const
      ).map(([v, label]) =>
        optionBtn(label, () => pick("projectType", v), answers.projectType === v),
      )}
    </div>,
    // Q2 scale
    <div key="q2" className="grid sm:grid-cols-2 gap-3">
      {(
        [
          ["solo", t("q2a")],
          ["lt10", t("q2b")],
          ["10to50", t("q2c")],
          ["gt50", t("q2d")],
        ] as const
      ).map(([v, label]) => optionBtn(label, () => pick("scale", v), answers.scale === v))}
    </div>,
    // Q3 timeline
    <div key="q3" className="grid sm:grid-cols-2 gap-3">
      {(
        [
          ["lt4w", t("q3a")],
          ["1to3m", t("q3b")],
          ["3to6m", t("q3c")],
          ["gt6m", t("q3d")],
        ] as const
      ).map(([v, label]) => optionBtn(label, () => pick("timeline", v), answers.timeline === v))}
    </div>,
    // Q4 AI
    <div key="q4" className="grid sm:grid-cols-3 gap-3">
      {(
        [
          ["yes", t("q4a")],
          ["unsure", t("q4b")],
          ["no", t("q4c")],
        ] as const
      ).map(([v, label]) => optionBtn(label, () => pick("needAI", v), answers.needAI === v))}
    </div>,
    // Q5 i18n
    <div key="q5" className="grid sm:grid-cols-2 gap-3">
      {optionBtn(t("q5a"), () => pick("needI18n", true), answers.needI18n === true)}
      {optionBtn(t("q5b"), () => pick("needI18n", false), answers.needI18n === false)}
    </div>,
    // Q6 contact
    <div key="q6" className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm text-muted-foreground mb-2">{t("emailLabel")} *</label>
        <input
          type="email"
          value={answers.email ?? ""}
          onChange={(e) => setAnswers((a) => ({ ...a, email: e.target.value }))}
          placeholder={t("emailPlaceholder")}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">{t("companyLabel")}</label>
        <input
          value={answers.company ?? ""}
          onChange={(e) => setAnswers((a) => ({ ...a, company: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">{t("notesLabel")}</label>
        <textarea
          value={answers.notes ?? ""}
          onChange={(e) => setAnswers((a) => ({ ...a, notes: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none transition resize-none"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        onClick={submit}
        disabled={submitting}
        className="w-full px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {t("submit")} →
      </button>
    </div>,
  ];

  const questions = [t("q1"), t("q2"), t("q3"), t("q4"), t("q5"), t("q6")];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-xs text-muted-foreground">
          {t("step", { current: step + 1, total: STEPS })}
        </span>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {t("back")}
          </button>
        )}
      </div>
      {/* progress */}
      <div className="h-1 bg-muted rounded-full mb-12 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS) * 100}%` }}
        />
      </div>
      <h2 className="text-2xl md:text-3xl font-medium mb-8">{questions[step]}</h2>
      {steps[step]}
    </div>
  );
}
