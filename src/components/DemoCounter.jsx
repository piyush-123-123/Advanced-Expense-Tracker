import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";

function DemoCounter() {

    const count=useSelector(state=>state.counter);
    const dispatch=useDispatch();

  return (
    <div>
        <Login />

      <h1>{count}</h1>

      <button onClick={() => dispatch({ type: "incrementBy5"})}>
        Increment By 5
      </button>

      <button onClick={() => dispatch({type : "decrementBy5"})}>
        Decrement By 5
      </button>

    </div>
  );
}

export default DemoCounter;1