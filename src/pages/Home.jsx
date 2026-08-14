import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { Button } from "react-bootstrap";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions, fetchExpenses } from "../components/store/expenseSlice";
import { authActions } from "../components/store/authSlice";
import { themeActions } from "../components/store/themeSlice";

const Home = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.expenses);
  const premium = useSelector((state) => state.expense.premium);
  const premiumActivated = useSelector(
    (state) => state.expense.premiumActivated
  );
  const totalExpense = useSelector(
    (state) => state.expense.totalExpense
  );
  const token = useSelector((state) => state.auth.token);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

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

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadCSVHandler = () => {
    const csvData = expenses.map((expense) => {
      return `${expense.money},${expense.description},${expense.category},${expense.date || ""}`;
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
  };

  return (
    <div className={darkTheme ? "home-page dark" : "home-page light"}>

      <header className="home-header">
        <div>
          <h2>Expense Tracker</h2>
          <p>Manage your expenses smarter with AI.</p>
        </div>

        <div className="header-actions">
          <Button
            variant="outline-primary"
            onClick={verifyEmailHandler}
          >
            Verify Email
          </Button>

          <Button
            variant="outline-danger"
            onClick={logoutHandler}
          >
            Log Out
          </Button>
        </div>
      </header>

   
      <div className="profile-banner">
        <div>
          <strong>Your profile is incomplete.</strong>
          <p>Complete your profile to keep your account information updated.</p>
        </div>

        <Link to="/profile" className="profile-link">
          Complete Now →
        </Link>
      </div>

  
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Expenses</span>
          <h3>₹ {totalExpense}</h3>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Transactions</span>
          <h3>{expenses.length}</h3>
        </div>

        <div className="stat-card">
          <span className="stat-label">Premium</span>

          <h3>
            {premiumActivated
              ? "Active"
              : premium
              ? "Available"
              : "Standard"}
          </h3>
        </div>
      </div>

   
      {premium && !premiumActivated && (
        <div className="premium-banner">
          <div>
            <h4>⭐ Premium features available</h4>
            <p>
              Unlock theme switching and CSV expense export.
            </p>
          </div>

          <Button variant="warning" onClick={activatePremiumHandler}>
            Activate Premium
          </Button>
        </div>
      )}

      {premiumActivated && (
        <div className="premium-actions">
          <Button variant="dark" onClick={toggleThemeHandler}>
            Toggle Theme
          </Button>

          <Button variant="success" onClick={downloadCSVHandler}>
            Download CSV
          </Button>
        </div>
      )}

      
      <section className="dashboard-section">
        <div className="section-heading">
          <h3>Add Expense</h3>
          <p>Add manually or use AI to fill the form.</p>
        </div>

        <ExpenseForm />
      </section>

    
      <section className="dashboard-section">
        <div className="section-heading">
          <h3>Your Expenses</h3>
          <p>View, edit and manage your recent transactions.</p>
        </div>

        <ExpenseList expenses={expenses} />
      </section>
    </div>
  );
};

export default Home;