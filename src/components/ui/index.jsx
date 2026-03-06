"use client";
import { forwardRef } from "react";

// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

  const variants = {
    primary:
      "bg-amber-400 text-neutral-950 hover:bg-amber-300 active:scale-[0.98] shadow-lg shadow-amber-400/20",
    secondary:
      "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border border-neutral-700",
    ghost:
      "bg-transparent text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-xl gap-2",
    lg: "text-base px-7 py-3.5 rounded-xl gap-2",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-neutral-900 border ${
          error ? "border-red-500/60" : "border-neutral-700"
        } text-neutral-100 placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
});

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-neutral-800 text-neutral-300 border border-neutral-700",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30",
    info: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`bg-neutral-900 border border-neutral-800 rounded-2xl ${
        hover
          ? "hover:border-neutral-600 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 cursor-pointer"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = "md" }) {
  const s = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <svg
      className={`animate-spin ${s[size]} text-amber-400`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="text-5xl">{icon}</div>
      <div>
        <p className="text-neutral-200 font-semibold text-lg">{title}</p>
        <p className="text-neutral-500 text-sm mt-1 max-w-xs mx-auto">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────
export function Alert({ type = "error", message }) {
  const styles = {
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    info: "bg-sky-500/10 border-sky-500/30 text-sky-400",
  };
  const icons = { error: "⚠", success: "✓", info: "ℹ" };
  return (
    <div
      className={`flex items-start gap-3 border rounded-xl px-4 py-3 text-sm ${styles[type]}`}
    >
      <span className="font-bold mt-0.5">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}
