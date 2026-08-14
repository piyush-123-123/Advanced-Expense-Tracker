import "./ExpenseItem.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions, deleteExpenseData } from "../store/expenseSlice";

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
  };

  return (
    <div className="expense-item">
      <div className="expense-info">
        <div className="expense-amount">
          ₹ {expense.money}
        </div>

        <div className="expense-description">
          {expense.description}
        </div>

        <span className="expense-category">
          {expense.category}
        </span>

        <div className="expense-date">
          {expense.date}
        </div>
      </div>

      <div className="expense-actions">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={editHandler}
        >
          Edit
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ExpenseItem;