// app/page.tsx
import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900">
      <main className="text-center">
        <h1 className="text-6xl font-bold mb-6">Raay</h1>
        <p className="text-xl mb-12 max-w-2xl">
          Craft your vision, frame by frame. The ultimate screenplay writing experience.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300">
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full hover:bg-gray-100 transition-all duration-300">
            <Link href="/projects">Explore Projects <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </main>
      <footer className="absolute bottom-0 w-full text-center py-4">
        <p>&copy; 2024 Raay. All rights reserved.</p>
      </footer>
    </div>
  )
}