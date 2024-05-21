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

export default function SelectJenisKompetensi({
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
      label: "Medis",
    },
    {
      value: 1,
      label: "Non-Medis",
    },
  ];

  return (
    <StaticSelect
      formik={formik}
      name={name}
      placeholder={placeholder}
      options={options}
      selectedValue={selectedValue}
      confirmSelect={confirmSelect}
      noSearch={noSearch}
      noUseBackOnClose={noUseBackOnClose}
      isBooleanOptions
      {...props}
    />
  );
}
