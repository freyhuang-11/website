"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export function LeadForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, locale }),
    }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  };

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
        <p className="text-lg">{t("sent")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm text-muted-foreground mb-2">{t("nameLabel")}</label>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">{t("emailLabel")} *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">{t("messageLabel")} *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent outline-none transition resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {t("send")} →
      </button>
    </form>
  );
}
