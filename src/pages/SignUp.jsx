import {Form,Button} from "react-bootstrap";
import "./SignUp.css";
import {useState} from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from "react-router-dom";

const SignUp=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");


    const submitHandler=async (e)=>{
     e.preventDefault();
    if(password!==confirmPassword){
        alert("Password do not match");
        return;
    }
    try {
    const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
    );

    console.log("User has successfully signed up");
  console.log(userCredential.user);
   } catch (error) {
   alert(error.message);
   }

    }

    return (

        <div className="custom-div">
        
        <h3>Sign Up</h3>
        
        <Form className="d-flex flex-column " onSubmit={submitHandler}>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control id="email" name="email" type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" name="password" type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control id="confirmPassword" type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required></Form.Control>
            </Form.Group>
            <Button type="submit">Sign Up</Button>
        </Form>
        <p>Have an Account?<Link to="/">Log In</Link></p>
        </div>

    )

}
export default SignUp;
