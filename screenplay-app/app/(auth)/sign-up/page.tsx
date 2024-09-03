// app/(auth)/sign-up/page.tsx
import React from 'react';
import AuthForm from '@/components/Authform';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <main className="w-full max-w-md px-4">
        <h1 className="text-4xl font-bold mb-2 text-center">Join Raay</h1>
        <p className="text-center text-gray-600 mb-8">Create an account to start your journey</p>
        <AuthForm type="sign-up" />
      </main>
      <footer className="absolute bottom-4 text-center text-gray-600">
        <p>&copy; 2024 Raay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUpPage;