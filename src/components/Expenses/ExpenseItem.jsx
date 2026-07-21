import "./ExpenseItem.css";
import {Button} from "react-bootstrap";

const ExpenseItem=({expense,onDeleteExpense,onEditExpense})=>{


    const deleteHandler=()=>{
     onDeleteExpense(expense.id);
    }
    const editHandler=()=>{
     onEditExpense(expense)        
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