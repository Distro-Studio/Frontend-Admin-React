import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { globalTheme } from "./chakraTheme/globalTheme";
import NavContainer from "./components/wrapper/NavContainer";
import jadwalTopNavs from "./const/jadwalTopNavs";
import karyawanTopNavs from "./const/karyawanTopNavs";
import pengaturanTopNavs from "./const/pengaturanTopNavs";
import { responsiveSpacing } from "./const/sizes";
import "./globalStyle.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import MissingPage from "./pages/Error/MissingPage";
import Cuti from "./pages/Jadwal/Cuti";
import Jadwal from "./pages/Jadwal/Jadwal";
import Lembur from "./pages/Jadwal/Lembur";
import PenukaranJadwal from "./pages/Jadwal/PenukaranJadwal";
import AkunKaryawan from "./pages/Karyawan/AkunKaryawan";
import DetailKeluargaKaryawan from "./pages/Karyawan/DetailKeluargaKaryawan";
import Karyawan from "./pages/Karyawan/Karyawan";
import KeluargaKaryawan from "./pages/Karyawan/KeluargaKaryawan";
import PekerjaKontrak from "./pages/Karyawan/PekerjaKontrak";
import RekamJejak from "./pages/Karyawan/RekamJejak";
import TambahKaryawan from "./pages/Karyawan/TambahKaryawan";
import TransferKaryawan from "./pages/Karyawan/TransferKaryawan";
import Keuangan from "./pages/Keuangan/Keuangan";
import Login from "./pages/Login/Login";
import PengaturanKelolaRole from "./pages/Pengaturan/PengaturanKelolaRole";
import Perusahaan from "./pages/Perusahaan/Perusahaan";
import Presensi from "./pages/Presensi/Presensi";
import PengaturanKeizinan from "./pages/Pengaturan/PengaturanKeizinan";
import PengaturanUbahKataSandi from "./pages/Pengaturan/PengaturanUbahKataSandi";
import PengaturanKelompokGaji from "./pages/Pengaturan/PengaturanKelompokGaji";
import PengaturanJabatan from "./pages/Pengaturan/PengaturanJabatan";
import PengaturanUnitKerja from "./pages/Pengaturan/PengaturanUnitKerja";
import PengaturanKompetensi from "./pages/Pengaturan/PengaturanKompetensi";
import PengaturanPremi from "./pages/Pengaturan/PengaturanPremi";
import PengaturanTerPph21 from "./pages/Pengaturan/PengaturanTerPph21";
import PengaturanJadwalPenggajian from "./pages/Pengaturan/PengaturanJadwalPenggajian";
import PengaturanThr from "./pages/Pengaturan/PengaturanThr";
import PengaturanShift from "./pages/Pengaturan/PengaturanShift";

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
          path="/pengaturan/akun/kelola-role"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Kelola Role"
              topNavsData={pengaturanTopNavs}
              topNavActive={0}
            >
              <PengaturanKelolaRole />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/akun/kelola-role/:role_id/:role_name"
          element={
            <NavContainer
              active={6}
              title="Atur Keizinan"
              left={"back"}
              backLink="/pengaturan/akun/kelola-role"
            >
              <PengaturanKeizinan />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/akun/ubah-kata-sandi"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Ubah Kata Sandi"
              topNavsData={pengaturanTopNavs}
              topNavActive={0}
            >
              <PengaturanUbahKataSandi />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/karyawan/kelompok-gaji"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Kelompok Gaji"
              topNavsData={pengaturanTopNavs}
              topNavActive={1}
            >
              <PengaturanKelompokGaji />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/karyawan/jabatan"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Jabatan"
              topNavsData={pengaturanTopNavs}
              topNavActive={1}
            >
              <PengaturanJabatan />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/karyawan/unit-kerja"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Unit Kerja"
              topNavsData={pengaturanTopNavs}
              topNavActive={1}
            >
              <PengaturanUnitKerja />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/karyawan/kompetensi"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Kompetensi"
              topNavsData={pengaturanTopNavs}
              topNavActive={1}
            >
              <PengaturanKompetensi />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/keuangan/premi"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Premi"
              topNavsData={pengaturanTopNavs}
              topNavActive={2}
            >
              <PengaturanPremi />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/keuangan/ter-pph21"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - TER pph21"
              topNavsData={pengaturanTopNavs}
              topNavActive={2}
            >
              <PengaturanTerPph21 />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/keuangan/jadwal-penggajian"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Jadwal Penggajian"
              topNavsData={pengaturanTopNavs}
              topNavActive={2}
            >
              <PengaturanJadwalPenggajian />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/keuangan/thr"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - THR"
              topNavsData={pengaturanTopNavs}
              topNavActive={2}
            >
              <PengaturanThr />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/manajemen-waktu/shift"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Shift"
              topNavsData={pengaturanTopNavs}
              topNavActive={3}
            >
              <PengaturanShift />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/manajemen-waktu/hari-libur"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Hari Libur"
              topNavsData={pengaturanTopNavs}
              topNavActive={3}
            >
              <PengaturanShift />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/manajemen-waktu/cuti"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Cuti"
              topNavsData={pengaturanTopNavs}
              topNavActive={3}
            >
              <PengaturanShift />
            </NavContainer>
          }
        />

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
