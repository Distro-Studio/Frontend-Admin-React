import { Box, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LatLng } from "../../const/interfaces";
import { responsiveSpacing } from "../../const/sizes";
import SearchComponent from "./input/SearchComponent";
import SetLokasiPresensiLeafletMap from "./SetLokasiPresensiLeafletMap";

// Props untuk komponen GMaps
interface Props {
  center: LatLng;
  officeCenter: LatLng | undefined;
  presence_radius: number | undefined;
  setOfficeLoc: (input: any) => void;
}

export default function SetLokasiPresensi({
  center,
  officeCenter,
  presence_radius,
  setOfficeLoc,
}: Props) {
  const [searchAddress, setSearchAddress] = useState<string>("");
  const searchComponentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box mb={responsiveSpacing}>
        <SearchComponent
          inputRef={searchComponentRef}
          name="Search"
          onChangeSetter={(input) => {
            setSearchAddress(input);
          }}
          inputValue={searchAddress}
          placeholder="Cari Alamat"
          onFocus={onOpen}
          onBlur={onClose}
        />
      </Box>

      <SetLokasiPresensiLeafletMap
        center={center}
        officeCenter={officeCenter}
        setOfficeLoc={setOfficeLoc}
        presence_radius={presence_radius}
        zoom={12}
        searchAddress={searchAddress}
        searchComponentRef={searchComponentRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
