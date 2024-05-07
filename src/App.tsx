import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./chakraTheme/globalTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./globalStyle.css";
import NavContainer from "./components/Wrapper/NavContainer";
import Dashboard from "./pages/Dashboard/Dashboard";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <NavContainer active={0}>
              <Dashboard />
            </NavContainer>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
