import React from 'react'
import Layout from './Layout'


function Recette() {
  const contentChildren=(
    <div className='text-white'>
content
    </div>
  ) 
  return (
    <div className='bg-[#212122] flex flex-row h-screen w-screen'>
<Layout children={contentChildren}></Layout>
</div>
  )
}

export default Recette