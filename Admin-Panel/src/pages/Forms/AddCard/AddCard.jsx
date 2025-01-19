import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AddCard() {
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardIssuer, setCardIssuer] = useState('')
  const params = useParams()
  const id = params.id
 
 
const handleFormSubmit = async(e)=>{
  e.preventDefault()
  const data = {cardNumber,cardName,cardIssuer}
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
       
       <form onSubmit={handleFormSubmit}  className='form__container'>
        <label className='form-label'>Card Number</label>
        <input onChange={(e)=> setCardNumber(e.target.value)} className='change__input' name='cardNumber' type='number' placeholder="Enter Card Number"/>
        <label className='form-label'>Card Name</label>
        <input onChange={(e)=> setCardName(e.target.value)} className='change__input' name='cardName' type='text' placeholder="Enter Card Name"/>
        <label className='form-label'>Card Issuer</label>
        <input onChange={(e)=> setCardIssuer(e.target.value)} className='change__input' name='cardIssuer' type='text' placeholder="Enter Card Issuer"/>
        <button className='form-btn'>Submit</button>
       </form>
      </div>  
    </div>
  )
}
