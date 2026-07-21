import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
const ExpenseList=({expenses,onDeleteExpense})=>{

return (
    <div className="container">
    <h3 className="text-bold border border-dark">All Expenses</h3>
  
     <ul className="expense-list">
     {expenses.map((item)=>{
     return <li key={item.id}><ExpenseItem expense={item} onDeleteExpense={onDeleteExpense} /></li>
     })}
    </ul>
    </div>
)

}
export default ExpenseList;
