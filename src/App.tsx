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
import NavWrapper from "./components/wrapper/NavWrapper";
import AkunKaryawan from "./pages/Karyawan/AkunKaryawan";
import KeluargaKaryawan from "./pages/Karyawan/KeluargaKaryawan";
import PekerjaKontrak from "./pages/Karyawan/PekerjaKontrak";
import RekamJejak from "./pages/Karyawan/RekamJejak";
import TransferKaryawan from "./pages/Karyawan/TransferKaryawan";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <NavWrapper active={0} title="Dashboard">
              <Dashboard />
            </NavWrapper>
          }
        />

        <Route
          path="/karyawan"
          element={
            <NavWrapper active={1} title="Karyawan">
              <Karyawan />
            </NavWrapper>
          }
        />
        <Route
          path="/karyawan/akun-karyawan"
          element={
            <NavWrapper active={1} title="Akun Karyawan">
              <AkunKaryawan />
            </NavWrapper>
          }
        />
        <Route
          path="/karyawan/keluarga-karyawan"
          element={
            <NavWrapper active={1} title="Keluarga Karyawan">
              <KeluargaKaryawan />
            </NavWrapper>
          }
        />
        <Route
          path="/karyawan/pekerja-kontrak"
          element={
            <NavWrapper active={1} title="Pekerja Kontrak">
              <PekerjaKontrak />
            </NavWrapper>
          }
        />
        <Route
          path="/karyawan/rekam-jejak"
          element={
            <NavWrapper active={1} title="Rekam Jejak">
              <RekamJejak />
            </NavWrapper>
          }
        />
        <Route
          path="/karyawan/transfer-karyawan"
          element={
            <NavWrapper active={1} title="Transfer Karyawan">
              <TransferKaryawan />
            </NavWrapper>
          }
        />

        <Route
          path="/presensi"
          element={
            <NavWrapper active={2} title="Presensi">
              <Presensi />
            </NavWrapper>
          }
        />

        <Route
          path="/manajemen-jadwal"
          element={
            <NavWrapper active={3} title="Manajemen Jadwal">
              <ManajemenJadwal />
            </NavWrapper>
          }
        />

        <Route
          path="/keuangan"
          element={
            <NavWrapper active={4} title="Keuangan">
              <Keuangan />
            </NavWrapper>
          }
        />

        <Route
          path="/perusahaan"
          element={
            <NavWrapper active={5} title="Perusahaan">
              <Perusahaan />
            </NavWrapper>
          }
        />

        <Route
          path="/pengaturan"
          element={
            <NavWrapper active={6} title="Pengaturan">
              <Pengaturan />
            </NavWrapper>
          }
        />

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
