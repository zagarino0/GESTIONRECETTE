import React from 'react'

function Label(props) {
  return (
    <label className={` ${props.className} text-white text-xs `}>{props.text}</label>
  )
}

export default Label