import React, { useState } from 'react'
import Layout from '../Layout';
import { LinkButton } from '../../../components/button/LinkButton';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import Situation from './Situation';

function Edition() {
  const [isModal , setIsModal] = useState(false);
  const location = useLocation(); 
  const contentChildren=(
 <div className='flex justify-center items-center '>
  <div className='flex flex-col'>
  <div className='text-white text-3xl text-center m-2'>
    Edition
  </div>
 <div className='flex flex-col  '>
  <Button  children="Situation" onClick={()=> setIsModal(true)} className="mt-4" ></Button>
  <LinkButton to="/EtatDétaille" text="Etat détaillé"  className="mt-2"></LinkButton>  
  </div> 
  </div>   
   </div>
    ) 
return (
  <div className='bg-[#212122] flex flex-row h-screen w-screen'>
<Layout currentPath={location.pathname} children={contentChildren}></Layout>
<Situation isOpen={isModal} onClose={()=>setIsModal(false)} quitter={()=>setIsModal(false)} className="w-[500px] h-[500px]"></Situation>
</div>
)
}

export default Edition