import React from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import SideNavTopSection from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'


function SideNav() {
  const {user} = useKindeBrowserClient();
  return (
    <div
      className='bg-gray-100 h-screen fixed w-64 border-r p-6'
      >
       <SideNavTopSection user={user}/>
    </div>
  )
}

export default SideNav
