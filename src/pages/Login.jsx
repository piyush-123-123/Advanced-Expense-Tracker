import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { authActions } from "../components/store/authSlice"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await response.user.getIdToken();
      const userId=response.user.uid;
      localStorage.setItem("token", token);
      localStorage.setItem("userId",userId);

      dispatch(
       authActions.login({
          token,userId
        })
      );


      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="custom-div">
      <h3 className="text-bold">Log In</h3>

      <Form className="d-flex flex-column" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>

          <div className="password-container">
            <Form.Control
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </Form.Group>

        <Button type="submit">Log In</Button>
      </Form>
      <Link to="/resetpassword">Forgot Password ? </Link>
      <p>
        Do not have an Account?<Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;