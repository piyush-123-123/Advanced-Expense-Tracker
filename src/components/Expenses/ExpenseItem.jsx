import "./ExpenseItem.css";

const ExpenseItem=({expense})=>{

    return (
        <div className="item">
        <strong>₹ {expense.money}</strong>
        <strong>{expense.description}</strong>
        <strong>{expense.category}</strong>
        </div>
    )

}
export default ExpenseItem;