import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, Users, Book, Calendar, ArrowRight, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16 py-6 border-b border-indigo-700">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Raay</h1>
          <nav className="space-x-4">
            <Button asChild variant="ghost" className="hover:text-indigo-400 transition-colors duration-300">
              <Link href="/sign-in">Log In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="text-center py-32 mb-20">
            <h2 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Craft Your Vision
            </h2>
            <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
              Raay: Where your stories come to life, frame by frame, scene by scene.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <Link href="/sign-up">Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </section>

          {/* Features Grid */}
          <section className="mb-32">
            <h3 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Craft Your Masterpiece</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-xl bg-slate-800/50 border-indigo-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-3 rounded-full">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-indigo-200">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-slate-300">{feature.description}</CardDescription>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-indigo-200">
                          <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="mb-32 bg-gradient-to-r from-indigo-900 to-cyan-900 py-20 rounded-3xl">
            <h3 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Voices of Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-slate-800/50 border-indigo-700 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6">
                    <p className="text-indigo-200 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500" />
                      <div>
                        <p className="font-semibold text-indigo-200">{testimonial.author}</p>
                        <p className="text-sm text-slate-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20 mb-20 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Bring Your Story to Life?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the community of visionary screenwriters and turn your ideas into cinematic reality with Raay.
            </p>
            <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-lg rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <Link href="/sign-up">Start Your Raay Journey</Link>
            </Button>
          </section>
        </main>

        <footer className="text-center text-indigo-300 py-8 border-t border-indigo-700">
          <p>&copy; 2024 Raay. Empowering storytellers worldwide.</p>
        </footer>
      </div>
    </div>
  )
}

const features = [
  {
    icon: PenTool,
    title: "Intuitive Writing",
    description: "Experience the fluidity of thought transformed into screenplay.",
    benefits: [
      "Distraction-free writing environment",
      "Real-time collaborative editing",
      "Customizable interface themes"
    ]
  },
  {
    icon: Users,
    title: "Character Development",
    description: "Breathe life into your characters with our advanced tools.",
    benefits: [
      "Character arc mapping",
      "Relationship dynamics visualizer",
      "Personality trait generator"
    ]
  },
  {
    icon: Book,
    title: "Smart Formatting",
    description: "Focus on your story while we handle the technical details.",
    benefits: [
      "Industry-standard formatting",
      "Automatic scene numbering",
      "Export to multiple file formats"
    ]
  },
  {
    icon: Calendar,
    title: "Project Management",
    description: "Keep your screenplay on track from concept to completion.",
    benefits: [
      "Customizable project timelines",
      "Version control and history",
      "Collaborative note-sharing"
    ]
  }
]

const testimonials = [
  {
    quote: "Raay has transformed my writing process. The intuitive interface and powerful features have elevated my scripts to new heights.",
    author: "Alexandra Chen",
    title: "Award-winning Screenwriter",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "The character development tools in Raay are unparalleled. My stories have never been more dynamic and engaging.",
    author: "Marcus Jefferson",
    title: "Hollywood Filmmaker",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    quote: "From outline to final draft, Raay supports every stage of my writing journey. It's an indispensable tool for any serious screenwriter.",
    author: "Sophia Nakamura",
    title: "TV Series Creator",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
]