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
    <div className="w-64 bg-white shadow-lg h-full fixed left-0 top-16"> {/* Adjust top position */}
      <ScrollArea className="h-[calc(100vh-4rem)]"> {/* Adjust height calculation */}
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