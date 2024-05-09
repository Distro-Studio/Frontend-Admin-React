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
import AkunKaryawan from "./pages/Karyawan/AkunKaryawan";
import KeluargaKaryawan from "./pages/Karyawan/KeluargaKaryawan";
import PekerjaKontrak from "./pages/Karyawan/PekerjaKontrak";
import RekamJejak from "./pages/Karyawan/RekamJejak";
import TransferKaryawan from "./pages/Karyawan/TransferKaryawan";
import NavContainer from "./components/wrapper/NavContainer";

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
            <NavContainer active={1} title="Karyawan">
              <Karyawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/akun-karyawan"
          element={
            <NavContainer active={1} title="Akun Karyawan">
              <AkunKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/keluarga-karyawan"
          element={
            <NavContainer active={1} title="Keluarga Karyawan">
              <KeluargaKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/pekerja-kontrak"
          element={
            <NavContainer active={1} title="Pekerja Kontrak">
              <PekerjaKontrak />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/rekam-jejak"
          element={
            <NavContainer active={1} title="Rekam Jejak">
              <RekamJejak />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/transfer-karyawan"
          element={
            <NavContainer active={1} title="Transfer Karyawan">
              <TransferKaryawan />
            </NavContainer>
          }
        />

        <Route
          path="/presensi"
          element={
            <NavContainer active={2} title="Presensi">
              <Presensi />
            </NavContainer>
          }
        />

        <Route
          path="/manajemen-jadwal"
          element={
            <NavContainer active={3} title="Manajemen Jadwal">
              <ManajemenJadwal />
            </NavContainer>
          }
        />

        <Route
          path="/keuangan"
          element={
            <NavContainer active={4} title="Keuangan">
              <Keuangan />
            </NavContainer>
          }
        />

        <Route
          path="/perusahaan"
          element={
            <NavContainer active={5} title="Perusahaan">
              <Perusahaan />
            </NavContainer>
          }
        />

        <Route
          path="/pengaturan"
          element={
            <NavContainer active={6} title="Pengaturan">
              <Pengaturan />
            </NavContainer>
          }
        />

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
