import "./ExpenseItem.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseSlice";
import {deleteExpenseData} from "../store/expenseSlice";

const ExpenseItem = ({ expense }) => {

    const dispatch = useDispatch();
    const deleteHandler = async () => {
        const resultAction = await dispatch(deleteExpenseData(expense.id));

        if (deleteExpenseData.rejected.match(resultAction)) {
            alert(resultAction.payload || "Failed to delete expense");
        }
    };
    const editHandler = () => {
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