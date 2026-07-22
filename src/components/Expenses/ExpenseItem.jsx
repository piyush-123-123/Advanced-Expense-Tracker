import "./ExpenseItem.css";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { expenseActions } from "../store/expenseSlice";

const ExpenseItem=({expense})=>{

    const dispatch=useDispatch();
    const deleteHandler = async () => {
     try {
     const response = await fetch(
       `https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense/${expense.id}.json`,
       {
        method: "DELETE",
      }
     );

     if (!response.ok) {
      throw new Error("Failed to delete");
     }

    dispatch(expenseActions.deleteExpense(expense.id));
   } catch (err) {
    alert(err.message);
   }
    };
    const editHandler=()=>{
     dispatch(expenseActions.setEditingExpense(expense));   
    }

    return (
        <div className="item">
        <strong>₹ {expense.money}</strong>
        <strong>{expense.description}</strong>
        <strong>{expense.category}</strong>
        <Button onClick={editHandler}>Edit</Button>
        <Button variant="danger" onClick={deleteHandler}>Delete</Button>
        </div>
    )

}
export default ExpenseItem;