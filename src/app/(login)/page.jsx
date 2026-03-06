"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { authService } from "@/services/api";
import { Button, Input, Alert } from "@/components/ui";

export default function LoginPage() {
  const { login, setAuthLoading } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("alex@workspace.io");
  const [password, setPassword] = useState("password123");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const { user } = await authService.login(email, password);
      login(user);
      router.push("/dashboard");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/3 rounded-full blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400 mb-4">
            <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="#0a0a0a" />
              <rect
                x="8"
                y="8"
                width="5"
                height="5"
                rx="1"
                fill="#0a0a0a"
                opacity="0.4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            work<span className="text-amber-400">space</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Book your perfect workspace
          </p>
        </div>

        {/* Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-neutral-500 text-sm mb-6">
            Sign in to your account to continue
          </p>

          {apiError && (
            <div className="mb-5">
              <Alert type="error" message={apiError} />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((p) => ({ ...p, email: "" }));
              }}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((p) => ({ ...p, password: "" }));
              }}
              error={errors.password}
              autoComplete="current-password"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <Button
            onClick={handleSubmit}
            loading={loading}
            className="w-full mt-6"
            size="lg"
          >
            Sign in
          </Button>

          {/* Demo hint */}
          <div className="mt-5 p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/50">
            <p className="text-xs text-neutral-500 text-center">
              Demo credentials are pre-filled · just click Sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
