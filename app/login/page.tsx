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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-2xl shadow-black/50 px-8 py-10 animate-slide-up">

          {/* Brand mark */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
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
            <span className="text-slate-900 font-semibold text-[15px] tracking-tight">
              CreatorAnalytics
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight leading-snug">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-zinc-50 transition-all duration-150 outline-none ${
                  error?.email
                    ? "border-red-400 ring-2 ring-red-100 bg-white focus:border-red-400"
                    : "border-zinc-200 hover:border-zinc-300 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
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
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-zinc-50 transition-all duration-150 outline-none ${
                  error?.password
                    ? "border-red-400 ring-2 ring-red-100 bg-white focus:border-red-400"
                    : "border-zinc-200 hover:border-zinc-300 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
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
              className="w-full mt-1 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 disabled:bg-zinc-200 text-white disabled:text-zinc-400 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-150 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
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

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-100">
            <p className="text-center text-xs text-zinc-400 leading-relaxed">
              Secure login powered by{" "}
              <span className="text-zinc-600 font-medium">CreatorAnalytics</span>
            </p>
          </div>
        </div>

        {/* Below-card fine print */}
        <p className="mt-5 text-center text-xs text-zinc-600 leading-relaxed">
          By signing in, you agree to our{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-zinc-400 transition-colors">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-zinc-400 transition-colors">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}
