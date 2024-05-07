import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./chakraTheme/globalTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./globalStyle.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Karyawan from "./pages/Karyawan/Karyawan";
import Presensi from "./pages/Presensi/Presensi";
import Keuangan from "./pages/Keuangan/Keuangan";
import Perusahaan from "./pages/Perusahaan/Perusahaan";
import Pengaturan from "./pages/Pengaturan/Pengaturan";
import MissingPage from "./pages/Error/MissingPage";
import ManajemenJadwal from "./pages/Manajemen__Jadwal/ManajemenJadwal";
import NavContainer from "./components/Wrapper/NavContainer";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <NavContainer active={0} title="Dashboard">
              <Dashboard />
            </NavContainer>
          }
        />

        <Route
          path="/karyawan"
          element={
            <NavContainer active={1}>
              <Karyawan />
            </NavContainer>
          }
        />

        <Route
          path="/presensi"
          element={
            <NavContainer active={2}>
              <Presensi />
            </NavContainer>
          }
        />

        <Route
          path="/manajemen-jadwal"
          element={
            <NavContainer active={3}>
              <ManajemenJadwal />
            </NavContainer>
          }
        />

        <Route
          path="/keuangan"
          element={
            <NavContainer active={4}>
              <Keuangan />
            </NavContainer>
          }
        />

        <Route
          path="/perusahaan"
          element={
            <NavContainer active={5}>
              <Perusahaan />
            </NavContainer>
          }
        />

        <Route
          path="/pengaturan"
          element={
            <NavContainer active={6}>
              <Pengaturan />
            </NavContainer>
          }
        />

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
