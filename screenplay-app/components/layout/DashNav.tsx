// components/DashNav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Lightbulb, X } from 'lucide-react';
import { cn } from "@/lib/utils/utils";

const DashNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="dash-nav fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-40 flex flex-col">
      <div className="flex justify-between items-center p-6">
        <Link href="/" className="text-2xl font-bold">Raay</Link>
        <button className="lg:hidden" aria-label="Close">
          <X className="h-6 w-6" />
        </button>
      </div>

      <ul className="flex-grow mt-6">
        <NavItem href="/workspace" icon={<Home />} text="Home" currentPath={pathname} />
        <NavItem href="/projects" icon={<FolderOpen />} text="Projects" currentPath={pathname} />
        <NavItem href="/idea-hub" icon={<Lightbulb />} text="Idea Hub" currentPath={pathname} />
      </ul>

      <div className="p-4">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          New Project
        </button>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  currentPath: string | null;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, currentPath }) => {
  const isActive = currentPath === href;

  return (
    <li>
      <Link href={href} className={cn(
        "flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
        isActive && "bg-gray-100 font-semibold"
      )}>
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default DashNav;