import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { dummyKompetensi } from "../../../const/dummy";
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

export default function SelectKompetensi({
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
    const options = dummyKompetensi.map((item) => ({
      value: item.id,
      label: item.nama_kompetensi,
    }));
    setOptions(options);
    // TODO get shift list
  }, []);

  const filteredOptions = options?.filter((option: any) =>
    option.label.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const [selected, setSelected] = useState<Select__Item__Interface | null>(
    initialSelected || null
  );
  const selectComponentRef = useRef<{ handleOnClose: () => void } | null>(null);

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
      initialSelected={initialSelected}
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
          }}
          gap={4}
          justifyContent={"space-between"}
          fontWeight={500}
        >
          {option.label}
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
