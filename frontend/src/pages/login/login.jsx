import React from 'react'
import Hotel from "../../assets/hoteldeville.jpg"
function LoginPage() {
  return (
    <div className='bg-[#212122] w-screen h-screen text-white flex flex-row '>
<div>
  <img src={Hotel} alt="hotel"  className='w-[500px] h-[560px]'/>
</div>
<div className='flex justify-center items-center '>
<div>Connexion</div>
</div>
    </div>
  )
}

export default LoginPage