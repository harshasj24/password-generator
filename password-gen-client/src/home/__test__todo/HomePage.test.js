import {
  render,
  cleanup,
  getByTestId,
  screen,
  fireEvent,
} from "@testing-library/react";
import DemoTest from "../DemoTest";
import HomePage from "../HomePage";
import TestRenderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { VaultProvider } from "../../context/VaultProvider";
import { ContextProvider } from "../../context/ContextProvider";
import { AuthProvider } from "../../context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
let testInstance;

beforeEach(() => {
  const { rerender } = render(
    <BrowserRouter>
      <AuthProvider>
        <VaultProvider>
          <ContextProvider>
            <HomePage />
          </ContextProvider>
        </VaultProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});
describe("testing Home page buttons", () => {
  it("Testing refresh button", () => {
    const handleRefreshButton = jest.fn();
    const btn = screen.getByTestId("refresh");
    fireEvent.click(btn, { Event: handleRefreshButton() });
    expect(handleRefreshButton).toHaveBeenCalledTimes(1);
  });
  it("Testing Copy button", () => {
    const copyToClipboard = jest.fn();
    const btn = screen.getByTestId("copy");
    fireEvent.click(btn, { Event: copyToClipboard() });
    expect(btn).toBeInTheDocument();
    expect(copyToClipboard).toHaveBeenCalledTimes(1);
  });
  it("Testing add button", () => {
    const handelOpen = jest.fn();
    const btn = screen.getByTestId("add");
    fireEvent.click(btn, { Event: handelOpen() });
    expect(btn).toBeInTheDocument();
    expect(handelOpen).toHaveBeenCalledTimes(1);
  });
  it("it should render all the check boxes", () => {
    const div = screen.getByTestId("checkBoxes");
    expect(div.childNodes.length).toBeGreaterThan(0);
  });
});
