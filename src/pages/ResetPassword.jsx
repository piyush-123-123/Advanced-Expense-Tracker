import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../components/store/authSlice";
import "./Auth.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.auth
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(resetPassword(email));

    if (resetPassword.fulfilled.match(resultAction)) {
      alert("Password reset email has been sent. Check your Inbox");
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaWallet />
        </div>

        <h2 className="auth-title">Reset Password</h2>

        <p className="auth-subtitle">
          Enter your email and we'll send you a reset link
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

          {error && <p className="auth-error">{error}</p>}

          {message && (
            <p className="auth-success">{message}</p>
          )}

          <Button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form>

        <p className="auth-footer">
          Remember your password?{" "}
          <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;