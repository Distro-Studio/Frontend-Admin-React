import React, { useState } from "react";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { RiSearch2Line } from "@remixicon/react";
import { iconSize } from "../../../const/sizes";
import { useBodyColor } from "../../../const/colors";

interface Props {
  setFilterConfig: (config: any) => void;
}

export default function FilterStatusKaryawan({ setFilterConfig }: Props) {
  const [search, setSearch] = useState<string>("");
  //TODO get list status karyawan

  return (
    <FilterItemWrapper title="Status Karyawan">
      <InputGroup position={"sticky"} top={0} bg={useBodyColor()} zIndex={2}>
        <InputLeftElement>
          <Icon as={RiSearch2Line} fontSize={iconSize} color={"p.500"} />
        </InputLeftElement>
        <Input
          name="search"
          placeholder="Pencarian"
          border={"0 !important"}
          borderBottom={"1px solid var(--divider3) !important"}
          borderRadius={"0 !important"}
          _focus={{
            border: "0 !important",
            borderBottom: "1px solid var(--p500) !important",
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </InputGroup>

      <>
        <Button
          opacity={0.6}
          justifyContent={"flex-start"}
          fontWeight={400}
          className="btn"
          flexShrink={0}
          borderRadius={0}
          h={"50px"}
        >
          Tetap
        </Button>
        <Button
          opacity={0.6}
          justifyContent={"flex-start"}
          fontWeight={400}
          className="btn"
          flexShrink={0}
          borderRadius={0}
          h={"50px"}
        >
          Kontrak
        </Button>
        <Button
          opacity={0.6}
          justifyContent={"flex-start"}
          fontWeight={400}
          className="btn"
          flexShrink={0}
          borderRadius={0}
          h={"50px"}
        >
          Magang
        </Button>
      </>
    </FilterItemWrapper>
  );
}
