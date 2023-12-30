import React from 'react'
import Hotel from "../../assets/hoteldeville.jpg"
import { states } from '../../states/states';
import { useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
function MenuPage() {
  const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "SIGRL", link: "/SIGRL" },
      { title: " E-immatriculation", link: "#" },
      
    ];

  
    return (
      <div className=' h-screen w-screen flex items-center justify-center  fixed inset-0 bg-neutral-700  transition-opacity'>
          
    <div >
   
    <div className='flex flex-row bg-[#212122] rounded-lg '>
       <div className='relative overflow-hidden bg-no-repeat bg-cover  '>
              <img src={Hotel} alt="hotel de ville" className='w-[700px] h-[600px] rounded-x-lg   hover:scale-110 transition duration-300 ease-in-out bg-cover' />
          </div>
        <div className='fle flex-col  pl-8 pr-8'>
            <div className='w-96  text-white text-3xl mt-36'>
            Commune Urbaine Mahajanga 
            </div>
        <div className='mt-16'>
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
        
          </div>
        </div>
       </div>
    </div>
    </div>
    
)
}


export default MenuPage