import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../components/store/authSlice";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaWallet />
        </div>

        <h2 className="auth-title">Welcome Back</h2>

        <p className="auth-subtitle">
          Log in to manage your expenses
        </p>

        <Form onSubmit={submitHandler}>
          <Form.Group className="auth-group">
            <Form.Label>Email Address</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="auth-group">
            <Form.Label>Password</Form.Label>

            <div className="password-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </Form.Group>

          {error && <p className="auth-error">{error}</p>}

          <Button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </Form>

        <Link to="/resetpassword" className="forgot-link">
          Forgot Password?
        </Link>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;