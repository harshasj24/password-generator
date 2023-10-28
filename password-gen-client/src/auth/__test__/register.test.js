import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthProvider, useAuth } from "../../context/AuthProvider";
import { ContextProvider } from "../../context/ContextProvider";
import { VaultProvider } from "../../context/VaultProvider";
import Register from "../Register";
jest.mock("axios", () => {
  return { ...jest.requireActual("axios"), post: jest.fn() };
});

let component;
beforeEach(() => {
  component = (
    <BrowserRouter>
      <AuthProvider>
        <VaultProvider>
          <ContextProvider>
            <Register />
          </ContextProvider>
        </VaultProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Register Component", () => {
  it("it should render the component", () => {
    const tree = renderer.create(component).toJSON;
    expect(tree).toMatchSnapshot();
  });
  it("it should render the register form", () => {
    const wrapper = render(component);
    const registerFrom = screen.getByTestId("regForm");
    expect(registerFrom).toBeInTheDocument();
  });

  it("it should submit the form", () => {
    const componentLo = render(component);
    const fn = jest.fn();
    let btn = screen.getByTestId("formSubmit");
    fireEvent.click(btn, { Event: fn() });
    expect(btn).toBeTruthy();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
