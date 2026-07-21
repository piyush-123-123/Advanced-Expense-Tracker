import {Form,Button}  from "react-bootstrap";
import {useState} from "react";
import "./SignUp.css";
import {useNavigate} from "react-router-dom";


const ResetPassword=()=>{
    const navigate=useNavigate();

    const [email,setEmail]=useState("");

    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAF3mGVzRIVBfcDUwxgUjTKXMgYBXBBY4M",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                  body : JSON.stringify({
                    requestType:"PASSWORD_RESET",
                    email:email,
                  })
                }
            )
            const data=await response.json();
            if(!response.ok){
                throw new Error(data.error.message);
            }
            alert("Password reset email has been sent. Check your Inbox");
            navigate("/");

        }
        catch(err){
            alert(err.message);
        }
    }

    return (
        <div className="custom-div">
        <h4 className="mt-1 border border-bottom">Enter an email to reset your password</h4>
        <Form className="d-flex flex-column" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mb-3" variant="danger" type="submit">Send Link</Button>
        </Form>


        </div>
    )

}
export default ResetPassword;