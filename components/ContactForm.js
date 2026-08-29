"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/lib/site";

const initialState = { name: "", phone: "", email: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          message: values.message,
          _subject: `פנייה חדשה מהאתר מ-${values.name}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-gold/30 bg-brand-black p-10 text-center text-white">
        <CheckCircle2 className="text-brand-gold" size={40} />
        <h3 className="text-xl font-bold">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-white/70">נחזור אליכם בהקדם האפשרי. תודה שפניתם אלינו.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-brand-gold underline underline-offset-2"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/80">
            שם מלא *
          </label>
          <input
            id="name"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-brand-gold"
            placeholder="השם שלך"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/80">
            טלפון *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={values.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-brand-gold"
            placeholder="05X-XXXXXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
          דוא&quot;ל
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-brand-gold"
          placeholder="name@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/80">
          הודעה *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={handleChange}
          className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-brand-gold"
          placeholder="ספרו לנו במה נוכל לעזור..."
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={18} />
          משהו השתבש בשליחה. נסו שוב, או פנו אלינו ישירות בטלפון.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-base font-semibold text-brand-black transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            שולח...
          </>
        ) : (
          "שליחת הודעה"
        )}
      </button>
    </form>
  );
}
