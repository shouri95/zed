'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export function Toolbar() {
  return (
    <div className="toolbar">
      <Button variant="ghost" onClick={() => document.execCommand('bold')}>
        B
      </Button>
      <Button variant="ghost" onClick={() => document.execCommand('italic')}>
        I
      </Button>
      <Button variant="ghost" onClick={() => document.execCommand('underline')}>
        U
      </Button>
      <Button variant="ghost" onClick={() => insertScreenplayElement('Action')}>
        Action
      </Button>
      <Button variant="ghost" onClick={() => insertScreenplayElement('Scene Heading')}>
        Scene Heading
      </Button>
      <Button variant="ghost" onClick={() => insertScreenplayElement('Character')}>
        Character
      </Button>
      <Button variant="ghost" onClick={() => insertScreenplayElement('Dialogue')}>
        Dialogue
      </Button>
      <Button variant="ghost" onClick={() => insertScreenplayElement('Transition')}>
        Transition
      </Button>
    </div>
  );
}

const insertScreenplayElement = (type: string) => {
  const editor = document.querySelector('[contenteditable="true"]');
  if (!editor) return;

  const newElement = document.createElement('div');
  newElement.classList.add('screenplay-element');
  newElement.contentEditable = 'true';
  newElement.setAttribute('data-type', type);

  switch (type) {
    case 'Action':
      newElement.classList.add('action');
      newElement.textContent = 'Describe action here...';
      break;
    case 'Scene Heading':
      newElement.classList.add('scene-heading');
      newElement.textContent = 'INT./EXT. LOCATION - DAY/NIGHT';
      break;
    case 'Character':
      newElement.classList.add('character');
      newElement.textContent = 'CHARACTER NAME';
      break;
    case 'Dialogue':
      newElement.classList.add('dialogue');
      newElement.textContent = 'Character Dialogue...';
      break;
    case 'Transition':
      newElement.classList.add('transition');
      newElement.textContent = 'CUT TO:';
      break;
    default:
      break;
  }

  editor.appendChild(newElement);
  newElement.focus();
};

export default Toolbar;
