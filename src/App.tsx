import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./chakraTheme/globalTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./globalStyle.css";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
