import "./ExpenseItem.css";
import {Button} from "react-bootstrap";

const ExpenseItem=({expense,onDeleteExpense})=>{


    const deleteHandler=()=>{
     onDeleteExpense(expense.id);
    }

    return (
        <div className="item">
        <strong>₹ {expense.money}</strong>
        <strong>{expense.description}</strong>
        <strong>{expense.category}</strong>
        <Button variant="danger" onClick={deleteHandler}>Delete</Button>
        </div>
    )

}
export default ExpenseItem;