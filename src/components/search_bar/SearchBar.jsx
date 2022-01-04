import React from 'react'
import './SearchBar.css'

import { Search_Page_URL } from '../../utils/PageUrl';

import { useHistory } from 'react-router-dom'


export default function SearchBar(props) {
  
  const icon_search = require('../../assets/icon_search.png').default
  const history = useHistory()
  
  const navigateTo = (path, params) => {
    return () => {
      history.push(path, params)
    }
  }

  return (
    <div className='search_bar' onClick={ navigateTo(Search_Page_URL, {})}>
      <img src={ icon_search } className='icon_search' alt="" />
      <div className='placeholder'>请输入内容查找</div>
    </div>
  )
}
