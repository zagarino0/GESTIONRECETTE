import React from 'react'
import { states } from '../../states/states';
import { useSnapshot } from 'valtio';
import { Navbar } from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import Hotel from "../../assets/baobab-17.jpg"
import {IoMdArrowRoundBack} from "react-icons/io"
function Sigrl() {
    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Paramètres", link: "/miseAJourParametre" },
        { title: "Recette", link: "/recette" },
        { title: "Gestion", link: "/Gestion" },
        { title: "Immatriculation", link: "/immatriculation" },
        { title: "Statistique", link: "/Statistique" },
      ];
  
      const content = (
       <div className='flex justify-between'>
           <div className='text-white'>
  Commune Urbairne Mahajanga 
          </div>
          <div>
<Link to="/menu">
<IoMdArrowRoundBack className='text-white text-xl'></IoMdArrowRoundBack>
</Link>
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
        <div className='fle flex-col ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
            Système Informatisé de Gestion des Ressources Locals
            </div>
        <div className=' '>
        {
          
          links.map((link) => (
            <div
              key={link.title}
              className={`
              py-3
              px-6
              mt-4
              hover:bg-[#E96012] 
              text-center
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

export default Sigrl