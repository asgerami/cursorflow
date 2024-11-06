import React from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'

function Workspace() {
  return (
    <div>
      <WorkspaceHeader/>

      {/* Workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className='bg-red-700 h-screen'>
          Document
        </div>
        {/* Whiteboard/canvas */}
        <div className='bg-blue-700 h-screen'>
Canvas
        </div>
      </div>
    </div>
  )
}

export default Workspace
