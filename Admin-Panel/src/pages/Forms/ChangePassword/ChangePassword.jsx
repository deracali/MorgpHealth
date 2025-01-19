import React from 'react'

export default function ChangePassword() {
  return (
    <div className='container'>
      <div className="row" style={{width:"330px"}}>
        <div className='top-nav'>
            <p>arrow</p>
            <p>Settings</p>
            <p>+</p>
        </div>
       
       <form className='form__container'>
        <label className='form-label'>Change Password</label>
        <input className='change__input' name='password' type='password' placeholder="Enter New Password"/>
        <button className='form-btn'>Submit</button>
       </form>
      </div>  
    </div>
  )
}
