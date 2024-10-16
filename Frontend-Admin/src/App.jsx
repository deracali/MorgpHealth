
import {Routes,Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Doctor from './pages/Doctor'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import Appointment from "./pages/Appointment"
import Insurance from "./pages/Insurance"
import InsuranceData from "./pages/InsuranceData"
import DoctorsPrescription from "./pages/DoctorsPrescription"
import DoctorsDiagnosis from "./pages/DoctorsDiagnosis"

function App() {


  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
        <Routes>
         <Route path="/" exact element={<Home/> } />    
         <Route path="/doctors" element={<Doctor/> } />    
         <Route path="/doctors/:speciality" element={<Doctor/> } />    
         <Route path="/login" element={<Login/> } />    
         <Route path="/about" element={<About/> } />    
         <Route path="/contact" element={<Contact/>} />    
         <Route path="/my-profile"  element={<MyProfile/> } />    
         <Route path="/appointment/:docId" element={<Appointment/> } />    
         <Route path="/my-appointments/:id" element={<MyAppointment/> } />    
         <Route path="/my-insurance" element={<InsuranceData/> } />    
         <Route path="/doctors-prescription/:id" element={<DoctorsPrescription/> } />    
         <Route path="/doctors-diagnosis/:id" element={<DoctorsDiagnosis/> } />    
         <Route path="/insurance" element={<Insurance/> } />    
        </Routes>
      <Footer/>
        </div> 
  )
}

export default App
