import React from 'react';
import Image from 'next/image';
import AuthForm from '@/components/Authform';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center mb-8">
            <Image src="/icons/logo.svg" alt="Raay Logo" width={40} height={40} />
            <h2 className="ml-3 text-3xl font-bold text-gray-900">Raay</h2>
          </div>
          <AuthForm type="sign-up" />
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/auth-background.jpg"
          alt="Authentication background"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default SignUpPage;