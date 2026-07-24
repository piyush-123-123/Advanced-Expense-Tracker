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
  test("calls fetch on form submit", async () => {
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
test("money input is required", () => {
  renderComponent();

  expect(screen.getByLabelText(/money/i)).toBeRequired();
});

test("description input is required", () => {
  renderComponent();

  expect(screen.getByLabelText(/description/i)).toBeRequired();
});

test("category select is required", () => {
  renderComponent();

  expect(screen.getByLabelText(/category/i)).toBeRequired();
});

test("money input type is number", () => {
  renderComponent();

  expect(screen.getByLabelText(/money/i)).toHaveAttribute(
    "type",
    "number"
  );
});

test("description input type is text", () => {
  renderComponent();

  expect(screen.getByLabelText(/description/i)).toHaveAttribute(
    "type",
    "text"
  );
});

test("category contains Food option", () => {
  renderComponent();

  expect(
    screen.getByRole("option", { name: "Food" })
  ).toBeInTheDocument();
});

test("category contains Travel option", () => {
  renderComponent();

  expect(
    screen.getByRole("option", { name: "Travel" })
  ).toBeInTheDocument();
});

test("category contains Shopping option", () => {
  renderComponent();

  expect(
    screen.getByRole("option", { name: "Shopping" })
  ).toBeInTheDocument();
});

test("category contains Bills option", () => {
  renderComponent();

  expect(
    screen.getByRole("option", { name: "Bills" })
  ).toBeInTheDocument();
});
});