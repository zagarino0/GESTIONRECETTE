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
    <div className='bg-[#212122] w-screen h-screen flex items-center justify-center'>
      <div className=' flex flex-col '>

<div className='flex justify-between w-[1000px] '>
  <img src={LogoMahajanga} alt="mahajanga logo" />
  <img src={LogoBianco} alt="bianco logo" />
</div>
<div className='text-white  text-5xl flex items-center justify-center mt-10'>
  Bienvenu sur SIGRL
</div>
<div className='mt-10 flex justify-center'>
<Loader></Loader>
</div>
</div>
    </div>
  )
}

export default LoadingPage