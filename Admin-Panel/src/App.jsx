import {Routes,Route} from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { toast, ToastContainer } from 'react-toastify';
import SideBar from "./component/SideBar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import NavBar from "./component/NavBar";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProf from "./pages/Admin/DoctorProfile";
import DoctorWallet from "./pages/Doctor/DoctorWallet";
import Withdrawal from "./pages/Doctor/Withdrawal";


function App() {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken ||  dToken ? (
    <div className="bg-[#F8F9FD]">
       <ToastContainer />
       <NavBar/>
       <div className="flex items-start">
        <SideBar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/all-appointment' element={<AllAppointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
          <Route path='/doctor-profile/:id' element={<DoctorProf/>}/>       
          
          
          
          <Route path='/doctor-dashboard/:id' element={<DoctorDashboard/>}/>       
          <Route path='/doctor-appointment/:id' element={<DoctorAppointment/>}/>       
          <Route path='/doctor-profile/:id' element={<DoctorProfile/>}/>       
          <Route path='/doctor-wallet/:id' element={<DoctorWallet/>}/>       
          <Route path='/withdrawal' element={<Withdrawal/>}/>       
        </Routes>
       </div>
    </div> 
  )  : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
