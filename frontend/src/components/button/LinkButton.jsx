import { Link } from "react-router-dom";

export const LinkButton = ( props) => {
      return (
        <Link to={props.to !== undefined ? props.to : ''}>
      <div  
      className={` 
      py-3
      px-6 
      rounded-md
      font-semibold
      bg-[#B85015]  
      text-center
      text-white 
      text-bold 
      hover:bg-[#E96012] 
    
      ${props.className}
      `}>
        {props.text}
      </div>
        </Link>
      )
    }