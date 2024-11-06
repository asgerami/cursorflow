import React from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'

function Workspace() {
  return (
    <div>
      <WorkspaceHeader/>

      {/* Workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className=' h-screen'>
         <Editor/>
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
