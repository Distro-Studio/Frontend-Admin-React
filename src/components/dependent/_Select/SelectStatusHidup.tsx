import React, { useRef, useState } from "react";
import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { Select__Item__Interface } from "../../../const/interfaces";
import Select from "../../input/Select";

interface Props extends ButtonProps {
  placeholder: string;
  initialSelected?: Select__Item__Interface;
  formik?: any;
  name?: string;
  confirmSelect?: (newSelectedValue: any) => void;
  noUseBackOnClose?: boolean;
  noSearch?: boolean;
  modalSize?: string;
}

export default function SelectStatusHidup({
  placeholder,
  initialSelected,
  formik,
  name,
  confirmSelect,
  noUseBackOnClose,
  noSearch,
  modalSize,
  ...props
}: Props) {
  const [search, setSearch] = useState<string>("");
  const options = [
    {
      value: 0,
      label: "Meninggal",
    },
    {
      value: 1,
      label: "Hidup",
    },
  ];
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const [selected, setSelected] = useState<Select__Item__Interface | null>(
    initialSelected || null
  );
  const selectComponentRef = useRef<{ handleOnClose: () => void } | null>(null);

  const handleOnClose = () => {
    if (selectComponentRef.current) {
      selectComponentRef.current.handleOnClose();
    }
  };

  return (
    <Select
      ref={selectComponentRef}
      placeholder={placeholder}
      selected={selected}
      setSelected={setSelected}
      formik={formik}
      name={name}
      noUseBackOnClose={noUseBackOnClose}
      search={search}
      setSearch={setSearch}
      noSearch={noSearch}
      modalSize={modalSize}
      confirmSelect={confirmSelect}
      {...props}
    >
      {filteredOptions?.map((option, i) => (
        <Button
          bg={
            selected && selected.value === option.value
              ? "var(--p500a3) !important"
              : ""
          }
          _hover={{
            bg: "var(--divider) !important",
          }}
          border={"1px solid var(--divider)"}
          borderColor={
            selected && selected.value === option.value ? "var(--p500a1)" : ""
          }
          key={i}
          onClick={() => {
            setSelected(option);
            if (formik && name) {
              formik.setFieldValue(name, option.value);
            }
            if (confirmSelect) {
              confirmSelect(option.value);
            }
            handleOnClose();
          }}
          fontWeight={500}
          justifyContent={"space-between"}
        >
          {option.label}
        </Button>
      ))}

      {filteredOptions && filteredOptions.length === 0 && (
        <Text textAlign={"center"} mt={2}>
          Opsi tidak ditemukan
        </Text>
      )}
    </Select>
  );
}