import React from 'react'
import { states } from '../../states/states';
import { useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
import Hotel from "../../assets/baobab-17.jpg";
function Sigrl() {
    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Paramètres", link: "/LoginParametre" },
        { title: "Recette", link: "/LoginRecette" },
        { title: "Gestion", link: "/LoginGestion" },
        { title: "Immatriculation", link: "/LoginImmatriculation" },
        { title: "Ordre de Virement", link: "/LoginOrdreVirment" },
      ];
  
        return (
      <div className=' h-screen w-screen flex items-center justify-center  fixed inset-0 bg-neutral-700  transition-opacity'>
          
    <div >
   
    <div className='flex flex-row bg-[#212122] rounded-lg '>
       <div className='relative overflow-hidden bg-no-repeat bg-cover  '>
              <img src={Hotel} alt="hotel de ville" className='w-[700px] h-[600px] rounded-x-lg   hover:scale-110 transition duration-300 ease-in-out bg-cover' />
          </div>
        <div className='fle flex-col  pl-8 pr-8'>
            <div className='w-96  text-white text-3xl mt-8'>
            Système Informatisé de Gestion des Ressources Locales
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
              font-semibold 
              rounded-md
              cursor-pointer
              ${
                selectedLink === link.title.toLowerCase() 
                
              } `}
            >
              <Link to={link.link}>{link.title}</Link>
            </div>
          ))
          }
        
          </div>
          <div>
          <div className='flex flex-row mt-4 '>
         <p className='text-white text-center '>Retourner à la page</p>
          <Link to="/menu" className='ml-2 text-red-500 hover:text-blue-500'>Acceuil</Link>
        </div>
          </div>
        </div>
       </div>
    </div>
    </div>
    
)
}

export default Sigrl