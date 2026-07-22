import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { Button } from "react-bootstrap";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import { useState, useEffect } from "react";
import ExpenseList from "../components/Expenses/ExpenseList";
import { authActions } from "../components/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../components/store/expenseSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  const expenses = useSelector((state) => state.expense.expenses);
  const premium = useSelector((state) => state.expense.premium);
  const token = useSelector((state) => state.auth.token);

  const [editingExpense, setEditingExpense] = useState(null);

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

      alert("Verification email sent successfully.");
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

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      dispatch(expenseActions.deleteExpense(id));
    } catch (err) {
      alert(err.message);
    }
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
  };

  const activatePremiumHandler = () => {
    alert("Premium Activated!");
  };

  return (
    <div>
      <div className="header">
        <h4>Welcome to Expense Tracker!!!</h4>

        <p className="fw-bold">
          Your Profile is incomplete.
          <Link to="/profile"> Complete Now</Link>
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

      <ExpenseForm
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
        onEditExpense={editExpenseHandler}
      />
    </div>
  );
};

export default Home;