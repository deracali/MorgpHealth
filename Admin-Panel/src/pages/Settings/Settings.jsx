import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../../Store/Store';

export default function Settings() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;


 const signoutHandler = () =>{
    ctxDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
  }

  return (
    <div className='container'>
      <div className="row" style={{width:"330px"}}>
        <div className='top-nav'>
            <p>arrow</p>
            <p>Settings</p>
            <p>+</p>
        </div>
       <div className="Setting__container">
        <div className="profile__settings">
            <p className='theme-text'>Theme</p>
            <div className="theme__container">
                <div className="theme__text-wrap">
                    <p>Dark Mode</p>
                    <p>button</p>
                </div>
            </div>

            <p className='profile-text'>Profile Settings</p>
            <div className="profile__edit">
                <div className="profile__text-wrap">
                <p style={{marginBottom:"1rem"}}>Change Username</p>
                <p><Link to={`/change@username/${userInfo?.email}`}>arrow</Link></p>
                </div>
                <div className="profile__text-wrap">
                <p style={{marginBottom:"1rem"}}>Update E-mail</p>
                <p><Link to={`/change@email/${userInfo?.email}`}>arrow</Link></p>
                </div>
            </div>

            <p className='profile-text'>Security</p>
            <div style={{marginBottom:"3rem"}} className="profile__edit">
                <div className="profile__text-wrap">
                <p style={{marginBottom:"1rem"}}>Update Password</p>
                <p><Link to="/change@password">arrow</Link></p>
                </div>
                <div className="profile__text-wrap">
                <p onClick={signoutHandler} style={{marginBottom:"1rem"}}>Logout all devices</p>
                </div>
            </div>
        </div>
       </div>
      </div>
    
    </div>
  )
}
