import React, { useState } from 'react'

export default function Usd({open2, setOpen2}) {
  const [rate, setRate] = useState(20)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const handleFormSubmit = async(e)=>{
    e.preventDefault()
  const data = {from,to,amount}
    const response = await fetch('http://localhost:5000/api/usd',{
  method:'POST',
  body:JSON.stringify(data),
  headers:{
    'Content-type':'application/json'
  }
    })
    const json = await response.json()
  }

  const handleSubmit = async(e)=>{
    window.open("/paymentslip", "_self");
  }


  return (
    <div className={open2? "popup__overlay-show" : "popup__overlay"}>
        <p onClick={(open2)=>setOpen2(false)}  className='close'>close</p>
    <form onSubmit={handleFormSubmit} className='popup__container'>
        <p className='popup__header'>Sell your Usd</p>

        <div className="exchange__box">
        <div className="exchange__text-wrap">
        <p style={{margin:"1rem"}}>From</p>
        <div className='exchange__form'>
        <select onChange={(e)=> setFrom(e.target.value)}>
            <option>Usd</option>
            <option>Eur</option>
            <option>Naira</option>
            <option>Pound</option>
        </select>
        </div>
        </div>
        <div className="exchange__text-wrap">
        <p style={{margin:"1rem"}}>To</p>
        <div className='exchange__form'>
        <select onChange={(e)=> setTo(e.target.value)}>
            <option>Eur</option>
            <option>Usd</option>
            <option>Naira</option>
            <option>Pound</option>
        </select>
        </div>
        </div>
        </div>
        <p style={{margin:"1rem"}}>Enter Amount</p>
        <div className='exchange__form'>
        <input onChange={(e)=> setAmount(e.target.value)} name='amount' className='amount__input'/>
        <button className='form-btn'>Exchange ({rate})</button>
        </div>
        </form>
    </div>
  )
}
