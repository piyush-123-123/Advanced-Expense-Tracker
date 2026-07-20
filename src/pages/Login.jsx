import {Form,Button} from  'react-bootstrap';
import {useState} from "react";
import {Link} from "react-router-dom";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Login=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const submitHandler=async (e)=>{
    
        e.preventDefault();
        try{
            const response=await signInWithEmailAndPassword(
                auth,email,password
            )
            const token=await response.user.getIdToken();
            localStorage.setItem("token",token);
            console.log(localStorage.getItem("token"));
            
             navigate("/home");
        }

        catch(err){
          alert(err.message);
        }
       
    }



    return (
        <div className="custom-div">        
                <h3>Log In</h3>
                <Form className="d-flex flex-column " onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email Address</Form.Label>
                    <Form.Control id="email" name="email" type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control id="password" name="password" type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required></Form.Control>
                    </Form.Group>
                    <Button type="submit">Log In</Button>
                </Form>
                <p>Do not have an Account?<Link to="/signup">Sign Up</Link></p>
                </div>
    )



}
export default Login;
