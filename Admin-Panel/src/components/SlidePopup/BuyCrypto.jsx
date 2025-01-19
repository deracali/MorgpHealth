import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../../Store/Store';
import axios from 'axios';

export default function BuyCrypto({open3, setOpen3}) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [userId, setUserId] = useState(userInfo?.email)
  const [rate, setRate] = useState(0)
  const [wallet, setWallet] = useState('')
  const [amount, setAmount] = useState(1)
  const [cryptoName, setCryptoName] = useState('BTC')
  const [rates, setRates] = useState([])
  const navigate = useNavigate();
  const [BuyImg,setBuyImg] = useState('')
  const [file,setfile] = useState('')

  function previewFiles(file){
    const reader = new FileReader()
  reader.readAsDataURL(file)
  
  reader.onloadend = ()=>{
    setBuyImg(reader.result)
  }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
   setfile(file)
   previewFiles(file)
   }
  
  const handleFormSubmit = async(e)=>{
    e.preventDefault()
  const data = {cryptoName,amount, userId, wallet}
    const response = await fetch('http://localhost:5000/api/history',{
  method:'POST',
  body:JSON.stringify(data),
  headers:{
    'Content-type':'application/json'
  }
    })
    // navigate('/paymentslip');
    const json = await response.json()
  }

  const handleSubmit = async(e)=>{
    window.open("/paymentslip", "_self");
  }

  useEffect(()=>{
    axios.get('http://localhost:5000/api/btcrate')
    .then(res => {
      setRates(res.data[0].rates)
    })
  }, [])
  console.log(rates)

  function handleAmountChange(amount){
     setRate(amount * rates[cryptoName])
     setAmount(amount.target.value)
  }
  
  function handleCryptoChange(cryptoName){
     setRate(amount * rates[cryptoName])
     setCryptoName(cryptoName.target.value)
  }
  

  return (
    <div className={open3? "popup__overlay-show" : "popup__overlay"}>
        <p onClick={(open3)=>setOpen3(false)}  className='close'>close</p>
        <form onSubmit={handleFormSubmit} className='popup__container'>
        <p className='popup__header'>Buy your Crypto</p>

        <div className="exchange__box">
        <div className="exchange__text-wrap">
        <p style={{margin:"1rem"}}>From</p>
        <div className='exchange__form'>
        <select onChange={(e)=> handleCryptoChange(e)} value={rates}>
          {Object.keys(rates).map((currency => (
            <option key={currency.rates} value={rates}>{currency}</option>
          )))}
        </select>
        </div>
        </div>
        </div>
        <div style={{marginTop:"1rem"}}>
        <input type='file' id='fileInput' onChange={e => handleChange(e)} accept="image/png, image/jpeg, image/jpg, image/jfif"/>
        <img src={BuyImg? BuyImg : ""} style={{width:"50px"}}/>
        </div>

        
        <p style={{margin:"1rem"}}>Account Access Bank</p>
        <p style={{margin:"1rem"}}>443135336453</p>
        <p style={{margin:"1rem"}}>Trade Pro</p>

        <p style={{margin:"1rem"}}>Enter Wallet Address</p>
        <div className='exchange__form'>
        <input onChange={(e)=> setWallet(e.target.value)} placeholder='Enter Wallet Address' name='wallet' className='amount__input'/>
        </div>


        <p style={{margin:"0.3rem"}}>Enter Amount</p>
        <div className='exchange__form'>
        <input onChange={e => handleAmountChange(e)} value={amount} name='amount' className='amount__input'/>
        <button className='form-btn'>Exchange ({rate})</button>
        </div>
        </form>
    </div>
  )
}
