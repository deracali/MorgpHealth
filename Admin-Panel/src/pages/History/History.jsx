import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';

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

  

export default function History() {
 
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
    },[id])

   
       
         useEffect(() => {
           window.scrollTo(0, 0)
         }, [])

  return (
    <div className="container">
        <div className="row">
        <div className='top-nav'>
            <p>arrow</p>
            <p>History</p>
            <p>+</p>
        </div>
    <div style={{marginTop:"3rem"}} className="transactions__container">
   
    {
            loading? <div>loading</div> : error? <div>error</div>
            : 
            items?.map(item=> (
                <div key={item._id}>
    <p>{item.createdAt}</p>
    <div className="transaction__history-container">
    <Link to={`/receipt/${item._id}`}>
                <div className="transaction__text-box" key={item._id}>
                <div className="text-box">
                {/* <p>{item.createdAt}</p> */}
                <p>{item?.Cardname}</p>
                <p>{item?.cryptoName}</p>
                </div>
                <div className="price">
                <p>$ {item?.amount}</p>
                </div>
            </div>
          </Link>
    </div>
    </div>
      ))
    }
    
    </div>
        </div>
    </div>
  )
}
