import SignUp from "./pages/SignUp";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";

const App=()=>{

 return (
 
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/resetpassword" element={<ResetPassword />} />
  </Routes>
</BrowserRouter>

 )


}
export default App;