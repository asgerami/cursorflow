import React from 'react'
import Image from 'next/image'
import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import SideNavTopSection from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavBottomSection from './SideNavBottomSection'


function SideNav() {
  const {user} = useKindeBrowserClient();

 
  return (
    <div
      className=' h-screen fixed w-64 border-r border-[1px] p-6 flex flex-col justify-between'
      >
        <div className='flex-1'><SideNavTopSection user={user}/></div>
       
       <div>
        <SideNavBottomSection/>
       </div>
    </div>
  )
}

export default SideNav
