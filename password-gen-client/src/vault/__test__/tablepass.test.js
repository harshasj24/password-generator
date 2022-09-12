import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthProvider";
import { VaultProvider } from "../../context/VaultProvider";
import TabelPassword from "../TabelPassword";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { ContextProvider } from "../../context/ContextProvider";
import { BrowserRouter } from "react-router-dom";
import MockAapter from "axios-mock-adapter";
import axios from "axios";
let component;
const passwords = [
  {
    pName: "G pay",
    _id: "1234ytfhsd567",
    date: new Date(),
  },
  {
    pName: "paytm",
    _id: "1234ytfhsd56785t",
    date: new Date(),
  },
  {
    pName: "phone pay",
    _id: "1234ytfhsd569w",
    date: new Date(),
  },
];
const setOpen = jest.fn();
beforeEach(() => {
  component = (
    <BrowserRouter>
      <AuthProvider>
        <ContextProvider>
          <VaultProvider>
            <TabelPassword passwords={passwords} setModal={setOpen} />
          </VaultProvider>
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
  render(component);
});

describe("Testing Table password component", () => {
  it("it should render the table password component", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("it should contain the table rows", () => {
    const tableBody = screen.getByTestId("tableBody");
    expect(tableBody).toBeTruthy();
    expect(tableBody.childNodes.length).toEqual(3);
  });
  it("it should call the copy button", () => {
    const btn = screen.getByTestId("copy0");
    const handleClick = jest.fn();
    fireEvent.click(btn, { Event: handleClick() });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("it should call the get API", () => {
    let mock = new MockAapter(axios);
    mock
      .onGet("http://localhost:4500/vault/getPassword/1234567")
      .reply(200, passwords);
  });
  axios
    .get("http://localhost:4500/vault/getPassword/${_id}")
    .then((responce) => {
      expect(responce.data).toBe("passwords");
    });
});
