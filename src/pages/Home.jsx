import {Link} from "react-router-dom";
import "./Home.css";


const Home=()=>{

    return (
       <div>
        <div className="header">
       <h4>Welcome to Expense Tracker.!!!</h4>
       <p className="fw-bold">Your Profile is incomplete.<Link to="/profile">Complete Now</Link></p>
        </div>
       

       </div>
    )


}

export default Home;