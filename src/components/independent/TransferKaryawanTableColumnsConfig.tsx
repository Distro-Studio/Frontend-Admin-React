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
    allTableColumns,
    clearedTableColumns,
    tableColumns,
    setTableColumns,
  } = useTransferKaryawanTableColumnsConfig();

  const allColumns = [
    { column: "nama", label: "Nama" },
    { column: "nik", label: "Nik" },
    { column: "unit_kerja_asal", label: "Unit Kerja Asal" },
    { column: "unit_kerja_tujuan", label: "Unit Kerja Tujuan" },
  ];
  const presetColumns = [
    {
      label: "Semua Kolom",
      columns: allTableColumns,
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
      tableColumns={tableColumns}
      setTableColumns={setTableColumns}
      allColumns={allColumns}
      presetColumns={presetColumns}
      {...props}
    />
  );
}
