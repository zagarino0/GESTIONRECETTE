import React from 'react'

function Label(props) {
  return (
    <label className={` ${props.className} text-white text-xl `}>{props.text}</label>
  )
}

export default Label