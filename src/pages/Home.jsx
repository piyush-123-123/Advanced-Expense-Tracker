import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { Button } from "react-bootstrap";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import {  useEffect } from "react";
import ExpenseList from "../components/Expenses/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../components/store/expenseSlice";
import { authActions } from "../components/store/authSlice";
import {themeActions} from "../components/store/themeSlice";

const Home = () => {

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const premium = useSelector((state) => state.expense.premium);
  const token = useSelector((state) => state.auth.token);
  const premiumActivated=useSelector((state)=>state.expense.premiumActivated);
  const darkTheme=useSelector(state=>state.theme.darkTheme);


  const fetchHandler = async () => {
    try {
      const response = await fetch(
        "https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense.json"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      let receivedExpenses = [];

      if (data === null) {
        dispatch(expenseActions.setExpenses([]));
        return;
      }

      for (const key in data) {
        receivedExpenses.push({
          id: key,
          ...data[key],
        });
      }

      dispatch(expenseActions.setExpenses(receivedExpenses));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      alert("Verification email sent successfully. Please check your inbox.");
    } catch (err) {
      alert(err.message);
    }
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };


  const activatePremiumHandler = () => {
    dispatch(expenseActions.activatePremium());
  };
  const toggleThemeHandler=()=>{
    dispatch(themeActions.toggleTheme());
  }
  const downloadCSVHandler=()=>{
    
      const csvData = expenses.map((expense) => {
    return `${expense.money},${expense.description},${expense.category}`;
  });
  const csvContent = csvData.join("\n");
  const blob = new Blob([csvContent], {
  type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
link.href = url;
link.download = "expenses.csv";

document.body.appendChild(link);
link.click();

document.body.removeChild(link);
URL.revokeObjectURL(url);

  
  }

  return (
    <div className={darkTheme ? "dark" : "light"}>
      <div className="header">
        <h4>Welcome to Expense Tracker!!!</h4>

        <p className="fw-bold">
          Your Profile is incomplete.
          <Link to="/profile">Complete Now</Link>
        </p>

        <Button className="logout-btn" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>

      <Button className="verify-btn" onClick={verifyEmailHandler}>
        Verify Your Email
      </Button>

      {premium && (
        <Button
          variant="warning"
          className="m-3"
          onClick={activatePremiumHandler}
        >
          Activate Premium
        </Button>
      )}
      {premiumActivated && (
     <Button onClick={toggleThemeHandler}>
       Toggle Theme
     </Button>
     )}
     {premiumActivated && (
     <Button className="m-4" onClick={downloadCSVHandler}>
      Download CSV
     </Button>
      )}

      <ExpenseForm/>

      <ExpenseList
        expenses={expenses}
      />
    </div>
  );
};

export default Home;