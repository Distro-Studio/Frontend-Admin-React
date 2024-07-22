import { ButtonProps } from "@chakra-ui/react";
import useTransferKaryawanTableColumnsConfig from "../../global/useTransferKaryawanTableColumnsConfig";
import ColumnsConfigModal from "../dependent/ColumnsConfigModal";

interface Props extends ButtonProps {
  title?: string;
}

export default function TransferKaryawanTableColumnsConfig({
  title,
  ...props
}: Props) {
  const { tableColumns, setTableColumns } =
    useTransferKaryawanTableColumnsConfig();

  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
      props: {
        position: "sticky",
        left: 0,
        zIndex: 99,
        w: "180px",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    {
      th: "No. Induk Karyawan",
      isSortable: true,
    },
    {
      th: "Kategori Transfer",
      isSortable: true,
    },
    {
      th: "Tanggal Pengajuan",
      isSortable: true,
    },
    {
      th: "Tanggal Mulai",
      isSortable: true,
    },
    {
      th: "Unit Kerja Asal",
      isSortable: true,
    },
    {
      th: "Unit Kerja Tujuan",
      isSortable: true,
    },
    {
      th: "Jabatan Asal",
      isSortable: true,
    },
    {
      th: "Jabatan Tujuan",
      isSortable: true,
    },
    {
      th: "Alasan",
    },
    {
      th: "Dokumen",
      isSortable: true,
    },
  ];

  const allColumns = [
    { column: "nama", label: "Nama" },
    { column: "nik", label: "Nik" },
    { column: "no_rm", label: "No. Rekam Medis" },
    { column: "unit_kerja", label: "Unit Kerja" },
    { column: "status_karyawan", label: "Status Karyawan" },
    { column: "email", label: "Email" },
    { column: "username", label: "Username" },
    { column: "status_aktif", label: "Status Aktif" },
    { column: "ayah", label: "Ayah" },
    { column: "ibu", label: "Ibu" },
    { column: "jumlah_keluarga", label: "Jumlah Keluarga" },
    { column: "tgl_masuk", label: "Tanggal Masuk" },
    { column: "tgl_keluar", label: "Tanggal Keluar" },
    { column: "masa_kerja", label: "Masa Kerja" },
    { column: "promosi", label: "Promosi" },
    { column: "mutasi", label: "Mutasi" },
  ];
  const presetColumns = [
    {
      label: "Semua Kolom",
      columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      label: "Karyawan",
      columns: [0, 1, 2, 3, 4],
    },
    {
      label: "Akun",
      columns: [0, 1, 5, 6, 7],
    },
    {
      label: "Keluarga",
      columns: [0, 8, 9, 10],
    },
    {
      label: "Pekerja Kontrak",
      columns: [0, 3, 11, 12, 7],
    },
    {
      label: "Rekam Jejak",
      columns: [0, 11, 12, 13, 14, 15],
    },
  ];

  // SX

  return (
    <ColumnsConfigModal
      id="config-kolom-tabel-karyawan-modal"
      defaultColumns={[0]}
      tableColumns={tableColumns}
      setTableColumns={setTableColumns}
      allColumns={allColumns}
      presetColumns={presetColumns}
      {...props}
    />
  );
}
