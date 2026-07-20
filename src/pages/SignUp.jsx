import {Form,Button} from "react-bootstrap";
import "./SignUp.css";
import {useState} from "react";

const SignUp=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");


    const submitHandler=(e)=>{
     e.preventDefault();
     const enteredEmail=email
     const enteredPassword=password
     const enteredConfirmPassword=confirmPassword
     if(enteredPassword!==enteredConfirmPassword){
        alert("Password do not match");
        return
     }
     const userData={
        enteredEmail,
        enteredPassword
     }
     
     
    }

    return (

        <div className="custom-div">
        
        <h3>Sign Up</h3>
        
        <Form className="d-flex flex-column " onSubmit={submitHandler}>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control id="email" name="email" type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" name="password" type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control id="confirmPassword" type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit">Sign Up</Button>
        </Form>
        <p>Have an Account?Login</p>
        </div>

    )

}
export default SignUp;
