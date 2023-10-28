import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthProvider, useAuth } from "../../context/AuthProvider";
import { ContextProvider } from "../../context/ContextProvider";
import { VaultProvider } from "../../context/VaultProvider";
import Auth from "../Auth";
import { fireEvent, render, screen } from "@testing-library/react";
let component;
beforeEach(() => {
  <BrowserRouter>
    <AuthProvider>
      <VaultProvider>
        <ContextProvider>
          <Auth />
        </ContextProvider>
      </VaultProvider>
    </AuthProvider>
  </BrowserRouter>;
});

describe("Auth Component", () => {
  it("it should render the component", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
