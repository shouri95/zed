// components/layout/TopNavBar.tsx
import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TopNavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b fixed top-0 left-0 right-0 h-16 z-50">
      {/* App Name */}
      <Link href="/workspace" passHref>
        <Button variant="link" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
          Raay
        </Button>
      </Link>

      {/* Right-side Navigation */}
      <div className="flex items-center space-x-6">
        <Link href="/workspace" passHref>
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href="/projects" passHref>
          <Button variant="ghost">Projects</Button>
        </Link>

        {/* Other Options */}
        <Button variant="ghost" size="icon">
          <Calendar className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}