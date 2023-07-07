import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'

function UtilitaireParametre() {
  const contentChildren=(
    <div className='flex justify-center items-center lg:w-screen lg:h-screen'>

   <div className='flex flex-col ml-28 h-screen  '>
   <div className='text-white text-3xl text-center mt-4'>
     Utilitaires
    </div>
    <LinkButton to="/changementMotdePasse" text="Changement de mot de passe personel" className="mt-4" ></LinkButton>
    <LinkButton to="/" text="Operateurs"  className="mt-2"></LinkButton>
  
    </div>    
     </div>
       ) 
  return (
  
   <div className='bg-[#212122] flex flex-row h-screen w-screen'>
<Layout children={contentChildren}></Layout>
</div>
  )
}

export default UtilitaireParametre