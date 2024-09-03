// app/project/[id]/script/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { WithProjectProtection } from '@/components/WithProjectProtection';
import { useProject } from '@/lib/contexts/ProjectContext';
import { useParams } from 'next/navigation';
import { FullScreenplayView } from '@/features/screenplay/full-screenplay-view';
import { Editor, EditorState } from 'draft-js'; // Correct imports
import 'draft-js/dist/Draft.css';

function ScriptPage() {
  const { id } = useParams();
  const { currentProject } = useProject();

  // Initialize editor state correctly using EditorState.createEmpty()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    // Fetch scenes for the current project or initialize state
  }, [id]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Script for {currentProject?.title}</h1>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write your screenplay..."
        />
      </div>
    </div>
  );
}

export default WithProjectProtection(ScriptPage);
