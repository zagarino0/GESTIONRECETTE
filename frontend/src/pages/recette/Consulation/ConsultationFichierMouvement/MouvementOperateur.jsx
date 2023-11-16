import React from 'react'
import Layout from './Layout'
import { useLocation } from 'react-router-dom';

function MouvementOperateur() {
    const location = useLocation(); 
    const contentChildren=(
      <div className='flex justify-center items-center '>
        
        </div>
         ) 
  return (
    <div className='bg-[#212122]  h-screen w-screen'>
    <Layout currentPath={location.pathname} children={contentChildren}></Layout>
    </div>
  )
}

export default MouvementOperateur