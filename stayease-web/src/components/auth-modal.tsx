"use client";

import { AnimatePresence, motion } from "framer-motion";

type AuthModalProps = {
  mode: "login" | "register";
  open: boolean;
  onClose: () => void;
  onToggleMode: () => void;
  onSubmit: (formData: FormData) => void;
};

export function AuthModal({
  mode,
  open,
  onClose,
  onToggleMode,
  onSubmit,
}: AuthModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="surface w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                  Account
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                  {mode === "login" ? "Login to StayEase" : "Create your account"}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>

            <form action={onSubmit} className="mt-5 grid gap-3">
              {mode === "register" ? (
                <input
                  name="name"
                  placeholder="Full name"
                  className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 outline-none"
                />
              ) : null}
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 outline-none"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 outline-none"
              />
              <button
                type="submit"
                className="rounded-2xl bg-[var(--foreground)] px-4 py-3 font-semibold text-[var(--background)]"
              >
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>

            <button
              type="button"
              onClick={onToggleMode}
              className="mt-4 text-sm text-[var(--muted)]"
            >
              {mode === "login"
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
