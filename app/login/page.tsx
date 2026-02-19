"use client";
import React, { useState } from "react";
import { loginSchema, LoginSchemaType } from "@/lib/schema/loginSchema";
import { useRouter } from "next/navigation";
import { TrendingUp, User, Lock } from "lucide-react";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginSchemaType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<LoginErrors | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = loginSchema.safeParse(formData); //gives me back a result object with success and data / error

    if (!result.success) {
      const zodErrors = result.error.flatten().fieldErrors;

      setError({
        email: zodErrors.email?.[0],
        password: zodErrors.password?.[0],
      });
      return;
    }

    setError(null);
    setLoading(true);

    console.log("Login data is valid:", result.data);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#080F25] relative overflow-hidden flex items-center justify-center">

      {/* ── Background blobs ── */}
      {/* Top-left organic blob */}
      <div
        className="pointer-events-none absolute -top-48 -left-48 w-[580px] h-[480px] bg-[#0D1A3A]"
        style={{ borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%" }}
      />
      {/* Bottom-right organic blob */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[440px] bg-[#0D1A3A]"
        style={{ borderRadius: "42% 58% 34% 66% / 48% 62% 38% 52%" }}
      />
      {/* Mid-left accent blob */}
      <div
        className="pointer-events-none absolute top-[30%] -left-24 w-[260px] h-[320px] bg-[#0D1A3A] opacity-60"
        style={{ borderRadius: "70% 30% 60% 40% / 50% 60% 40% 50%" }}
      />
      {/* Top-right accent blob */}
      <div
        className="pointer-events-none absolute -top-20 right-[10%] w-[200px] h-[240px] bg-[#0D1A3A] opacity-50"
        style={{ borderRadius: "38% 62% 55% 45% / 45% 55% 45% 55%" }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[320px] px-6 animate-fade-in">

        {/* Logo icon */}
        <div className="flex justify-center mb-5">
          <TrendingUp
            className="w-14 h-14 text-white"
            strokeWidth={1.25}
          />
        </div>

        {/* App name */}
        <h1 className="text-white text-center text-lg font-bold tracking-[0.25em] uppercase mb-10">
          CreatorAnalytics
        </h1>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Email / Username */}
          <div>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/50"
                strokeWidth={1.5}
              />
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Username"
                className={`w-full bg-transparent border rounded-lg pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-150 ${
                  error?.email
                    ? "border-red-500/60 focus:border-red-400/80"
                    : "border-white/20 hover:border-white/35 focus:border-white/55"
                }`}
              />
            </div>
            {error?.email && (
              <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">
                {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/50"
                strokeWidth={1.5}
              />
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                className={`w-full bg-transparent border rounded-lg pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-150 ${
                  error?.password
                    ? "border-red-500/60 focus:border-red-400/80"
                    : "border-white/20 hover:border-white/35 focus:border-white/55"
                }`}
              />
            </div>
            {error?.password && (
              <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">
                {error.password}
              </p>
            )}
          </div>

          {/* LOGIN button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-white hover:bg-white/90 active:bg-white/80 disabled:bg-white/30 text-[#080F25] disabled:text-[#080F25]/40 text-sm font-bold py-3.5 px-4 rounded-lg tracking-[0.18em] uppercase transition-all duration-150 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
                Signing in…
              </span>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
