import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const reducers = (state,action)=>{
  switch(action.type){
case 'FETCH_REQUEST':
  return {...state,loading:true};
  case 'FETCH_SUCCESS':
    return {...state,value:action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload};
      default:
        return state;
  }
}

export default function PaymentSlip() {
  const params = useParams()
  const {id} = params
  const navigate = useNavigate(); 
  

  const [{value},dispatch] = useReducer(reducers,{
    value:[],
     loading:true,
     error:'',
    })

  useEffect(()=>{
    const fetchData = async()=>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const result = await axios.get(`http://localhost:5000/api/history/${id}`)
      dispatch({type:'FETCH_SUCCESS',payload:result.data})
      }catch(err){
    dispatch({type:'FETCH_FAIL',payload:err})
      }
    //  console.log(value)
    } 
    fetchData()
      },[id])
  
  return (
    <div className='container'>
      <div className="row" style={{width:"330px"}}>
        <div className='top-nav'>
            <p>arrow</p>
            <p>Transactional Details</p>
            <p>+</p>
        </div>
       
       <div className="success__tik">
        <div className="round__tik"></div>
        <p>Payment Sent</p>
       </div>

       <div className="receipt__details">
        <div className="status">
          <p>Status</p>
          <p>Success</p>
        </div>
        <div className="status">
          <p>Amount</p>
          <p>{value.amount}</p>
        </div>
        <div className="status">
          <p>{value?.cryptoName}</p>
          <p>{value?.cardName}</p>
          
        </div>
        <div className="status">
          <p>Bank Name</p>
          <p>Access Bank</p>
        </div>
        <div className="status">
          <p>Transaction id</p>
          <p>{value?._id}</p>
        </div>
        <div className="status">
          <p>Reciept</p>
          <p>Yes</p>
        </div>
        <div style={{marginBottom:"2rem"}} className="status">
          <p>Date</p>
          <p>{value.createdAt}</p>
        </div>
       </div>
      </div>
    </div>
  )
}
