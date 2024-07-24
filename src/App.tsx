import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavContainer from "./components/wrapper/NavContainer";
import jadwalTopNavs from "./const/jadwalTopNavs";
import karyawanTopNavs from "./const/karyawanTopNavs";
import keuanganTopNavs from "./const/keuanganTopNavs";
import pengaturanTopNavs from "./const/pengaturanTopNavs";
import perusahaanTopNavs from "./const/perusahaanTopNavs";
import "./globalStyle.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import MissingPage from "./pages/Error/MissingPage";
import Cuti from "./pages/Jadwal/Cuti";
import Jadwal from "./pages/Jadwal/Jadwal";
import Lembur from "./pages/Jadwal/Lembur";
import PenukaranJadwal from "./pages/Jadwal/PenukaranJadwal";
import DetailKaryawan from "./pages/Karyawan/DetailKaryawan";
import Karyawan from "./pages/Karyawan/Karyawan";
import RekamJejak from "./pages/Karyawan/RekamJejak";
import TransferKaryawan from "./pages/Karyawan/TransferKaryawan";
import DetailLaporanRiwayatPenggajian from "./pages/Keuangan/DetailLaporanRiwayatPenggajian";
import DetailLaporanThr from "./pages/Keuangan/DetailLaporanThr";
import DetailPenggajian from "./pages/Keuangan/DetailPenggajian";
import Penggajian from "./pages/Keuangan/Penggajian";
import Thr from "./pages/Keuangan/Thr";
import Login from "./pages/Login/Login";
import PengaturanCuti from "./pages/Pengaturan/PengaturanCuti";
import PengaturanHariLibur from "./pages/Pengaturan/PengaturanHariLibur";
import PengaturanJabatan from "./pages/Pengaturan/PengaturanJabatan";
import PengaturanJadwalPenggajian from "./pages/Pengaturan/PengaturanJadwalPenggajian";
import PengaturanKeizinan from "./pages/Pengaturan/PengaturanKeizinan";
import PengaturanKelolaRole from "./pages/Pengaturan/PengaturanKelolaRole";
import PengaturanKelompokGaji from "./pages/Pengaturan/PengaturanKelompokGaji";
import PengaturanKompetensi from "./pages/Pengaturan/PengaturanKompetensi";
import PengaturanKuisioner from "./pages/Pengaturan/PengaturanKuisioner";
import PengaturanPremi from "./pages/Pengaturan/PengaturanPremi";
import PengaturanShift from "./pages/Pengaturan/PengaturanShift";
import PengaturanTerPph21 from "./pages/Pengaturan/PengaturanTerPph21";
import PengaturanThr from "./pages/Pengaturan/PengaturanThr";
import PengaturanUbahKataSandi from "./pages/Pengaturan/PengaturanUbahKataSandi";
import PengaturanUnitKerja from "./pages/Pengaturan/PengaturanUnitKerja";
import DetailPelaporanKaryawan from "./pages/Perusahaan/DetailPelaporanKaryawan";
import DetailPenilaianKaryawan from "./pages/Perusahaan/DetailPenilaianKaryawan";
import DetailVerifikasiBerkas from "./pages/Perusahaan/DetailVerifikasiBerkas ";
import Perusahaan from "./pages/Perusahaan/Diklat";
import PelaporanKaryawan from "./pages/Perusahaan/PelaporanKaryawan";
import PenilaianKaryawan from "./pages/Perusahaan/PenilaianKaryawan";
import VerifikasiBerkas from "./pages/Perusahaan/VerifikasiBerkas";
import DetailPresensi from "./pages/Presensi/DetailPresensi";
import Presensi from "./pages/Presensi/Presensi";
import { globalTheme } from "./theme/globalTheme";

// github pekok

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
          path="/karyawan/:karyawanId"
          element={
            <NavContainer
              active={1}
              title="Detail Karyawan"
              left={"back"}
              // backLink="/karyawan"
            >
              <DetailKaryawan />
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
              topNavActive={1}
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
          path="/presensi/:presensiId"
          element={
            <NavContainer
              active={2}
              title="Detail Presensi"
              left={"back"}
              // backLink="/presensi"
            >
              <DetailPresensi />
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
          path="/keuangan/penggajian"
          element={
            <NavContainer
              active={4}
              title="Penggajian"
              topNavsData={keuanganTopNavs}
              topNavActive={0}
            >
              <Penggajian />
            </NavContainer>
          }
        />
        <Route
          path="/keuangan/penggajian/:penggajianId"
          element={
            <NavContainer active={4} title="Detail Penggajian" left={"back"}>
              <DetailPenggajian />
            </NavContainer>
          }
        />
        <Route
          path="/keuangan/riwayat-penggajian/laporan/:laporan_id"
          element={
            <NavContainer
              active={4}
              title="Laporan Penggajian"
              left={"back"}
              // backLink="/keuangan/riwayat-penggajian"
            >
              <DetailLaporanRiwayatPenggajian />
            </NavContainer>
          }
        />
        <Route
          path="/keuangan/thr"
          element={
            <NavContainer
              active={4}
              title="THR"
              topNavsData={keuanganTopNavs}
              topNavActive={1}
            >
              <Thr />
            </NavContainer>
          }
        />
        <Route
          path="/keuangan/thr/laporan/:thr_id"
          element={
            <NavContainer
              active={4}
              title="Laporan THR"
              left={"back"}
              // backLink="/keuangan/thr"
            >
              <DetailLaporanThr />
            </NavContainer>
          }
        />

        <Route
          path="/perusahaan/diklat"
          element={
            <NavContainer
              active={5}
              title="Diklat"
              topNavsData={perusahaanTopNavs}
              topNavActive={0}
            >
              <Perusahaan />
            </NavContainer>
          }
        />
        <Route
          path="/perusahaan/pelaporan-karyawan"
          element={
            <NavContainer
              active={5}
              title="Pelaporan Karyawan"
              topNavsData={perusahaanTopNavs}
              topNavActive={1}
            >
              <PelaporanKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/perusahaan/pelaporan-karyawan/:pelaporanId"
          element={
            <NavContainer
              active={5}
              title="Detail Pelaporan Karyawan"
              left={"back"}
            >
              <DetailPelaporanKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/perusahaan/penilaian-karyawan"
          element={
            <NavContainer
              active={5}
              title="Penilaian Karyawan"
              topNavsData={perusahaanTopNavs}
              topNavActive={2}
            >
              <PenilaianKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/perusahaan/penilaian-karyawan/:karyawanId"
          element={
            <NavContainer
              active={5}
              title="Detail Penilaian Karyawan"
              left={"back"}
            >
              <DetailPenilaianKaryawan />
            </NavContainer>
          }
        />
        <Route
          path="/perusahaan/verifikasi-berkas"
          element={
            <NavContainer
              active={5}
              title="Verifikasi-Berkas"
              topNavsData={perusahaanTopNavs}
              topNavActive={3}
            >
              <VerifikasiBerkas />
            </NavContainer>
          }
        />
        <Route
          path="/perusahaan/verifikasi-berkas/:karyawanId"
          element={
            <NavContainer
              active={5}
              title="Detail Verifikasi Berkas"
              left={"back"}
            >
              <DetailVerifikasiBerkas />
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
              // backLink="/pengaturan/akun/kelola-role"
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
          path="/pengaturan/karyawan/kuisioner"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Kuisioner"
              topNavsData={pengaturanTopNavs}
              topNavActive={1}
            >
              <PengaturanKuisioner />
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
              title="Pengaturan - Hari Libur Karyawan Non-Shift"
              topNavsData={pengaturanTopNavs}
              topNavActive={3}
            >
              <PengaturanHariLibur />
            </NavContainer>
          }
        />
        <Route
          path="/pengaturan/manajemen-waktu/cuti"
          element={
            <NavContainer
              active={6}
              title="Pengaturan - Tipe Cuti"
              topNavsData={pengaturanTopNavs}
              topNavActive={3}
            >
              <PengaturanCuti />
            </NavContainer>
          }
        />

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
