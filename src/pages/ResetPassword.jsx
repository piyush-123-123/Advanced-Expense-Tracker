import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../components/store/authSlice";

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
    <div className="custom-div">
      <h4 className="mt-1 border border-bottom">
        Enter an email to reset your password
      </h4>

      <Form className="d-flex flex-column" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}
        {message && <p className="text-success">{message}</p>}

        <Button
          className="mb-3"
          variant="danger"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Link"}
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;