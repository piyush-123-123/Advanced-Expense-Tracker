import SignUp from "./pages/SignUp";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoutes"
import "./App.css";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {authActions} from "./components/store/authSlice";


const App=()=>{
  const dispatch=useDispatch();




 return (
 
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/resetpassword" element={<ResetPassword />} />
  </Routes>
</BrowserRouter>

 )


}
export default App;