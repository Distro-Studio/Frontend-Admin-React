import {
  Box,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import L from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { LatLng } from "../../const/interfaces";
import { responsiveSpacing } from "../../const/sizes";
import NotFound from "../independent/NotFound";
import CContainer from "../wrapper/CContainer";
import SearchComponent from "./input/SearchComponent";

// Props untuk komponen GMaps
interface Props {
  center: LatLng;
  officeCenter: LatLng | undefined;
  presence_radius: number | undefined;
  setOfficeLoc: (input: any) => void;
  zoom?: number;
}

// Hook untuk mengatur peta saat klik
function SetViewOnClick({ center }: { center: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Hook untuk menangani double-click pada peta
function HandleDoubleClick({
  setOfficeLoc,
}: {
  setOfficeLoc: (input: any) => void;
}) {
  useMapEvent("dblclick", (event) => {
    const { lat, lng } = event.latlng;
    setOfficeLoc({ lat, lng });
  });
  return null;
}

export default function SetLokasiPresensi({
  center,
  officeCenter,
  presence_radius,
  setOfficeLoc,
  zoom = 20,
}: Props) {
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(undefined);
  const [selectedSearchResult, setSelectedSearchResult] = useState<
    any | undefined
  >(undefined);
  const searchComponentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const officeIcon = new L.Icon({
    iconUrl: "/vectors/icons/hospital.svg",
    iconSize: [80, 80], // Ukuran ikon
  });

  const containerStyle = {
    width: `100%`,
    height: `auto`,
    borderRadius: "12px",
    aspectRatio: 1,
  };

  const minZoomLevel = 3; // Tentukan level zoom minimum di sini
  const maxZoomLevel = 18; // Tentukan level zoom maksimum di sini

  // Tentukan batas maksimum yang dapat digeser
  const maxBounds = L.latLngBounds(
    L.latLng(-90, -180), // Batas bawah kiri (selatan barat)
    L.latLng(90, 180) // Batas atas kanan (utara timur)
  );

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            format: "json",
            q: searchAddress,
          },
        }
      );
      const data = response.data;
      setSearchResult(data);
      onOpen();
    } catch (error) {
      console.error("Error searching address:", error);
    }
  }, [searchAddress, onOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchAddress) {
        handleSearch();
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchAddress, handleSearch]);

  useEffect(() => {
    const map = L.DomUtil.get("map");

    const handleDoubleClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    map?.addEventListener("dblclick", handleDoubleClick);

    return () => {
      map?.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  useEffect(() => {
    if (!searchAddress) {
      onClose();
    }
  }, [searchAddress, onClose]);

  return (
    <VStack
      w={"100%"}
      minH={"450px"}
      h={"50%"}
      aspectRatio={1}
      borderRadius={8}
      overflow={"clip"}
    >
      <Box position={"relative"} w={"100%"} zIndex={9999}>
        <HStack w={"100%"} ref={searchComponentRef}>
          <SearchComponent
            name="Search"
            onChangeSetter={(input) => {
              setSearchAddress(input);
            }}
            inputValue={searchAddress}
            placeholder="Cari Alamat"
            onFocus={onOpen}
          />
        </HStack>

        <Box
          w={"100%"}
          position={"absolute"}
          top={"calc(48px + 8px)"}
          left={"8px"}
        >
          <Menu isOpen={isOpen}>
            <MenuList
              minW={`calc(${searchComponentRef?.current?.offsetWidth}px - 16px)`}
              maxW={`calc(${searchComponentRef?.current?.offsetWidth}px - 16px)`}
            >
              {searchResult?.length === 0 && (
                <CContainer p={responsiveSpacing}>
                  <NotFound minH={"100px"} label="Alamat tidak ditemukan" />
                </CContainer>
              )}

              {searchResult?.length > 0 &&
                searchResult.map((res: any, i: number) => {
                  return (
                    i < 5 && (
                      <MenuItem
                        key={i}
                        onClick={() => {
                          setSelectedSearchResult(res);
                          onClose();
                          // setSearchAddress("");
                        }}
                        w={"100%"}
                      >
                        <Text
                          overflow={"hidden"}
                          whiteSpace={"nowrap"}
                          textOverflow={"ellipsis"}
                        >
                          {res.display_name}
                        </Text>
                      </MenuItem>
                    )
                  );
                })}
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <MapContainer
        id="map"
        //@ts-ignore
        center={[
          selectedSearchResult ? selectedSearchResult?.lat : center.lat,
          selectedSearchResult ? selectedSearchResult?.lng : center.lng,
        ]}
        zoom={zoom}
        style={containerStyle as any}
        minZoom={minZoomLevel}
        maxZoom={maxZoomLevel}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0} // Biarkan peta memantul ketika mencapai batas
        doubleClickZoom={false} // Nonaktifkan zoom saat double-klik
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {officeCenter && (
          <Marker
            position={[officeCenter.lat, officeCenter.lng]}
            //@ts-ignore
            icon={officeIcon}
          />
        )}
        {officeCenter && presence_radius && (
          <Circle
            center={[officeCenter.lat, officeCenter.lng]}
            //@ts-ignore
            radius={presence_radius} // Radius dalam meter
            pathOptions={{
              color: "#16b3ac", // Warna garis lingkaran
              fillColor: "#16b3ac", // Warna isi lingkaran
              fillOpacity: 0.35, // Opasitas isi lingkaran
            }}
          />
        )}

        {selectedSearchResult && (
          <Marker
            position={[selectedSearchResult.lat, selectedSearchResult.lon]}
            //@ts-ignore
            icon={
              new L.Icon({
                iconUrl: "/vectors/icons/mapPin.svg",
                iconSize: [32, 32],
              })
            }
          />
        )}

        <SetViewOnClick
          center={selectedSearchResult ? selectedSearchResult : center}
        />

        <HandleDoubleClick setOfficeLoc={setOfficeLoc} />
      </MapContainer>
    </VStack>
  );
}
