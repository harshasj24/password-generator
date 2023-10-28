import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthProvider, useAuth } from "../../context/AuthProvider";
import { ContextProvider } from "../../context/ContextProvider";
import { VaultProvider } from "../../context/VaultProvider";
import TabelPassword from "../TabelPassword";
import Vault from "../Vault";
import axios from "axios";
import { useLocalStorage } from "../../hooks/UseLocalStorage";

let component = null;
let mock;

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

beforeEach(() => {
  component = (
    <BrowserRouter>
      <AuthProvider>
        <VaultProvider>
          <ContextProvider>
            <Vault />
          </ContextProvider>
        </VaultProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});
afterEach(() => {
  cleanup();
});
describe("testing vault component", () => {
  it("it should render the component", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it should call get all paswords API", () => {
    const { user, setUser } = renderHook(() =>
      useLocalStorage("user", { id: 1223 })
    );
    const wrapper = render(component);
    axios.get.mockResolvedValueOnce({
      data: {
        data: passwords,
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
