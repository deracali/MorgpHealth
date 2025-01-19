import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Store } from '../../../Store/Store';
import axios from 'axios';

const reducer = (state,action)=>{
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

export default function Cards() {
    const params = useParams()
    const {id} = params
    const navigate = useNavigate(); 
    console.log(id)
    
    const [open,setOpen] = useState(false)
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [{value},dispatch] = useReducer(reducer,{
        value:[],
         loading:true,
         error:'',
        })
      
      useEffect(()=>{
      const fetchData = async()=>{
        dispatch({type:'FETCH_REQUEST'});
        try{
          const result = await axios.get(`http://localhost:5000/api/users/${id}`)
          dispatch({type:'FETCH_SUCCESS',payload:result.data})
       }catch(err){
           dispatch({type:'FETCH_FAIL',payload:err.message})
       }
   } 
  
   fetchData()
   },[])

  return (
    <div className='container'>
      <div className="row" style={{width:"330px"}}>
        <div className='top-nav'>
            <p>arrow</p>
            <p>Cards</p>
            <Link to={`/add@card/${userInfo?.email}`}>+</Link>
        </div>
        <div className='cards'>
        {
            
            value?.map(value=> (
            <div key={value._id} style={{background:"rgb(249, 95, 122)"}} className="card">
                <div className="card__group">
                <div className="card-details-container">
                    <div className="card-details">
                    <p className='card-name'>Card Name</p>
                    <p style={{color:"#fff"}}>{value.cardName}</p>
                    </div>
                    <div className="edit-card">
                        <p className='dots' onClick={() => setOpen(!open)}>+</p>                                                                                                    
                    </div>
                </div>
                <div className="card-number-wrap">
                    <p className='card-number'>Card Number</p>
                    <p style={{color:"#fff"}}>{value.cardNumber}</p>
                </div>
                <div className="card-issuer-wrap">
                    <p className='card-issuer'>Card Issuer</p>
                    <p style={{color:"#fff"}}>{value.cardIssuer}</p>
                </div>
                </div>
                {
                    open && (
                <div className="edit__box">
                        <div className="edit">
                            <p>+</p>
                            <Link to={`/add@card/${userInfo?.email}`}>Edit</Link>
                        </div>
                    </div>
                    )
                }
            </div>
            ))
        }
        </div>
      </div>
    
    </div>
  )
}
