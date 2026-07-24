import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import store from "./store/redux_store/store";

const renderApp = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe("Expense Tracker", () => {
  test("1. renders app", () => {
    renderApp();
    expect(document.body).toBeInTheDocument();
  });

  test("2. renders heading", () => {
    renderApp();
    expect(screen.getByText(/expense/i)).toBeInTheDocument();
  });

  test("3. renders expense input", () => {
    renderApp();
    expect(screen.getByPlaceholderText(/expense/i)).toBeInTheDocument();
  });

  test("4. renders amount input", () => {
    renderApp();
    expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
  });

  test("5. renders add button", () => {
    renderApp();
    expect(
      screen.getByRole("button", { name: /add/i })
    ).toBeInTheDocument();
  });

  test("6. user can type expense", () => {
    renderApp();

    const input = screen.getByPlaceholderText(/expense/i);

    fireEvent.change(input, {
      target: { value: "Milk" },
    });

    expect(input.value).toBe("Milk");
  });

  test("7. user can type amount", () => {
    renderApp();

    const input = screen.getByPlaceholderText(/amount/i);

    fireEvent.change(input, {
      target: { value: "100" },
    });

    expect(input.value).toBe("100");
  });

  test("8. add button exists", () => {
    renderApp();

    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test("9. expense input is empty initially", () => {
    renderApp();

    const input = screen.getByPlaceholderText(/expense/i);

    expect(input.value).toBe("");
  });

  test("10. amount input is empty initially", () => {
    renderApp();

    const input = screen.getByPlaceholderText(/amount/i);

    expect(input.value).toBe("");
  });
});