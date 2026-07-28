import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ExpenseForm from "./ExpenseForm";
import expenseReducer from "../store/expenseSlice";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ name: "123" }),
  })
);

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      expense: expenseReducer,
    },
  });

  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
};

describe("ExpenseForm", () => {
  test("renders form", () => {
    renderComponent();

    expect(screen.getByLabelText(/money/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add expense/i })
    ).toBeInTheDocument();
  });

  test("accepts user input", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/money/i), {
      target: { value: "500" },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Milk" },
    });

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Food" },
    });

    expect(screen.getByLabelText(/money/i).value).toBe("500");
    expect(screen.getByLabelText(/description/i).value).toBe("Milk");
    expect(screen.getByLabelText(/category/i).value).toBe("Food");
  });

  test("calls fetch on submit", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/money/i), {
      target: { value: "500" },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Milk" },
    });

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Food" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /add expense/i })
    );

    expect(fetch).toHaveBeenCalled();
  });
});