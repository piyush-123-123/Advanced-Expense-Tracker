import {Button,Form} from "react-bootstrap";
import {useState ,useRef} from "react";

import "./Profile.css";
const Profile=()=>{


    const [name,setName]=useState("");
    const imageRef=useRef("");
   

    



    const submitHandler=async (e)=>{
        e.preventDefault();
        const imageUrl=imageRef.current.value;




    }
    const cancelClickHandler=()=>{
        setName("");
        imageRef.current.value="";
    }


    return (
       <div>
       <div className="header">
        <h4>Winners never quite,Quitters never win.</h4>
       <p>Your Profile is Incomplete</p> 
       </div>
       <div className="contact-details ">
        <h3>CONTACT DETAILS</h3>
        <Button variant="danger" onClick={cancelClickHandler}>Cancel</Button>
       </div>
       <Form className="form">
        <Form.Group>
        <Form.Label htmlFor="name">👤 Full Name</Form.Label>
        <Form.Control type="text" id="name" placeholder="enter full name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="imageUrl">🌐 Image Url</Form.Label>
        <Form.Control type="url" id="imageUrl" placeholder="enter image url" ref={imageRef}></Form.Control>
        </Form.Group>   
        <Button type="submit" className="my-4">Update</Button>     
       </Form>



       </div>
    )

}
export default Profile;