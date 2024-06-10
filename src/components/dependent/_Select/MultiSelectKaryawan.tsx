import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { dummyKaryawanList } from "../../../const/dummy";
import { Select__Item__Interface } from "../../../const/interfaces";
import Select from "../../input/Select";

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

export default function MultiSelectKaryawan({
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
    const selectOptions = dummyKaryawanList.map((item) => ({
      value: item.id,
      label: item.user.nama,
      unit_kerja: item.unit_kerja.nama_unit,
    }));
    setOptions(selectOptions);
    // TODO get shift list
  }, []);

  const filteredOptions = options?.filter((option: any) =>
    option.label.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const [selected, setSelected] = useState<Select__Item__Interface[]>(
    initialSelected || []
  );

  const selectComponentRef = useRef<{ handleOnClose: () => void } | null>(null);

  return (
    <Select
      ref={selectComponentRef}
      placeholder={placeholder}
      initialSelected={initialSelected}
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
      isMultiSelect
      {...props}
    >
      {filteredOptions?.map((option: any, i: number) => (
        <Button
          bg={
            selected.some((item) => item.value === option.value)
              ? "var(--p500a3) !important"
              : ""
          }
          _hover={{
            bg: "var(--divider) !important",
          }}
          border={"1px solid var(--divider)"}
          borderColor={
            selected.some((item) => item.value === option.value)
              ? "var(--p500a1)"
              : ""
          }
          key={i}
          onClick={() => {
            const isSelected = selected.some(
              (item) => item.value === option.value
            );
            let newSelected;

            if (isSelected) {
              newSelected = selected.filter(
                (item) => item.value !== option.value
              );
            } else {
              newSelected = [...selected, option];
            }

            setSelected(newSelected);
          }}
          gap={4}
          justifyContent={"space-between"}
          fontWeight={500}
        >
          <Text>{option.label}</Text>
          <Text opacity={0.6} fontWeight={400} fontSize={14}>
            {option.unit_kerja}
          </Text>
        </Button>
      ))}

      {filteredOptions && filteredOptions.length === 0 && (
        <Text textAlign={"center"} my={2}>
          Opsi tidak ditemukan
        </Text>
      )}
    </Select>
  );
}
