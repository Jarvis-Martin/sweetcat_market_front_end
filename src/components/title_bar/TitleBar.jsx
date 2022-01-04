import React from 'react'
import './titlebar.css'

export default function TitleBar(props) {
  return (
    <div className='title_bar'>
      <div className="left">{ props.left }</div>
      <div className="center">
        {props.title}
      </div>

      <div className="right">{ props.right }</div>
    </div>
  )
}
