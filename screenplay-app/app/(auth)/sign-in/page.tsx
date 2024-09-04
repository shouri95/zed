// app/(auth)/sign-in/page.tsx
import React from 'react';
import AuthForm from '@/features/auth/Authform';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <main className="w-full max-w-md px-4">
        <h1 className="text-4xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">Sign in to continue your journey</p>
        <AuthForm type="sign-in" />
      </main>
      <footer className="absolute bottom-4 text-center text-gray-600">
        <p>&copy; 2024 Raay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignInPage;