import {Link,useNavigate} from "react-router-dom";
import "./Home.css";
import {Button} from "react-bootstrap";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import {useState,useEffect} from "react";
import ExpenseList from "../components/Expenses/ExpenseList";




const Home=()=>{

    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const navigate=useNavigate();
    


    const fetchHandler=async ()=>{
       
        try{
            const response=await fetch("https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense.json");
            const data=await response.json();
            if(!response.ok){
                throw new Error(data.error.message);
            }
            let receivedExpenses=[];

            if(data===null){
                setExpenses([]);
                return;
            }

            for(const key in data){
                receivedExpenses.push({
                    id:key,
                    ...data[key]
                })
            }
            setExpenses(receivedExpenses);

            
        }catch(err){
            alert(err.message);
        }

    }
    useEffect(()=>{
        fetchHandler();
    },[])


    const verifyEmailHandler=async ()=>{
    const tokenId=localStorage.getItem("token");
    
    try{
        const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
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
    const deleteExpenseHandler=async (id)=>{

        try{
          const response=await fetch(`https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense/${id}.json`,
            {
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json"
                },

            }
             
          )
          if(!response.ok){
            throw new Error("Failed to delete")
          }
          console.log("Expense successfully deleted");
          setExpenses(prev=>prev.filter((item)=>item.id!==id));
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
       <Button className="logout-btn" onClick={logoutHandler}>Log Out</Button>
        </div>
        <Button className="verify-btn" onClick={verifyEmailHandler}>Verify Your Email</Button>
        <ExpenseForm onAddExpense={addExpenseHandler}/>
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpenseHandler}/>
       </div>
    )


}

export default Home;