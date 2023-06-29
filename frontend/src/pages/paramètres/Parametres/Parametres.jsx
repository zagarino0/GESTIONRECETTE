import React from 'react'
import Layout from '../Layout'

function Parametres() {
  const contentChildren=(
    <div className='text-white'>
    Parametres   
      </div>
       ) 
return (
<div className='bg-[#212122] flex flex-row h-screen w-screen'>
<Layout children={contentChildren}></Layout>
</div>
)
}

export default Parametres