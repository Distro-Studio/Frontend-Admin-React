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

export default function SelectTipeCuti({
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
      value: 0,
      label: "Semua Tipe Cuti",
    },
    {
      value: 2,
      label: "Hamil",
    },
    {
      value: 3,
      label: "Haji",
    },
    {
      value: 4,
      label: "Cuti Mandiri",
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
