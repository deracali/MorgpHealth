import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import FeaturesSection from '../components/Features'
import CustomerSupport from '../components/customersupport'
import InsuranceBanner from '../components/InsuranceBanner'
import HospitalServices from '../components/Services'
import BlogApp from '../components/blogs'
import DoctorSlider from '../components/DoctorSlider'
import AboutClinic from '../components/AboutClinic'


export default function Home() {
  return (
    <div>
      <Header/>
      {/* <SpecialityMenu/> */}
      <TopDoctors/>
      <AboutClinic/>
      <FeaturesSection/>
      <CustomerSupport/>
      <DoctorSlider/>
      <HospitalServices/>
      <BlogApp/>
      <InsuranceBanner/>
    </div>
  )
}
