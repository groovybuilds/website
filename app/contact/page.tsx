import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background layers MUST NOT block clicks */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95" />
        {/* subtle texture */}
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(1200px_600px_at_20%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(900px_500px_at_80%_30%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      {/* Content layer ABOVE everything */}
      <div className="relative z-20 mx-auto w-full max-w-2xl px-5 pb-16 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-2 text-sm text-white/70">
            Tell us a bit about your project. We’ll get back to you within{" "}
            <span className="text-white">1–2 business days</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
