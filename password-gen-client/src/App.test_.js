import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

test("renders learn react link", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("hello")).toHaveTextContent("Hello");
  console.log(getByTestId("hello"));
});
