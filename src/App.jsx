import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.2, 0.8, 0.2, 1];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ label, type = "text", value, onChange, error, touched }) {
  const invalid = touched && error;
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-1.5 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-colors focus:outline-none ${
          invalid ? "border-red-400" : "border-white/15 focus:border-accent-2"
        }`}
        aria-invalid={!!invalid}
      />
      <AnimatePresence>
        {invalid && (
          <motion.span
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-1 block text-xs text-red-300"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);

  const errors = {
    name: name.trim().length < 2 ? "Indiquez votre nom." : "",
    email: !emailRe.test(email) ? "Adresse email invalide." : "",
  };
  const valid = !errors.name && !errors.email;

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (valid) setDone(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        {/* Pitch */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70">
            ✦ Bientôt disponible
          </span>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.05]">
            Lumen. <span className="bg-gradient-to-r from-accent-2 to-white bg-clip-text text-transparent">La clarté</span> pour vos projets.
          </h1>
          <p className="mt-5 max-w-md text-white/70">
            Rejoignez la liste d'attente et soyez parmi les premiers à essayer Lumen — sans engagement, sans spam.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#f59e0b", "#ec4899", "#10b981", "#38bdf8"].map((c, i) => (
                <span key={i} className="h-8 w-8 rounded-full border-2 border-[#160d2e]" style={{ background: c }} />
              ))}
            </div>
            <p className="text-sm text-white/60">+1 200 personnes déjà inscrites</p>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}
          className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-8 text-center">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </motion.span>
                <h2 className="mt-5 text-2xl font-semibold">Vous êtes sur la liste !</h2>
                <p className="mt-2 text-white/70">Merci {name.split(" ")[0]} — votre place : <span className="font-semibold text-accent-2">#1 247</span>. On vous écrit au lancement.</p>
                <button onClick={() => { setDone(false); setName(""); setEmail(""); setTouched({}); }} className="mt-6 text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
                  Inscrire quelqu'un d'autre
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4" noValidate>
                <h2 className="text-xl font-semibold">Rejoindre la liste d'attente</h2>
                <Field label="Nom" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} touched={touched.name} />
                <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} touched={touched.email} />
                <button type="submit" className="mt-2 rounded-xl bg-accent py-3 font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-accent/90">
                  Rejoindre — c'est gratuit
                </button>
                <p className="text-center text-xs text-white/40">Aucune carte requise. Désinscription en un clic.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
