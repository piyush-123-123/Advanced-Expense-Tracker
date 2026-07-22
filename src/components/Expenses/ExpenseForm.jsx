import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseSlice";

const ExpenseForm = ({
  editingExpense,
  setEditingExpense,
}) => {
  const dispatch = useDispatch();

  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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

    try {
      if (editingExpense) {
        const response = await fetch(
          `https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense/${editingExpense.id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }

        dispatch(
          expenseActions.updateExpense({
            ...expense,
            id: editingExpense.id,
          })
        );

        setEditingExpense(null);
      } else {
        const response = await fetch(
          "https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }

        dispatch(
          expenseActions.addExpense({
            ...expense,
            id: data.name,
          })
        );
      }

      setMoney("");
      setDescription("");
      setCategory("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Form className="d-flex flex-column m-5" onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Money (Price)</Form.Label>
        <Form.Control
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
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