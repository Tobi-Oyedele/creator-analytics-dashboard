"use client";
import React, { useState } from "react";
import { loginSchema, LoginSchemaType } from "@/lib/schema/loginSchema";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex bg-white">
      {/* ── Left branding panel (lg+) ── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] bg-slate-950 relative overflow-hidden flex-col justify-between p-12 animate-fade-in">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 w-120 h-120 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            CreatorAnalytics
          </span>
        </div>

        {/* Hero copy + feature list */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-[1.15] tracking-tight">
              Understand your audience,
              <br />
              <span className="text-emerald-400">grow your impact.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Real-time analytics and insights for creators who take their
              content seriously.
            </p>
          </div>

          <ul className="space-y-3.5">
            {[
              {
                d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                label: "Track engagement across all platforms",
              },
              {
                d: "M13 10V3L4 14h7v7l9-11h-7z",
                label: "Real-time performance metrics",
              },
              {
                d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Audience insights and demographics",
              },
            ].map(({ d, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={d}
                    />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial card */}
        <div className="relative z-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 space-y-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              &ldquo;CreatorAnalytics helped me understand what content
              resonates most. My engagement rate doubled in just 3
              months.&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">AK</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-none mb-0.5">
                  Alex Kim
                </p>
                <p className="text-slate-500 text-xs">
                  Content Creator · 2.4M subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:px-10 bg-white">
        <div className="w-full max-w-90 animate-slide-up">
          {/* Mobile-only logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-400/30">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-slate-900 font-semibold text-base tracking-tight">
              CreatorAnalytics
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="you@example.com"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-shadow outline-none ${
                  error?.email
                    ? "border-red-400 ring-2 ring-red-100 focus:border-red-400"
                    : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {error?.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {error.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="••••••••"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-shadow outline-none ${
                  error?.password
                    ? "border-red-400 ring-2 ring-red-100 focus:border-red-400"
                    : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {error?.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {error.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:bg-slate-300 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-150 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
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
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-slate-400 leading-relaxed">
            By signing in, you agree to our{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-slate-600 transition-colors">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-slate-600 transition-colors">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
