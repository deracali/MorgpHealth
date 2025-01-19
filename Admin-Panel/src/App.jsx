import { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home/Home'
import Cards from './pages/Cards/Cards'
import Footer from './components/Footer/Footer'
import Settings from './pages/Settings/Settings'
import Faqs from './pages/Faq/Faq'
import ChangeUsername from './pages/Forms/ChangeUsername/ChangeUsername'
import UpdateEmail from './pages/Forms/UpdateEmail/UpdateEmail'
import ChangePassword from './pages/Forms/ChangePassword/ChangePassword'
import History from './pages/History/History'
import PaymentSlip from './pages/PaymentSlip/PaymentSlip'
import Preloader from './components/Preloader/Preloader'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AddCard from './pages/Forms/AddCard/AddCard'
import PaymentSuccess from './pages/PaymentSlip/PaymentSuccess'

function App() {

  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const DataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };

    DataFetch();
  }, []);

  return isLoading ? (
    <Preloader/> 
  ) : 
    (
    <>
  <BrowserRouter>
        <Routes>
         <Route path="/" exact element={<Home/> } />       
         <Route path="/signin" exact element={<Login/> } />       
         <Route path="/signup" exact element={<Signup/> } />       
         <Route path="/faq" exact element={<Faqs/> } />
         <Route path="/cards/:id" exact element={<Cards/> } />
         <Route path="/settings" exact element={<Settings/> } />
         <Route path="/change@username/:id" exact element={<ChangeUsername/> } />
         <Route path="/add@card/:id" exact element={<AddCard/> } />
         <Route path="/change@email/:id" exact element={<UpdateEmail/> } />
         <Route path="/change@password" exact element={<ChangePassword/> } />
         <Route path="/history" exact element={<History/> } />
         <Route path="/receipt/:id" exact element={<PaymentSlip/> } />
         <Route path="/paymentslip" exact element={<PaymentSuccess/> } />
         <Route path="/loader" exact element={<Preloader/> } />
        </Routes>
         <Footer/>
        </BrowserRouter>   
         </>
  )
}

export default App
