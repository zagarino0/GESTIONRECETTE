import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

function BackButton(props) {
  return (
    <div onClick={props.onClick}>
<Link to={props.to !== undefined ? props.to : ''} >
<IoMdArrowRoundBack className={`
text-white text-2xl  
      hover:scale-110
      hover:shadow-xl 
      transition 
      duration-300 
      ease-in-out  ${props.className}`}></IoMdArrowRoundBack>
</Link>
    </div>
  )
}

export default BackButton