import {
  Center,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
} from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { iconSize } from "../../const/sizes";
import { Dispatch } from "react";

interface Props extends InputGroupProps {
  search: string;
  setSearch: Dispatch<string>;
  resetSearch?: () => void;
}

export default function SearchComponent({
  search,
  setSearch,
  resetSearch,
  ...props
}: Props) {
  return (
    <InputGroup flex={"1 1 165px"} {...props}>
      <InputLeftElement>
        <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
      </InputLeftElement>
      <Input
        placeholder="Pencarian atau highlight"
        flex={"1 1 0"}
        pr={"36px"}
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase());
        }}
        value={search}
      />

      {search && (
        <Center zIndex={3} position={"absolute"} h={"100%"} right={2}>
          <IconButton
            aria-label="Reset Search"
            icon={<Icon as={RiCloseLine} />}
            onClick={() => {
              if (resetSearch) {
                resetSearch();
              } else {
                setSearch("");
              }
            }}
            borderRadius={"full"}
            className="btn"
            size={"xs"}
          />
        </Center>
      )}
    </InputGroup>
  );
}
