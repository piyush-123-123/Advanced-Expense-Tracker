import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaWallet,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../components/store/authSlice";
import "./Auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const resultAction = await dispatch(
      signupUser({
        email,
        password,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaWallet />
        </div>

        <h2 className="auth-title">Create Account</h2>

        <p className="auth-subtitle">
          Start managing your expenses smarter
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="eye-icon"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </Form.Group>

          <Form.Group className="auth-group">
            <Form.Label>Confirm Password</Form.Label>

            <div className="password-container">
              <Form.Control
                type={
                  showConfirmPassword ? "text" : "password"
                }
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </Form.Group>

          {error && <p className="auth-error">{error}</p>}

          <Button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;