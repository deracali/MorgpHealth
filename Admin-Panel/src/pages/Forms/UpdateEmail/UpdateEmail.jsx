import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateEmail() {
  const [email, setEmail] = useState('')
  const params = useParams()
  const id = params.id
 
 
const handleFormSubmit = async(e)=>{
  e.preventDefault()
  const data = {email}
  const response = await fetch('http://localhost:5000/api/users/' + id,{
  method:'PATCH',
  body:JSON.stringify(data),
  headers:{
  'Content-type':'application/json'
}
  })
  const json = await response.json();
}
 
  return (
    <div className='container'>
      <div className="row" style={{width:"330px"}}>
        <div className='top-nav'>
            <p>arrow</p>
            <p>Settings</p>
            <p>+</p>
        </div>
       
       <form onSubmit={handleFormSubmit} className='form__container'>
        <label className='form-label'>Update Email</label>
        <input onChange={(e)=> setEmail(e.target.value)} className='change__input' name='email' type='email' placeholder="Enter New Email"/>
        <button className='form-btn'>Submit</button>
       </form>
      </div>  
    </div>
  )
}

       
