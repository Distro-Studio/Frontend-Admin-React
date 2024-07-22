import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dummyKompetensi } from "../../../const/dummy";
import { Interface__SelectOption } from "../../../constant/interfaces";
import SingleSelectModal from "../input/SingleSelectModal";

interface Props extends ButtonProps {
  name: string;
  onConfirm: (inputValue: Interface__SelectOption | undefined) => void;
  inputValue: Interface__SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  nonNullable?: boolean;
}

export default function SelectPtkp({
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placeholder,
  nonNullable,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const options = [
    {
      value: 1,
      label: "TK/0",
    },
    {
      value: 2,
      label: "K/0",
    },
    {
      value: 3,
      label: "K/1",
    },
    {
      value: 4,
      label: "K/2",
    },
    {
      value: 5,
      label: "K/3",
    },
  ];

  return (
    <SingleSelectModal
      id="select-kompetensi-modal"
      name={name}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      options={options}
      onConfirm={(input) => {
        onConfirm(input);
      }}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      isError={isError}
      placeholder={placeholder || "Pilih PTKP"}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
