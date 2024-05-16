import { ButtonProps } from "@chakra-ui/react";
import StaticSelect from "../../input/StaticSelect";
import { Select__Item__Interface } from "../../../const/interfaces";

interface Props extends ButtonProps {
  selectedValue: any;
  confirmStatus: (status: Select__Item__Interface) => void;
}

export default function SelectStatusPenukaranJadwal({
  selectedValue,
  confirmStatus,
  ...props
}: Props) {
  const options = [
    {
      value: 1,
      label: "Semua Status",
    },
    {
      value: 2,
      label: "Disetujui",
    },
    {
      value: 3,
      label: "Tidak Disetujui",
    },
  ];
  return (
    <StaticSelect
      placeholder="Pilih Status"
      options={options}
      selectedValue={selectedValue}
      noSearch
      confirmSelect={confirmStatus}
      {...props}
    />
  );
}
