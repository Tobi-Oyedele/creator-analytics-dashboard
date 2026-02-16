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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600">
            Sign in to access your creator dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200 border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  error?.email
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                } outline-none transition-all placeholder:text-slate-400`}
              />
              {error?.email && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {error.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  error?.password
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                } outline-none transition-all placeholder:text-slate-400`}
              />
              {error?.password && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {error.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
