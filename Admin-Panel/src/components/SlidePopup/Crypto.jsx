import React, { useContext, useState } from 'react'
import { Store } from '../../../Store/Store';

export default function Crypto({open1, setOpen1}) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [rate, setRate] = useState(20)
  const [cryptoName, setCryptoName] = useState('')
  const [amount, setAmount] = useState('')
  const [userId, setUserId] = useState(userInfo?.email)
  const [SellImg,setSellImg] = useState('')
  const [file,setfile] = useState('')

  function previewFiles(file){
    const reader = new FileReader()
  reader.readAsDataURL(file)
  
  reader.onloadend = ()=>{
    setSellImg(reader.result)
  }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
   setfile(file)
   previewFiles(file)
   }

  const handleFormSubmit = async(e)=>{
    e.preventDefault()
  const data = {cryptoName,amount, userId}
    const response = await fetch('http://localhost:5000/api/history',{
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
    <div className={open1? "popup__overlay-show" : "popup__overlay"}>
        <p onClick={(open1)=>setOpen1(false)}  className='close'>close</p>
    <form onSubmit={handleFormSubmit} className='popup__container'>
        <p className='popup__header'>Sell your Crypto</p>

        <div className="exchange__box">
        <div className="exchange__text-wrap">
        <p style={{margin:"1rem"}}>From</p>
        <div className='exchange__form'>
        <select onChange={(e)=> setCryptoName(e.target.value)}>
            <option>Btc</option>
            <option>Eth</option>
            <option>Ltc</option>
            <option>Usdt</option>
        </select>
        </div>
        </div>
        </div>
        <div style={{marginTop:"1rem"}}>
        <input type='file' id='fileInput' onChange={e => handleChange(e)} accept="image/png, image/jpeg, image/jpg, image/jfif"/>
        <img src={SellImg? SellImg : ""} style={{width:"50px"}}/>
        </div>

        <p style={{margin:"1rem"}}>Wallet Address</p>
        <p style={{margin:"1rem"}}>JVSKNKEWOMMALN1283NKDOSNJ</p>
        
        <p style={{margin:"0.3rem"}}>Enter Amount</p>
        <div className='exchange__form'>
        <input onChange={(e)=> setAmount(e.target.value)} name='amount' className='amount__input'/>
        <button className='form-btn'>Exchange ({rate})</button>
        </div>
       
        </form>
    </div>
  )
}
