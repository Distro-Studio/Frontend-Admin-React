import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { globalTheme } from "./chakraTheme/globalTheme";
import NavContainer from "./components/wrapper/NavContainer";
import "./globalStyle.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import MissingPage from "./pages/Error/MissingPage";
import AkunKaryawan from "./pages/Karyawan/AkunKaryawan";
import Karyawan from "./pages/Karyawan/Karyawan";
import KeluargaKaryawan from "./pages/Karyawan/KeluargaKaryawan";
import PekerjaKontrak from "./pages/Karyawan/PekerjaKontrak";
import RekamJejak from "./pages/Karyawan/RekamJejak";
import TransferKaryawan from "./pages/Karyawan/TransferKaryawan";
import Keuangan from "./pages/Keuangan/Keuangan";
import Login from "./pages/Login/Login";
import Pengaturan from "./pages/Pengaturan/Pengaturan";
import Perusahaan from "./pages/Perusahaan/Perusahaan";
import Presensi from "./pages/Presensi/Presensi";
import TambahKaryawan from "./pages/Karyawan/TambahKaryawan";
import { responsiveSpacing } from "./const/sizes";
import Jadwal from "./pages/Jadwal/Jadwal";
import karyawanTopNavs from "./const/karyawanTopNavs";
import jadwalTopNavs from "./const/jadwalTopNavs";
import PenukaranJadwal from "./pages/Jadwal/PenukaranJadwal";
import Lembur from "./pages/Jadwal/Lembur";
import Cuti from "./pages/Jadwal/Cuti";
import DetailKeluargaKaryawan from "./pages/Karyawan/DetailKeluargaKaryawan";

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
            <NavContainer
              active={1}
              title="Karyawan"
              topNavsData={karyawanTopNavs}
              topNavActive={0}
            >
              <Karyawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/tambah-karyawan"
          element={
            <NavContainer
              active={1}
              title="Tambah Karyawan"
              noNavs
              left={"back"}
              backLink="/karyawan"
              pb={responsiveSpacing}
            >
              <TambahKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/akun-karyawan"
          element={
            <NavContainer
              active={1}
              title="Akun Karyawan"
              topNavsData={karyawanTopNavs}
              topNavActive={1}
            >
              <AkunKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/keluarga-karyawan"
          element={
            <NavContainer
              active={1}
              title="Keluarga Karyawan"
              topNavsData={karyawanTopNavs}
              topNavActive={2}
            >
              <KeluargaKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/keluarga-karyawan/:karyawanId"
          element={
            <NavContainer
              active={1}
              title="Detail Keluarga Karyawan"
              left={"back"}
              backLink="/karyawan/keluarga-karyawan"
            >
              <DetailKeluargaKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/pekerja-kontrak"
          element={
            <NavContainer
              active={1}
              title="Pekerja Kontrak"
              topNavsData={karyawanTopNavs}
              topNavActive={3}
            >
              <PekerjaKontrak />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/rekam-jejak"
          element={
            <NavContainer
              active={1}
              title="Rekam Jejak"
              topNavsData={karyawanTopNavs}
              topNavActive={4}
            >
              <RekamJejak />
            </NavContainer>
          }
        />
        <Route
          path="/karyawan/transfer-karyawan"
          element={
            <NavContainer
              active={1}
              title="Transfer Karyawan"
              topNavsData={karyawanTopNavs}
              topNavActive={5}
            >
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
          path="/jadwal"
          element={
            <NavContainer
              active={3}
              title="Jadwal"
              topNavsData={jadwalTopNavs}
              topNavActive={0}
            >
              <Jadwal />
            </NavContainer>
          }
        />
        <Route
          path="/jadwal/penukaran-jadwal"
          element={
            <NavContainer
              active={3}
              title="Penukaran Jadwal"
              topNavsData={jadwalTopNavs}
              topNavActive={1}
            >
              <PenukaranJadwal />
            </NavContainer>
          }
        />
        <Route
          path="/jadwal/lembur"
          element={
            <NavContainer
              active={3}
              title="Lembur"
              topNavsData={jadwalTopNavs}
              topNavActive={2}
            >
              <Lembur />
            </NavContainer>
          }
        />
        <Route
          path="/jadwal/cuti"
          element={
            <NavContainer
              active={3}
              title="Cuti"
              topNavsData={jadwalTopNavs}
              topNavActive={3}
            >
              <Cuti />
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
