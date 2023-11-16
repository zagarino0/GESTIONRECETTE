import React from 'react'
import Layout from './Layout'
import { useLocation } from 'react-router-dom';
import Table from '../../../../components/table/Table';
import { Title3 } from '../../../../components/title/title';

function MouvementRecette() {
    const location = useLocation(); 
         // header Table components 
   const headers = [  "Periode2","MNT_AP","TOT_VER", "RESTE_AP" , "N_QUIT", "NQUIT1", "NUM_REC", "MOD_RGL", "DTE_RGL", "PAIE"];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none', 'none', 'none'],
  
 ];
    const contentChildren=(
      <div className='flex justify-center items-center '>
      <div className='flex justify-center m-4'>
        <div className='flex flex-row '>
        <Title3 text="Rechech"></Title3>
        </div>
    <div className='flex justify-center mt-4 '>
    <Table headers={headers} data={data} classTable="overflow-y-auto h-40" ></Table>
    </div>
    </div>    
        </div>
         ) 
  return (
    <div className='bg-[#212122] flex  h-screen w-screen'>
    <Layout currentPath={location.pathname} children={contentChildren}></Layout>   
    </div>
  )
}

export default MouvementRecette