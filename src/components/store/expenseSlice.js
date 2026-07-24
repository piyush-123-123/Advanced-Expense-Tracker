import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  totalExpense: 0,
  premium: false,
  premiumActivated: false,
  editingExpense: null,
  loading: false,
  error: null
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

export const sendExpenseData = createAsyncThunk(
  "expense/sendExpenseData",
  async (expenseData, { rejectWithValue }) => {
    try {
      const { expense, editingExpense } = expenseData;
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

        return {
          expense: {
            ...expense,
            id: editingExpense.id,
          },

          isEditing: true

        }


      }
      else {
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

        return {
          expense: {
            ...expense,
            id: data.name,
          },
          isEditing: false
        }


      }

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }


)
export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense.json"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Failed to fetch expenses");
      }

      let receivedExpenses = [];

      if (data) {
        for (const key in data) {
          receivedExpenses.push({
            id: key,
            ...data[key],
          });
        }
      }

      return receivedExpenses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {

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

  extraReducers: (builder) => {
    builder
      .addCase(sendExpenseData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendExpenseData.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.isEditing) {
          state.expenses = state.expenses.map((item) =>
            item.id === action.payload.expense.id
              ? action.payload.expense
              : item
          );

          state.editingExpense = null;
        } else {
          state.expenses.push(action.payload.expense);
        }

        const { total, premium } = calculateTotal(state.expenses);
        state.totalExpense = total;
        state.premium = premium;
      })

      .addCase(sendExpenseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;

        const { total, premium } = calculateTotal(state.expenses);
        state.totalExpense = total;
        state.premium = premium;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;