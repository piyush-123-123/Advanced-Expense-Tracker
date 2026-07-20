import {Link} from "react-router-dom";
import "./Home.css";
import {Button} from "react-bootstrap";



const Home=()=>{

    const verifyEmailHandler=async ()=>{
    const tokenId=localStorage.getItem("token");
    try{
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAF3mGVzRIVBfcDUwxgUjTKXMgYBXBBY4M",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken:tokenId
                })

                
            }
        )
        const data=await response.json();
        if(!response.ok){
          throw new Error(data.error.message);

        }
        alert("Verification email sent successfully. Please check your inbox.")
    }
    catch(err){
        alert(err.message);
    }


    }

    return (
       <div>
        <div className="header">
       <h4>Welcome to Expense Tracker.!!!</h4>
       <p className="fw-bold">Your Profile is incomplete.<Link to="/profile">Complete Now</Link></p>
        </div>
        <Button className="verify-btn" onClick={verifyEmailHandler}>Verify Your Email</Button>

       </div>
    )


}

export default Home;