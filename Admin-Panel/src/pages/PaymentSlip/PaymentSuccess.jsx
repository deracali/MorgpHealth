import React from 'react'

export default function PaymentSuccess() {
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
          <p>100 Btc</p>
        </div>
        <div className="status">
          <p>Btc Purchase</p>
          <p>Sold Btc</p>
        </div>
        <div className="status">
          <p>Bank Name</p>
          <p>Access Bank</p>
        </div>
        <div className="status">
          <p>Transaction Category</p>
          <p>Crypto</p>
        </div>
        <div className="status">
          <p>Reciept</p>
          <p>Yes</p>
        </div>
        <div style={{marginBottom:"2rem"}} className="status">
          <p>Date</p>
          <p>Sep 25, 2024 10:45 AM</p>
        </div>
       </div>
      </div>
    </div>
  )
}
