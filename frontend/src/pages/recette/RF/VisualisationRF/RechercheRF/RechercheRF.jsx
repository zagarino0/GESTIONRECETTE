import React from 'react'
import { Layout } from '../Layout';
import Label from '../../../../../components/title/label';
import { useLocation } from 'react-router-dom';

function RechercheRF() {
    const location = useLocation(); 
    const contentChildren=(
      <div className='flex justify-center items-center '>
       <Label text="Recherche RF"></Label>    
        </div>
         ) 
     return (
       <div className='bg-[#212122]  h-screen w-screen'>
   <Layout currentPath={location.pathname} children={contentChildren}></Layout>
   </div>
     )
  }
  

export default RechercheRF