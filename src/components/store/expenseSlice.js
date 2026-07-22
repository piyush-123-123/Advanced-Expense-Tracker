import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  totalExpense: 0,
  premium: false,
  premiumActivated: false,
  editingExpense: null,
};

const calculateTotal = (expenses) => {
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.money),
    0
  );

  return {
    total,
    premium: total > 10000,
  };
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;

      const { total, premium } = calculateTotal(state.expenses);
      state.totalExpense = total;
      state.premium = premium;

    },

    addExpense(state, action) {
      state.expenses.push(action.payload);

      const { total, premium } = calculateTotal(state.expenses);
      state.totalExpense = total;
      state.premium = premium;
    },

    updateExpense(state, action) {
      state.expenses = state.expenses.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      const { total, premium } = calculateTotal(state.expenses);
      state.totalExpense = total;
      state.premium = premium;
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload
      );

      const { total, premium } = calculateTotal(state.expenses);
      state.totalExpense = total;
      state.premium = premium;
    },
    setEditingExpense(state, action) {
     state.editingExpense = action.payload;
    },

    clearEditingExpense(state) {
     state.editingExpense = null;
     },
     activatePremium(state) {
  state.premiumActivated = true;
},
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;