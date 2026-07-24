import {Button,Form} from "react-bootstrap";
import {useState ,useEffect} from "react";
import { auth } from "../firebase";

import "./Profile.css";
const Profile=()=>{


    const [name,setName]=useState("");
    const [imageUrl,setImageUrl]=useState("");
   
   
const getUserData = async () => {
    
    const tokenId = localStorage.getItem("token");


    try {
        const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAF3mGVzRIVBfcDUwxgUjTKXMgYBXBBY4M",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken: tokenId,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message);
        }

        setName(data.users[0].displayName || "");
        setImageUrl(data.users[0].photoUrl || "");

    } catch (err) {
        alert(err.message);
    }
};
    useEffect(()=>{
        getUserData();
    },[]);

    const submitHandler=async (e)=>{
        e.preventDefault();
        const tokenId = localStorage.getItem("token");
        
        try{
            const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAF3mGVzRIVBfcDUwxgUjTKXMgYBXBBY4M",
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        idToken:tokenId,
                        displayName:name,
                        photoUrl:imageUrl,
                        returnSecureToken:true
                    })
                },
            
            )
            const data =await response.json();
            setImageUrl(data.photoUrl);
            setName(data.displayName);
                if(!response.ok){
                    throw new Error(data.error.message);
                }
                alert("Updated Successfully");
                
        }catch(err){
        alert(err.message);
    }

    }
    const cancelClickHandler=()=>{
        setName("");
        setImageUrl("")
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
       <Form className="form" onSubmit={submitHandler}>
        <Form.Group>
        <Form.Label htmlFor="name">👤 Full Name</Form.Label>
        <Form.Control type="text" id="name" placeholder="enter full name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="imageUrl">🌐 Image Url</Form.Label>
        <Form.Control type="url" id="imageUrl" placeholder="enter image url" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}></Form.Control>
        </Form.Group>   
        <Button type="submit" className="my-4">Update</Button>     
       </Form>



       </div>
    )

}
export default Profile;