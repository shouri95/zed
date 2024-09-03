// app/project-workspace/[id]/script/page.tsx
'use client';

import React from 'react';
import { WithProjectProtection } from '@/components/WithProjectProtection';
import ScriptEditor from '@/components/ScriptEditor';

function ScriptPage() {
  return (
    <div className="h-full overflow-auto bg-gray-100">
      <ScriptEditor />
    </div>
  );
}

export default WithProjectProtection(ScriptPage);