import React, { useState } from 'react'

export default function Faqs() {
 const [open1,setOpen1] = useState(false)
const [open2,setOpen2] = useState(false)
const [open3,setOpen3] = useState(false)
const [open4,setOpen4] = useState(false)
const [open5,setOpen5] = useState(false)
const [open6,setOpen6] = useState(false)

  return (
    <div className='container'>
      <div className="row" style={{width:"330px"}}>
        <div className='top-nav'>
            <p>arrow</p>
            <p>Faqs</p>
            <p>+</p>
        </div>
        <section class="faq__section wrapper" id="faq">
<div class="faq__header--text">
  <h3 class="heading__tetiary-green">
    FAQs
    <svg
      width="107"
      height="6"
      viewBox="0 0 107 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector 973"
        d="M107 2.19629C107.276 2.19629 107.5 2.42015 107.5 2.69629C107.5 2.97243 107.276 3.19629 107 3.19629V2.19629ZM5.66666 2.69629C5.66666 4.16905 4.47276 5.36296 3 5.36296C1.52724 5.36296 0.333336 4.16905 0.333336 2.69629C0.333336 1.22353 1.52724 0.0296223 3 0.0296223C4.47276 0.0296223 5.66666 1.22353 5.66666 2.69629ZM107 3.19629H3V2.19629H107V3.19629Z"
        fill="url(#paint0_linear_103_5975)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_103_5975"
          x1="27.5"
          y1="2.19617"
          x2="99"
          y2="3.19617"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.365728" stop-color="#056333" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  </h3>

  <h2 class="heading__secondary color--black">
    Frequently Asked Questions
  </h2>
</div>
<div class="faq">

  <div class="questions">
    
    <div class="question__container">
      <div class="question__header flex">
        <h3 class="heading__small color--green">
        What sets Dygranabis apart in the cannabis industry?  
        </h3>
        {
          open1? <svg
          onClick={()=>setOpen1(false)}
          width="17"
          height="3"
          viewBox="0 0 17 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 35602">
            <path
              id="Vector"
              d="M1.46289 1.22852H15.4629"
              stroke="#228B22"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg> 
        :
         <svg
         onClick={()=>setOpen1(true)}
         width="17"
         height="17"
         viewBox="0 0 17 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <g id="Group 35621">
           <path
             id="Vector"
             d="M8.46289 1.22852V15.2285"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
           <path
             id="Vector_2"
             d="M1.46289 8.22852H15.4629"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </g>
       </svg>
        }
        
      </div>

      <div class="answer">
        <p class={open1? "faq--answer" : "hide" }>
        Dygranabis stands out for its commitment to excellence, innovation, and a diverse range of premium cannabis products
        </p>
      </div>
    </div>
    <div class="question__container">
      <div class="question__header flex__align flex__align">
        <h3 class="heading__small color--green">
        How does Dygranabis ensure product quality?
        </h3>
        {
          open2? <svg
          onClick={()=>setOpen2(false)}
          width="17"
          height="3"
          viewBox="0 0 17 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 35602">
            <path
              id="Vector"
              d="M1.46289 1.22852H15.4629"
              stroke="#228B22"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg> 
        :
         <svg
         onClick={()=>setOpen2(true)}
         width="17"
         height="17"
         viewBox="0 0 17 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <g id="Group 35621">
           <path
             id="Vector"
             d="M8.46289 1.22852V15.2285"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
           <path
             id="Vector_2"
             d="M1.46289 8.22852H15.4629"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </g>
       </svg>
        }
        
      </div>

      <div class="answer">
        <p class={open2? "faq--answer" : "hide" }>
        We employ cutting-edge cultivation techniques, explore new strains, and prioritize precision to set the standard for quality and potency.
        </p>
      </div>
    </div>
    <div class="question__container">
      <div class="question__header flex__align flex__align">
        <h3 class="heading__small color--green">
        What is unique about Dygranabis Logistics?
        </h3>
        {
          open3? <svg
          onClick={()=>setOpen3(false)}
          width="17"
          height="3"
          viewBox="0 0 17 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 35602">
            <path
              id="Vector"
              d="M1.46289 1.22852H15.4629"
              stroke="#228B22"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg> 
        :
         <svg
         onClick={()=>setOpen3(true)}
         width="17"
         height="17"
         viewBox="0 0 17 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <g id="Group 35621">
           <path
             id="Vector"
             d="M8.46289 1.22852V15.2285"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
           <path
             id="Vector_2"
             d="M1.46289 8.22852H15.4629"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </g>
       </svg>
        }
        
      </div>

      <div class="answer">
        <p class={open3? "faq--answer" : "hide" }>
        Our logistics services prioritize efficiency, security, and timely deliveries, ensuring a seamless supply chain for cannabis products.
        </p>
      </div>
    </div>
    <div class="question__container">
      <div class="question__header flex__align flex__align">
        <h3 class="heading__small color--green">
        How does Dygranabis contribute to sustainability?  
        </h3>
        {
          open4? <svg
          onClick={()=>setOpen4(false)}
          width="17"
          height="3"
          viewBox="0 0 17 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 35602">
            <path
              id="Vector"
              d="M1.46289 1.22852H15.4629"
              stroke="#228B22"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg> 
        :
         <svg
         onClick={()=>setOpen4(true)}
         width="17"
         height="17"
         viewBox="0 0 17 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <g id="Group 35621">
           <path
             id="Vector"
             d="M8.46289 1.22852V15.2285"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
           <path
             id="Vector_2"
             d="M1.46289 8.22852H15.4629"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </g>
       </svg>
        }
        
      </div>

      <div class="answer">
        <p class={open4? "faq--answer" : "hide" }>
        We embrace sustainable practices in cultivation and packaging, reflecting our commitment to a greener, healthier future.
        </p>
      </div>
    </div>
    <div class="question__container">
      <div class="question__header flex__align flex__align">
        <h3 class="heading__small color--green">
        Can I track my cannabis shipment?   
        </h3>
        {
          open5? <svg
          onClick={()=>setOpen5(false)}
          width="17"
          height="3"
          viewBox="0 0 17 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 35602">
            <path
              id="Vector"
              d="M1.46289 1.22852H15.4629"
              stroke="#228B22"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg> 
        :
         <svg
         onClick={()=>setOpen5(true)}
         width="17"
         height="17"
         viewBox="0 0 17 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <g id="Group 35621">
           <path
             id="Vector"
             d="M8.46289 1.22852V15.2285"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
           <path
             id="Vector_2"
             d="M1.46289 8.22852H15.4629"
             stroke="#170F49"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </g>
       </svg>
        }
        
      </div>

      <div class="answer">
        <p class={open5? "faq--answer" : "hide" }>
        Yes, Dygranabis provides accurate tracking throughout the transportation process, offering transparency and peace of mind.
        </p>
      </div>
    </div>
    
  </div>
</div>
</section>
      </div>
    
    </div>
  )
}
