import {Form,Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {authActions} from "./store/authSlice";

const Login=()=>{
    const dispatch=useDispatch();
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(authActions.login());
    }


    return (
        <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
        </Form.Group>  
        <Button type="submit">Login</Button>

             
        </Form>
    )


}
export default Login;