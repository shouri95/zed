// components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils/utils";
import {
  Home,
  Book,
  Users,
  Settings,
  PenTool,
  Calendar,
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  currentPath: string;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const projectId = pathname.split('/')[2];

  return (
    <div className="w-16 bg-gray-100 h-full fixed left-0 top-16 transition-all duration-300 hover:w-64 group">
      <nav className="flex flex-col h-full py-4">
        <NavItem href={`/project-workspace/${projectId}`} icon={<Home size={20} />} text="Dashboard" currentPath={pathname} />
        <NavItem href={`/project-workspace/${projectId}/script`} icon={<Book size={20} />} text="Script" currentPath={pathname} />
        <NavItem href={`/project-workspace/${projectId}/characters`} icon={<Users size={20} />} text="Characters" currentPath={pathname} />
        <NavItem href={`/project-workspace/${projectId}/scenes`} icon={<PenTool size={20} />} text="Scenes" currentPath={pathname} />
        <NavItem href={`/project-workspace/${projectId}/timeline`} icon={<Calendar size={20} />} text="Timeline" currentPath={pathname} />
        <NavItem href={`/project-workspace/${projectId}/settings`} icon={<Settings size={20} />} text="Settings" currentPath={pathname} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, currentPath }) => {
  const isActive = currentPath === href;

  return (
    <Link href={href} className={cn(
      "flex items-center py-3 px-4 text-gray-700 hover:bg-gray-200 transition-colors",
      isActive && "bg-gray-200 text-gray-900",
      "overflow-hidden whitespace-nowrap"
    )}>
      <span className="mr-4">{icon}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{text}</span>
    </Link>
  );
};

export default Sidebar;