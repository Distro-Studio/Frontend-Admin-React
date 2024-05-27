import { ButtonProps } from "@chakra-ui/react";
import { Select__Item__Interface } from "../../../const/interfaces";
import { useEffect, useState } from "react";
import StaticSelect from "../../input/StaticSelect";
import { dummyShift } from "../../../const/dummy";
import formatTime from "../../../const/formatTime";

interface Props extends ButtonProps {
  formik?: any;
  name?: string;
  placeholder: string;
  selectedValue: any;
  noSearch?: boolean;
  noUseBackOnClose?: boolean;
  confirmSelect?: (status: Select__Item__Interface) => void;
  isBooleanOptions?: boolean;
}

export default function SelectShift({
  formik,
  name,
  placeholder,
  selectedValue,
  noSearch,
  noUseBackOnClose,
  confirmSelect,
  isBooleanOptions,
  ...props
}: Props) {
  // const [loading, setLoading] = useState<boolean>(false);

  const [optionsData, setOptionsData] = useState<any | null>(null);
  useEffect(() => {
    const options = dummyShift.map((item) => ({
      value: item.id,
      label: `${item.nama} - (${formatTime(item.jam_from)} - ${formatTime(
        item.jam_to
      )})`,
    }));
    setOptionsData([{ value: 0, label: "Libur" }, ...options]);
    // TODO get shift list
  }, []);

  return (
    <StaticSelect
      formik={formik}
      name={name}
      placeholder={placeholder}
      options={optionsData}
      selectedValue={selectedValue}
      confirmSelect={confirmSelect}
      noSearch={noSearch}
      noUseBackOnClose={noUseBackOnClose}
      {...props}
    />
  );
}
