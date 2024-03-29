import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthProvider, useAuth } from "../../context/AuthProvider";
import { ContextProvider } from "../../context/ContextProvider";
import { VaultProvider } from "../../context/VaultProvider";
import Auth from "../Auth";
import Login from "../Login";
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
            <Login />
          </ContextProvider>
        </VaultProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});
describe("Login Page", () => {
  it("it should render login component", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it should contain from", () => {
    const { getByTestId } = render(component);
    const loginForm = getByTestId("loginform");
    expect(loginForm).toBeInTheDocument();
  });
  it("it should submit the form", () => {
    const componentLo = render(component);
    const fn = jest.fn();
    fn.mockReturnValue({
      email: "example@gmail.com",
      password: "123@wer",
    });
    let btn = screen.getByTestId("formSubmit");
    fireEvent.click(btn, { Event: fn() });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
