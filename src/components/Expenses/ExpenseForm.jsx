import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendExpenseData } from "../store/expenseSlice";


const ExpenseForm = () => {
  const dispatch = useDispatch();

  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const editingExpense = useSelector(
    (state) => state.expense.editingExpense
  );

  useEffect(() => {
    if (editingExpense) {
      setMoney(editingExpense.money);
      setDescription(editingExpense.description);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const submitHandler = async (e) => {
  e.preventDefault();

  const expense = {
    money,
    description,
    category,
  };

  const resultAction = await dispatch(
    sendExpenseData({
      expense,
      editingExpense,
    })
  );

  if (sendExpenseData.fulfilled.match(resultAction)) {
    setMoney("");
    setDescription("");
    setCategory("");
  } else {
    alert(resultAction.payload || "Something went wrong");
  }
};

  return (
    <Form className="d-flex flex-column m-5" onSubmit={submitHandler}>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="money">Money (Price)</Form.Label>
        <Form.Control
          id="money"
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </Button>
    </Form>
  );
};

export default ExpenseForm;