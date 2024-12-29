import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import His1 from '../images/B16-1.jpg'
import His2 from '../images/B15-1.jpg'
import His3 from '../images/B14-1.jpg'
import His4 from '../images/B13-1.jpg'
import DoctorSlider from '../components/DoctorSlider'


const historyData = [
  {
    id: 1,
    image: His1, // Replace with the actual image path
    years: "2012 – 2013",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages.",
  },
  {
    id: 2,
    image: His2, // Replace with the actual image path
    years: "2013 – 2014",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages.",
  },
  {
    id: 3,
    image: His3, // Replace with the actual image path
    years: "2014 – 2015",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages.",
  },
  {
    id: 4,
    image:His4, // Replace with the actual image path
    years: "2015 – 2020",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages.",
  },
];

export default function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'> 
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>
     
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
      <p>Welcome to MorgepHealth, your trusted partner in managing your health</p>
      <p>At MorgepHealth, we believe that taking control of your health should be simple and accessible. Our platform offers you a range of tools and resources designed to empower you on your wellness journey.</p>
      <b className='text-gray-800'>Our Vision</b>
      <p>At MorgepHealth, our vision is to create a world where everyone has the knowledge, resources, and support needed to take charge of their health and well-being. We strive to empower individuals to make informed health decisions, foster strong patient-provider relationships, and build a thriving community dedicated to holistic wellness.</p>
      </div>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text[-15px] hover:bg-primary hover-text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
        <p>Tailored recommendations based on your unique health profile.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text[-15px] hover:bg-primary hover-text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Convenience:</b>
        <p>TailoreOur team of healthcare professionals is here to support you every step of the way.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text[-15px] hover:bg-primary hover-text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>User Friendly</b>
        <p> We prioritize your ease of use, making health management straightforward and efficient.</p>
        </div>
     
      </div>

   
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Morgphealth - The Platform You Deserve
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Personalized Approach: We tailor each procedure to your specific
          needs, ensuring that you receive the most appropriate and effective
          treatment.
        </p>
      </div>
      <div className="mt-10 grid gap-10 mobile-grid-3">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="flex justify-center items-center h-20 w-20 mx-auto bg-blue-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16 3.25M12 14L5.84 17.25M12 14v7m0-7L3 9m9 5l9-5-9 5z"
              />
            </svg>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Qualified Doctors
          </h3>
          <p className="mt-4 text-gray-500">
            Someone who has passed all required examinations in a medical school
            and has been awarded an MBBS/MBCHB/MD.
          </p>
         
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="flex justify-center items-center h-20 w-20 mx-auto bg-blue-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m0 0a9 9 0 11-6.627 3.01L5 13a9 9 0 016.627-3.01z"
              />
            </svg>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Trusted Treatment
          </h3>
          <p className="mt-4 text-gray-500">
            Morgphealth has a variety of treatment regimens tailored towards
            your needs.
          </p>
         
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="flex justify-center items-center h-20 w-20 mx-auto bg-blue-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l-3-3m0 0l-3 3m3-3v12m4 4l6 3 6-3m-6-3l-6 3m6-3V4l3 3m-3-3L9 7m3-3L3 7m9 13v3m0-3h3"
              />
            </svg>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            24/7 Services
          </h3>
          <p className="mt-4 text-gray-500">
            Morgphealth is at your service 24×7, aiming to provide the best
            services that top-notch medical professionals offer.
          </p>
         
        </div>
      </div>
    </div>
 

    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          <span className="text-blue-500">Our</span> History
        </h2>
        <div className="space-y-8">
          {historyData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center md:items-start gap-6"
            >
              <img
                src={item.image}
                alt={`History ${item.years}`}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-6">
                <p className="text-lg font-semibold text-gray-800">{item.years}</p>
                <p className="text-gray-600 text-center md:text-left">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <DoctorSlider/>
    </div>
  )
}
