import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthProvider } from "../../context/AuthProvider";
import { ContextProvider } from "../../context/ContextProvider";
import { VaultProvider } from "../../context/VaultProvider";
import TabelPassword from "../TabelPassword";
import Vault from "../Vault";
let component = null;
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

  render(component);
});

describe("testing vault component", () => {
  it("it should render the component", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
