import React from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../../components/button/BackButton';


function Layout(props) {
   

  //Links navbar
  const links = [
      { title: "Saisie des déclarations", link: "/saisiDeclarationRecette" },
      { title: "Situation de Recette et pièces comptables ", link: "/situationRecette" },
      { title: "RF", link: "/NIFRecette" },
      { title: "Utilitaires", link: "/utilitaireRecette" },
      { title: "Consultation", link: "/consultationRecette" },
      { title: "Reste à recovré", link: "/ResteRecovreRecette" },
     
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
<BackButton to="/SIGRL"></BackButton>
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
         cursor-pointer
          rounded-md hover:bg-[#E96012] hover:shadow-xl "
           `}
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