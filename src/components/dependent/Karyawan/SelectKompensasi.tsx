import { ButtonProps } from "@chakra-ui/react";
import StaticSelect from "../../input/StaticSelect";
import { Select__Item__Interface } from "../../../const/interfaces";

interface Props extends ButtonProps {
  formik?: any;
  name?: string;
  placeholder: string;
  selectedValue: any;
  noSearch?: boolean;
  noUseBackOnClose?: boolean;
  confirmSelect?: (status: Select__Item__Interface) => void;
}

export default function SelectKompensasi({
  formik,
  name,
  placeholder,
  selectedValue,
  noSearch,
  noUseBackOnClose,
  confirmSelect,
  ...props
}: Props) {
  const options = [
    {
      value: 1,
      label: "Semua Kompensasi",
    },
    {
      value: 2,
      label: "Lembur Dibayar",
    },
    {
      value: 3,
      label: "Lembur Tidak Dibayar",
    },
    {
      value: 4,
      label: "Lembur Mandiri",
    },
  ];

  return (
    <StaticSelect
      formik={formik}
      name="status_penukaran_jadwal"
      placeholder="Pilih status"
      options={options}
      selectedValue={selectedValue}
      confirmSelect={confirmSelect}
      noSearch={noSearch}
      noUseBackOnClose={noUseBackOnClose}
      {...props}
    />
  );
}
