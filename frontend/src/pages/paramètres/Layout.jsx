import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { states } from '../../states/states';
import { useSnapshot } from 'valtio';


function Layout(props) {
    const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "Mise à jour", link: "/miseAJourParametre" }, 
      { title: "Utilitaires", link: "/utilitaireParametre" },
      { title: "Paramètres", link: "/parametreParametre" },
      { title: "Sauvegarde", link: "/sauvegardeParametre" },
     
    ];
  return (
    <>
    <div className='flex flex-row'>
    <div className='w-[500px] bg-black h-screen '>
    <nav className=" flex flex-col  ">
<div className='flex justify-between m-4'>
<div className='text-5xl text-white '>
                Paramètres
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
          hover:scale-110  hover:bg-[#E96012] hover:shadow-xl transition duration-300 ease-in-out
           ${
             selectedLink === link.title.toLowerCase() 
            
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