import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../../Store/Store';

export default function Footer() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  
  return (
    <nav style={{position:"relative"}}>
    <ul className='nav-list-container'>
      <li><Link to="/">Overview</Link></li>
      <li>Pages</li>
      <li><Link to="/faq">Faqs</Link></li>
      <li><Link to={`/cards/${userInfo?.email}`}>Cards</Link></li>
      <li><Link to="/settings">Settings</Link></li>
    </ul>
  </nav>
  )
}
