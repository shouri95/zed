// components/layout/Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  Book,
  Users,
  Settings,
  PenTool,
  Calendar,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const projectId = pathname.split('/')[2];

  const sidebarClasses = cn(
    'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'lg:translate-x-0 lg:static lg:flex lg:flex-col'
  );

  return (
    <div className={sidebarClasses}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Project Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="space-y-2 p-4">
          <NavItem href={`/project-workspace/${projectId}`} icon={<Home />} text="Dashboard" currentPath={pathname} />
          <NavItem href={`/project-workspace/${projectId}/script`} icon={<Book />} text="Script" currentPath={pathname} />
          <NavItem href={`/project-workspace/${projectId}/characters`} icon={<Users />} text="Characters" currentPath={pathname} />
          <NavItem href={`/project-workspace/${projectId}/scenes`} icon={<PenTool />} text="Scenes" currentPath={pathname} />
          <NavItem href={`/project-workspace/${projectId}/timeline`} icon={<Calendar />} text="Timeline" currentPath={pathname} />
          <NavItem href={`/project-workspace/${projectId}/settings`} icon={<Settings />} text="Settings" currentPath={pathname} />
        </nav>
      </ScrollArea>
    </div>
  );
};

// Helper component for individual navigation items
const NavItem: React.FC<NavItemProps> = ({ href, icon, text, currentPath }) => {
  const isActive = currentPath === href;

  return (
    <Link href={href} passHref>
      <Button variant={isActive ? 'secondary' : 'ghost'} className="w-full justify-start">
        {icon}
        <span className="ml-2">{text}</span>
      </Button>
    </Link>
  );
};

export default Sidebar;
