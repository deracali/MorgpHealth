import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import GiftCard from '../../components/SlidePopup/GiftCard'
import Crypto from '../../components/SlidePopup/Crypto'
import Usd from '../../components/SlidePopup/Usd'
import BuyCrypto from '../../components/SlidePopup/BuyCrypto'
import axios from 'axios'
import { Store } from '../../../Store/Store'


const reducer = (state,action)=>{
    switch(action.type){
  case 'FETCH_REQUEST':
    return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,items:action.payload,loading:false};
      case 'FETCH_FAIL':
        return {...state,loading:false,error:action.payload};
        default:
          return state;
    }
  }

export default function Home() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [{loading,error,items},dispatch] = useReducer(reducer,{
        items:[],
        loading:true,
        error:'',
       })

       useEffect(()=>{
        const fetchData = async()=>{
          dispatch({type:'FETCH_REQUEST'});
          try{
            const result = await axios.get('http://localhost:5000/api/history')
            dispatch({type:'FETCH_SUCCESS',payload:result.data})
         }catch(err){
             dispatch({type:'FETCH_FAIL',payload:err.message})
         }
     } 
    
     fetchData()
     },[])
        
          useEffect(() => {
            window.scrollTo(0, 0)
          }, [])

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
  return (
    <div className='container'>
      <div className="row">
     <div className="top">
      <p>Menu</p>
      <p>Finapp</p>
      <p>Logo</p>
     </div>
     <div className="wrapper">
     <div className="box">
      <div className='bal'>
        <div className="total-bal-text">
        <h2>Total Balance</h2>
        <p>$ 2,400.87 </p>
        </div>
        +
      </div>
      <div className='cta-btns'>
       <div className="trans-btn">
        <div onClick={(open3) => setOpen3(open3)} style={{background:"rgb(249, 95, 122)"}} className='icon-box'></div>
        <p>Withdraw</p>
       </div>
       <div className="trans-btn">
       <div onClick={(open) => setOpen(open)} style={{background:"#73af73"}} className='icon-box'></div>
        <p>Cards</p>
       </div>
       <div className="trans-btn">
       <div onClick={(open1) => setOpen1(open1)} style={{background:"#f5be13"}} className='icon-box'></div>
        <p>Btc</p>
       </div>
      </div>
     </div>
    <div className="small-box-container">
     <div className="small-box">
      <h3>Income</h3>
      <p style={{color:"green"}}>$ 20.60</p>
     </div>
     <div className="small-box">
     <h3>Expenses</h3>
      <p style={{color:"#f95f7a"}}>$ 30.50</p>
     </div>
     <div className="small-box">
     <h3>Total Bills</h3>
      <p>$ 80.56</p>
     </div>
     <div className="small-box">
     <h3>Savings</h3>
      <p>$ 70.70</p>
     </div>
    </div>

    <div className="transactions__container">
    <div className='cards__heading'>
    <p>Transactions</p>
    <p><Link to="/history">View all</Link></p>
    </div>
    {
            loading? <div>loading</div> : error? <div>error</div>
            : 
            items? (
            items?.map(item=> (
    <div className="transaction__history-container" key={item._id}>
        <Link to={`/receipt/${item._id}`}>
                <div className="transaction__text-box">
            <div className="text-box">
            <p>{item?.Cardname}</p>
            <p>{item?.cryptoName}</p>
            </div>
            <div className="price">
                <p>{item.amount}</p>
            </div>
        </div>
        </Link>
    </div>
        )) ) : (<div>Empty history</div>)
    }
   
    </div>

    <section className='card-container-section'>
    <div className='cards__heading'>
    <p>My Card</p>
    </div>
      <div className='cards__container'>
            <div style={{background:"rgb(249, 95, 122)"}} className="card">
                <div className="card-details-container">
                    <div className="card-details">
                    <p className='card-name'>Card Name</p>
                    <p style={{color:"#fff"}}>Samuel Chidera</p>
                    </div>
                </div>
                <div className="card-number-wrap">
                    <p className='card-number'>Card Number</p>
                    <p style={{color:"#fff"}}>*****7836</p>
                </div>
                <div className="card-issuer-wrap">
                    <p className='card-issuer'>Card Issuer</p>
                    <p style={{color:"#fff"}}>Union Bank</p>
                </div>
            </div>
        </div>
    </section>
    <GiftCard open={open} setOpen={setOpen}/>
    <Crypto open1={open1} setOpen1={setOpen1}/>
    <BuyCrypto open3={open3} setOpen3={setOpen3}/>
    <Usd open2={open2} setOpen2={setOpen2}/>
     </div>
      </div>
    </div>
  )
}
