'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const baseSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signInSchema = baseSchema;

const signUpSchema = baseSchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

type FormData = z.infer<typeof signUpSchema>;

const AuthForm: React.FC<{ type: 'sign-in' | 'sign-up' }> = ({ type }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(type === 'sign-in' ? signInSchema : signUpSchema),
    defaultValues: { email: "", password: "", firstName: "", lastName: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Here you would typically call your authentication API
      console.log('Form data:', data);
      
      if (type === 'sign-up') {
        // Simulating sign up
        toast({
          title: "Account created successfully",
          description: "Welcome to Raay! Please sign in with your new account.",
        });
        router.push('/sign-in');
      } else {
        // Simulating sign in
        toast({
          title: "Signed in successfully",
          description: "Welcome back to Raay!",
        });
        router.push('/workspace');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = type === 'sign-in'
    ? ['email', 'password']
    : ['firstName', 'lastName', 'email', 'password'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{type === 'sign-in' ? 'Welcome back' : 'Create an account'}</h1>
        <p className="text-gray-600 mt-2">{type === 'sign-in' ? 'Sign in to continue' : 'Sign up to get started'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof FormData}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{name.replace(/([A-Z])/g, ' $1').trim()}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={name === 'password' ? 'password' : 'text'}
                      placeholder={`Enter your ${name.replace(/([A-Z])/g, ' $1').trim()}`}
                      autoComplete={
                        name === 'password' ? 'new-password' :
                        name === 'email' ? 'email' :
                        'off'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:scale-105">
            {isLoading ? 'Processing...' : (type === 'sign-in' ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-gray-600">
          {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
        </span>
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="text-blue-600 hover:underline ml-1">
          {type === 'sign-in' ? 'Sign up' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;