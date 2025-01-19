import React, { useContext, useEffect, useState } from 'react'
import Axios  from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import {toast} from 'react-toastify'
import { Store } from '../../../Store/Store'
import { getError } from '../../../util/Util'
// import { Helmet } from 'react-helmet-async'

export default function Signup() {
  const navigate = useNavigate();
  const {search} = useLocation()
   const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const redirectUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectUrl ? redirectUrl : '/'
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError] = useState('')
  const [Passerror,setPassError] = useState('')
  const [passOpen, setPassOpen] = useState(false) 
  const [ConpassOpen, setConPassOpen] = useState(false) 



  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {username,email,password}
    if (password !== confirmPassword) {
      setPassError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/users/signup',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
        'Content-type':'application/json'
      }
        })
        const json = await response.json()
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      setError('Email already exist');
    }
   
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  
  return (
    <div className='container'>
    <div className="row" style={{width:"330px", marginTop:"2rem"}}>
    <form onSubmit={submitHandler} className='form__container'>
        <h2 className='tradeproLogo'>TradePro</h2>
        <label style={{marginLeft: "-3rem"}} className='form-label'>Create your Account</label>
        <input  onChange={(e)=> setUsername(e.target.value)} className='change__input' name='name' type='text' placeholder="Username"/>
        <input  onChange={(e)=> setEmail(e.target.value)} className='change__input' name='email' type='email' placeholder="Email"/>
        <input onChange={(e)=> setPassword(e.target.value)} className='change__input' name='password' type='password' placeholder="Password"/>
        <input onChange={(e)=> setConfirmPassword(e.target.value)} className='change__input' name='Confirmpassword' type='password' placeholder="Confirm Password"/>
        <button className='form-btn'>Sign Up</button>
        <p>{Passerror}</p>
       </form>

       <div className="oauth__container">
        <p>Or Sign in with</p>
        <div className="social__media-container">
            <div className="social__box"></div>
            <div className="social__box"></div>
            <div className="social__box"></div>
        </div>
       </div>
    </div>
</div>
  )
}
