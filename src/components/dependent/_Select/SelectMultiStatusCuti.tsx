import { Button, ButtonProps, Text, Wrap } from "@chakra-ui/react";
import { useRef, useState } from "react";
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
  noReset?: boolean;
  modalSize?: string;
  maxDisplayed?: number;
  nullLabel?: string;
}

export default function SelectMultiStatusCuti({
  placeholder,
  initialSelected,
  formik,
  name,
  confirmSelect,
  noUseBackOnClose,
  noSearch,
  noReset,
  modalSize,
  maxDisplayed,
  nullLabel,
  ...props
}: Props) {
  const [search, setSearch] = useState<string>("");
  const options = [
    {
      value: 1,
      label: "Usai",
    },
    {
      value: 2,
      label: "Berlangsung",
    },
    {
      value: 3,
      label: "Menunggu",
    },
  ];
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
      noReset={noReset}
      initialSelected={initialSelected}
      isMultiSelect
      maxDisplayed={maxDisplayed}
      nullLabel={nullLabel}
      {...props}
    >
      <Wrap my={2}>
        {filteredOptions?.map((option: any, i: number) => (
          <Button
            borderRadius={8}
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
          </Button>
        ))}
      </Wrap>

      {filteredOptions && filteredOptions.length === 0 && (
        <Text textAlign={"center"} my={2}>
          Opsi tidak ditemukan
        </Text>
      )}
    </Select>
  );
}
