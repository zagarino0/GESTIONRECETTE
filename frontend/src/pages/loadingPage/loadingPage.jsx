import React, { useEffect } from 'react'
import Loader from '../../components/loading/loading'
import LogoBianco from "../../assets/logo-bianco-transparent 1.png"
import LogoMahajanga from "../../assets/logomahajanga 1.png"
function LoadingPage() {
  useEffect(() => {
    setTimeout(() => {
    window.location.href = "/menu"
    }, 5000);
    
  }, []);
  return (
    <div className='bg-[#212122] w-screen h-screen flex flex-col '>

        <div className='flex justify-between ml-20 mr-20 mt-10'>
          <img src={LogoMahajanga} alt="mahajanga logo" />
          <img src={LogoBianco} alt="bianco logo" />
        </div>
        <div className='text-white  text-5xl ml-80 mt-10'>
          Bienvenu sur SIGRL
        </div>
        <div className='mt-10'>
        <Loader></Loader>
        </div>
    </div>
  )
}

export default LoadingPage