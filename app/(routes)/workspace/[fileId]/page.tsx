'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'

function Workspace() {
  const params = useParams()
  const [triggerSave, setTriggerSave] = useState(false)

  useEffect(() => {
    console.log("FILEID", params.fileId)
  }, [params.fileId])

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* Workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className='h-screen'>
          <Editor 
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
          />
        </div>
        {/* Whiteboard/canvas */}
        <div className='bg-blue-600 h-screen'>
          Canvas
        </div>
      </div>
    </div>
  )
}

export default Workspace