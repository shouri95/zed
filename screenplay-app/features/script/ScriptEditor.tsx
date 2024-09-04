// components/ScriptEditor.tsx
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";

const ScriptEditor: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Load saved content or set initial content
    const savedContent = localStorage.getItem('scriptContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    localStorage.setItem('scriptContent', newContent);
  };

  return (
    <div className="h-full w-full bg-white p-8">
      <Textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 text-lg leading-relaxed font-mono"
        placeholder="Start writing your screenplay..."
        style={{
          minHeight: 'calc(100vh - 4rem)',
        }}
      />
    </div>
  );
};

export default ScriptEditor;