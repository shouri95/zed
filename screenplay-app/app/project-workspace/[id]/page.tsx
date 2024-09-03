// app/project-workspace/[id]/page.tsx
'use client';

import React from 'react';
import { useProject } from '@/lib/contexts/ProjectContext';
import { WithProjectProtection } from '@/components/WithProjectProtection';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

function ProjectWorkspace() {
  const { currentProject } = useProject();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  if (!currentProject) {
    return <div className="flex justify-center items-center h-screen">Loading project...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">{currentProject.title}</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Project Details</h2>
            <p><strong>Description:</strong> {currentProject.description}</p>
            <p><strong>Progress:</strong> {currentProject.progress}%</p>
            <p><strong>Status:</strong> {currentProject.status}</p>
            <p><strong>Genre:</strong> {currentProject.genre}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default WithProjectProtection(ProjectWorkspace);