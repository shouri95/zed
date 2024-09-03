// app/(auth)/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raay - Authentication",
  description: "Sign in or sign up to Raay",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col justify-center items-center bg-white`}>
      <main className="w-full max-w-md px-4">{children}</main>
      <Toaster />
    </div>
  );
}