import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import Hotel from "../../assets/hoteldeville.jpg"
import { states } from '../../states/states';
import { useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
function MenuPage() {
  const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "SIGRL", link: "/SIGRL" },
      { title: "Impot e-immatriculation", link: "/e-immatriculation" },
      { title: "immatriculation", link: "/immatriculation" },
      { title: "Statistique", link: "/Statistique" },
    ];

    const content = (
<div className='flex justify-between'>
<div className='text-white'>
Commune Urbairne Mahajanga 
        </div>
        <div className='text-white cursor-pointer'>
          Déconnexion
        </div>
</div>
    )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
        <Navbar content={content}></Navbar>
     <div className='flex flex-row'>
     <div>
            <img src={Hotel} alt="hotel de ville" className='w-[500px] h-[540px] bg-cover' />
        </div>
        <div className='ml-12 mt-28'>
        <div className=' w-96 '>
      {
        
        links.map((link) => (
          <div
            key={link.title}
            className={`
            py-3
            px-6
            mt-4
            text-center
            hover:bg-[#E96012] 
            bg-[#B85015]  
            text-white 
            text-bold 
            hover:scale-110
            hover:shadow-xl 
            transition 
            duration-300 
            ease-in-out
            
            ${
              selectedLink === link.title.toLowerCase() 
              
            } `}
          >
            <Link to={link.link}>{link.title}</Link>
          </div>
        ))
        }
      
        </div>
        </div>
     </div>
    </div>
  )
}

export default MenuPage