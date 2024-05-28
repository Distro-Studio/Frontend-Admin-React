import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { Select__Item__Interface } from "../../../const/interfaces";
import Select from "../../input/Select";
import formatTime from "../../../const/formatTime";
import { dummyShift } from "../../../const/dummy";

interface Props extends ButtonProps {
  placeholder: string;
  initialSelected?: any;
  formik?: any;
  name?: string;
  confirmSelect?: (newSelectedValue: any) => void;
  noUseBackOnClose?: boolean;
  noSearch?: boolean;
  modalSize?: string;
}

export default function SelectTipeCuti({
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
  const [options, setOptions] = useState<any | null>(null);
  useEffect(() => {
    const options = dummyShift.map((item) => ({
      value: item.id,
      label: `${item.nama}`,
      jam_kerja: `(${formatTime(item.jam_from)} - ${formatTime(item.jam_to)})`,
    }));
    setOptions([{ value: 0, label: "Libur" }, ...options]);
    // TODO get shift list
  }, []);
  const filteredOptions = options?.filter((option: any) =>
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
      formik={formik}
      name={name}
      noUseBackOnClose={noUseBackOnClose}
      search={search}
      setSearch={setSearch}
      noSearch={noSearch}
      modalSize={modalSize}
      {...props}
    >
      {filteredOptions?.map((option: any, i: number) => (
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
          gap={4}
          justifyContent={"space-between"}
          fontWeight={500}
        >
          <Text>{option.label}</Text>
          <Text>{option.jam_kerja}</Text>
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
