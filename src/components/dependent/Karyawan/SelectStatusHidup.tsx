import { ButtonProps } from "react-day-picker";
import { Select__Item__Interface } from "../../../const/interfaces";
import StaticSelect from "../../input/StaticSelect";

interface Props extends ButtonProps {
  formik?: any;
  name?: string;
  placeholder: string;
  selectedValue: any;
  noSearch?: boolean;
  noUseBackOnClose?: boolean;
  confirmSelect?: (status: Select__Item__Interface) => void;
}

export default function SelectStatusHidup({
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
      label: "Hidup",
    },
    {
      value: 2,
      label: "Meninggal",
    },
  ];

  return (
    <StaticSelect
      formik={formik}
      name="status_hidup"
      placeholder="Pilih status hidup"
      options={options}
      selectedValue={selectedValue}
      confirmSelect={confirmSelect}
      noSearch={noSearch}
      noUseBackOnClose={noUseBackOnClose}
      {...props}
    />
  );
}
