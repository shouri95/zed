import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, Users, Book, Calendar } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212121] to-[#3498db] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold">Screenplay App</h1>
          <Button asChild variant="ghost" className="text-white hover:text-[#e74c3c]">
            <Link href="/sign-in">Log In</Link>
          </Button>
        </header>

        <main>
          <section className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Unleash Your Screenwriting Potential</h2>
            <p className="text-xl text-gray-300 mb-8">Craft captivating stories with our powerful screenwriting tool</p>
            <Button asChild size="lg" className="bg-[#e74c3c] hover:bg-[#c0392b] text-white">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-2 text-[#e74c3c]" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="bg-[#212121] rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <blockquote key={index} className="italic text-gray-300">
                  "{testimonial.quote}"
                  <footer className="text-[#e74c3c] mt-2">- {testimonial.author}</footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="text-center bg-[#e74c3c] rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Screenwriting Journey?</h2>
            <Button asChild size="lg" className="bg-white text-[#e74c3c] hover:bg-gray-100">
              <Link href="/sign-up">Get Started Now</Link>
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-300">
          &copy; 2024 Screenplay App. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

const features = [
  {
    icon: PenTool,
    title: "Intuitive Writing",
    description: "Distraction-free environment for focused writing sessions."
  },
  {
    icon: Users,
    title: "Character Development",
    description: "Create and manage complex characters with ease."
  },
  {
    icon: Book,
    title: "Script Formatting",
    description: "Automatic industry-standard formatting as you write."
  },
  {
    icon: Calendar,
    title: "Project Management",
    description: "Keep track of your projects, deadlines, and revisions."
  }
]

const testimonials = [
  {
    quote: "This app has revolutionized my writing process. I can't imagine working without it now!",
    author: "Sarah J., Screenwriter"
  },
  {
    quote: "The character development tools are a game-changer. My stories have never been more dynamic.",
    author: "Michael R., Filmmaker"
  },
  {
    quote: "From outline to final draft, this app supports every stage of my writing journey.",
    author: "Emma L., TV Writer"
  }
]