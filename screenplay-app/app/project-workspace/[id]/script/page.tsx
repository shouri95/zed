'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTheme } from 'next-themes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { Toolbar } from '@/components/ui/toolbar';
import { WithProjectProtection } from '@/features/project/WithProjectProtection';
import { useProject } from '@/lib/contexts/ProjectContext';
import { useToast } from "@/components/ui/use-toast";
import { Scene } from '@/lib/types/types';
import { Moon, Sun, Save, FileDown, Undo, Redo } from 'lucide-react';

const ScriptPage: React.FC = () => {
  const { id } = useParams();
  const { currentProject } = useProject();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [content, setContent] = useState('');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Load saved content or set initial content
    const savedContent = localStorage.getItem(`scriptContent-${id}`);
    if (savedContent) {
      setContent(savedContent);
      updateWordCount(savedContent);
    }
  }, [id]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    localStorage.setItem(`scriptContent-${id}`, newContent);
    updateWordCount(newContent);
  };

  const updateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word !== '').length;
    setWordCount(words);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the content
    toast({
      title: "Script saved",
      description: "Your script has been saved successfully.",
    });
  };

  const handleExport = () => {
    // Here you would implement the export functionality
    toast({
      title: "Export initiated",
      description: "Your script is being prepared for export.",
    });
  };

  // Hotkeys for quick formatting
  useHotkeys('ctrl+b', () => insertScreenplayElement('Scene Heading'));
  useHotkeys('ctrl+c', () => insertScreenplayElement('Character'));
  useHotkeys('ctrl+d', () => insertScreenplayElement('Dialogue'));
  useHotkeys('ctrl+a', () => insertScreenplayElement('Action'));
  useHotkeys('ctrl+t', () => insertScreenplayElement('Transition'));

  const insertScreenplayElement = useCallback((type: string) => {
    let newElement = '';
    switch (type) {
      case 'Scene Heading':
        newElement = '\nINT./EXT. LOCATION - DAY/NIGHT\n\n';
        break;
      case 'Character':
        newElement = '\nCHARACTER NAME\n\n';
        break;
      case 'Dialogue':
        newElement = '\nDialogue goes here...\n\n';
        break;
      case 'Action':
        newElement = '\nAction description...\n\n';
        break;
      case 'Transition':
        newElement = '\nCUT TO:\n\n';
        break;
      default:
        break;
    }
    setContent(prevContent => prevContent + newElement);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Card className="m-4">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{currentProject?.title} - Script</h1>
            <div className="flex space-x-2">
              <Toggle
                aria-label="Toggle dark mode"
                pressed={theme === 'dark'}
                onPressedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Toggle>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button onClick={toggleFullscreen}>
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
            </div>
          </div>
          <Tabs defaultValue="write">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="outline">Outline</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Toolbar />
              <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border">
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 text-lg leading-relaxed font-mono p-4"
                  placeholder="Start writing your screenplay..."
                  style={{
                    minHeight: 'calc(100vh - 300px)',
                  }}
                />
              </ScrollArea>
              <div className="mt-4 text-sm text-gray-500">
                Word count: {wordCount}
              </div>
            </TabsContent>
            <TabsContent value="outline">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Scene Outline</h2>
                {/* Implement scene outline component here */}
              </div>
            </TabsContent>
            <TabsContent value="analyze">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Script Analysis</h2>
                {/* Implement script analysis component here */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithProjectProtection(ScriptPage);