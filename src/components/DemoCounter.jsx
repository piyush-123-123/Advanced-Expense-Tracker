import { useDispatch, useSelector } from "react-redux";
import { incrementBy2, decrementBy2 } from "../components/store/counterSlice";

function DemoCounter() {
  const count = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => dispatch(incrementBy2())}>
        Increment By 2
      </button>

      <button onClick={() => dispatch(decrementBy2())}>
        Decrement By 2
      </button>
    </div>
  );
}

export default DemoCounter;