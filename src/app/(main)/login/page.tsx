"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DiChrome } from "react-icons/di";
import { BsGithub } from "react-icons/bs";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const userData = Object.fromEntries(formData.entries()) as RegisterFormData
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    // console.log(userData)

    const { data, error } = await authClient.signIn.email({
      ...userData
    })
    if (data) return redirect('/')
    if (error) return alert(error?.message)
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-center bg-linear-to-br from-cyan-500 via-blue-600 to-indigo-700 p-14 text-white lg:flex">
          <span className="text-sm font-semibold uppercase tracking-widest">TechStack Pro</span>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Welcome Back.
            <br />
            Continue Building.
          </h1>

          <p className="mt-6 max-w-md text-lg text-white/80">
            Sign in to access your dashboard, projects and developer tools.
          </p>

          <div className="relative mt-14 h-87.5">
            <Image
              fill
              priority
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="Dashboard"
              className="rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold">Welcome Back 👋</h2>
              <p className="mt-3 text-gray-500">Login to your account.</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 transition hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                <DiChrome size={18} />
                Google
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 transition hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                <BsGithub size={18} />
                Github
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium">Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-950"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>

                <Link href="/forgot-password" className="text-sm font-medium text-cyan-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600">
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?
              <Link href="/register" className="ml-1 font-semibold text-cyan-500">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}