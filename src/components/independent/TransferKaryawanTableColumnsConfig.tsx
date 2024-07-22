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
  const {
    columnsConfigAllColumns,
    clearedTableColumns,
    columnsConfig,
    setTableColumns,
  } = useTransferKaryawanTableColumnsConfig();

  const allColumns = [
    { column: "nama", label: "Nama" },
    { column: "nik", label: "Nik" },
    { column: "kategori", label: "Kategori Transfer" },
    { column: "created_at", label: "Tanggal Pengajuan" },
    { column: "tgl_mulai", label: "Tanggal Mulai" },
    { column: "unit_kerja_asal", label: "Unit Kerja Asal" },
    { column: "unit_kerja_tujuan", label: "Unit Kerja Tujuan" },
    { column: "jabatan_asal", label: "Jabatan Asal" },
    { column: "jabatan_tujuan", label: "Jabatan Tujuan" },
    { column: "alasan", label: "Alasan" },
    { column: "dokumen", label: "Dokumen" },
  ];
  const presetColumns = [
    {
      label: "Semua Kolom",
      columns: columnsConfigAllColumns,
    },
    {
      label: "Karyawan",
      columns: [0, 1, 2, 3, 4],
    },
  ];

  // SX

  return (
    <ColumnsConfigModal
      id="config-kolom-tabel-karyawan-modal"
      clearedTableColumns={clearedTableColumns}
      tableColumns={columnsConfig}
      setTableColumns={setTableColumns}
      allColumns={allColumns}
      presetColumns={presetColumns}
      {...props}
    />
  );
}
