import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { states } from '../../states/states';
import { useSnapshot } from 'valtio';


function Layout(props) {
    const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "Saisie des déclarations", link: "/immatriculation" },
      { title: "Situation de Recette et pièces comptables ", link: "/consultatioRF" },
      { title: "NIF", link: "/utilitaire" },
      { title: "Utilitaires", link: "/utilitaire" },
      { title: "Consultation", link: "/utilitaire" },
      { title: "Reste à recovré", link: "/utilitaire" },
     
    ];
  return (
    <>
    <div className='flex flex-row'>
    <div className='w-[500px] bg-black h-screen '>
    <nav className=" flex flex-col  ">
<div className='flex justify-between m-4'>
<div className='text-5xl text-white '>
                Recette
            </div>
<div>
<Link to="/SIGRL" >
<IoMdArrowRoundBack className='text-white text-2xl '></IoMdArrowRoundBack>
</Link>
</div>
</div>
    <div>
    <ul className="flex flex-col">
       {links.map((link) => (
         <li
           key={link.title}
           className={`
           mx-4 
           text-center
           py-3
           px-6 
           text-white 
           text-bold 
          bg-[#262222]
          m-2
           ${
             selectedLink === link.title.toLowerCase() 
             && " scale-110  bg-[#E96012] shadow-xl transition duration-300 ease-in-out"
           } `}
         >
           <Link to={link.link}>{link.title}</Link>
         </li>
       ))}
     </ul>
    </div>

       
   </nav>
   <div>
    
   </div>
    </div>
 <div>
    {props.children}
 </div>
    </div>
    </>
  )
}

export default Layout