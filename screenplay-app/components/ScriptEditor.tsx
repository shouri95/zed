// components/ScriptEditor.tsx
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const ScriptEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    // Load saved content or set initial content
    const savedContent = localStorage.getItem('scriptContent');
    if (savedContent) {
      const contentState = ContentState.createFromText(savedContent);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const saveContent = (content: string) => {
    localStorage.setItem('scriptContent', content);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e: React.KeyboardEvent): string | null => {
    if (e.key === 'Tab') {
      const newContentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '    '
      );
      setEditorState(EditorState.push(editorState, newContentState, 'insert-characters'));
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    saveContent(newEditorState.getCurrentContent().getPlainText());
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        onChange={onChange}
        placeholder="Start writing your script..."
        spellCheck={true}
      />
    </div>
  );
};

export default ScriptEditor;