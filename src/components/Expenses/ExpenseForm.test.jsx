import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
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

  return render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
};

describe("ExpenseForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders money input", () => {
    renderComponent();
    expect(screen.getByLabelText(/money/i)).toBeInTheDocument();
  });

  test("renders description input", () => {
    renderComponent();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test("renders category select", () => {
    renderComponent();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  test("renders add expense button", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /add expense/i })
    ).toBeInTheDocument();
  });

  test("money input accepts value", () => {
    renderComponent();

    const input = screen.getByLabelText(/money/i);

    fireEvent.change(input, {
      target: { value: "500" },
    });

    expect(input.value).toBe("500");
  });

  test("description input accepts value", () => {
    renderComponent();

    const input = screen.getByLabelText(/description/i);

    fireEvent.change(input, {
      target: { value: "Milk" },
    });

    expect(input.value).toBe("Milk");
  });

  test("category can be selected", () => {
    renderComponent();

    const select = screen.getByLabelText(/category/i);

    fireEvent.change(select, {
      target: { value: "Food" },
    });

    expect(select.value).toBe("Food");
  });

  test("money input is initially empty", () => {
    renderComponent();

    expect(screen.getByLabelText(/money/i).value).toBe("");
  });

  test("description input is initially empty", () => {
    renderComponent();

    expect(screen.getByLabelText(/description/i).value).toBe("");
  });

  test("category is initially empty", () => {
    renderComponent();

    expect(screen.getByLabelText(/category/i).value).toBe("");
  });
});