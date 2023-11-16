import React from 'react'

export function Title1(props) {
  return (
    <label className={` ${props.className} text-white text-sm `}>{props.text}</label>
  )
}




 export function Title2(props) {
  return (
    <label className={` ${props.className} text-white text-base `}>{props.text}</label>
  )
}



export function Title3(props) {
  return (
    <label className={` ${props.className} text-white text-lg `}>{props.text}</label>
  )
}


export function Title4(props) {
  return (
    <label className={` ${props.className} text-white text-xl `}>{props.text}</label>
  )
}

export function Title5(props){
  return (
    <label className={` ${props.className} text-white text-2xl `}>{props.text}</label>
  )
}





