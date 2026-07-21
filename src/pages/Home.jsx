import {Link,useNavigate} from "react-router-dom";
import "./Home.css";
import {Button} from "react-bootstrap";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import {useState} from "react";
import ExpenseList from "../components/Expenses/ExpenseList";



const Home=()=>{

    const navigate=useNavigate();
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
      const logoutHandler=()=>{
        localStorage.removeItem("token");
        navigate("/");
    }
    const [expenses,setExpenses]=useState([]);
      const addExpenseHandler=(expense)=>{
        setExpenses((prev)=>{
            return [...prev,expense];
        })

    }

    return (
       <div>
        <div className="header">
       <h4>Welcome to Expense Tracker.!!!</h4>
       <p className="fw-bold">Your Profile is incomplete.<Link to="/profile">Complete Now</Link></p>
       <Button className="logout-btn" onClick={logoutHandler}>Log Out</Button>
        </div>
        <Button className="verify-btn" onClick={verifyEmailHandler}>Verify Your Email</Button>
        <ExpenseForm onAddExpense={addExpenseHandler}/>
        <ExpenseList expenses={expenses}/>
       </div>
    )


}

export default Home;