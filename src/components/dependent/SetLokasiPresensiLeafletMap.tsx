import { Box, Button, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import L from "leaflet";
import { useCallback, useEffect, useState } from "react";
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
import ComponentSpinner from "../independent/ComponentSpinner";
import NotFound from "../independent/NotFound";
import CContainer from "../wrapper/CContainer";

// Props untuk komponen GMaps
interface Props {
  center: LatLng;
  officeCenter: LatLng | undefined;
  presence_radius: number | undefined;
  setOfficeLoc: (input: any) => void;
  zoom?: number;
  searchComponentRef: any;
  searchAddress: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
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

export default function SetLokasiPresensiLeafletMap({
  center,
  officeCenter,
  presence_radius,
  setOfficeLoc,
  searchComponentRef,
  zoom = 20,
  searchAddress,
  isOpen,
  onOpen,
  onClose,
}: Props) {
  const officeIcon = new L.Icon({
    iconUrl: "/vectors/icons/hospital.svg",
    iconSize: [80, 80], // Ukuran ikon
  });

  const containerStyle = {
    width: `100%`,
    height: `auto`,
    borderRadius: "8px",
    aspectRatio: 1,
  };

  const minZoomLevel = 3; // Tentukan level zoom minimum di sini
  const maxZoomLevel = 18; // Tentukan level zoom maksimum di sini

  // Tentukan batas maksimum yang dapat digeser
  const maxBounds = L.latLngBounds(
    L.latLng(-90, -180), // Batas bawah kiri (selatan barat)
    L.latLng(90, 180) // Batas atas kanan (utara timur)
  );

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

  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>(undefined);
  const [selectedSearchResult, setSelectedSearchResult] = useState<
    any | undefined
  >(undefined);

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
    } catch (error) {
      console.error("Error searching address:", error);
    } finally {
      setLoading(false);
    }
  }, [searchAddress]);

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
    if (!searchAddress) {
      onClose();
      setTimeout(() => {
        setSearchResult(undefined);
      }, 200);
    } else {
      setLoading(true);
      onOpen();
    }
  }, [searchAddress, onOpen, onClose]);

  return (
    <VStack
      w={"100%"}
      minH={"450px"}
      h={"50%"}
      aspectRatio={1}
      borderRadius={8}
      overflow={"clip"}
      position={"relative"}
    >
      <Box
        w={"calc(100% - 16px)"}
        position={"absolute"}
        top={isOpen ? "8px" : 0}
        left={"8px"}
        zIndex={9999}
        bg={"#303030df"}
        backdropFilter={"blur(20px)"}
        borderRadius={8}
        opacity={isOpen ? 1 : 0}
        visibility={isOpen ? "visible" : "hidden"}
        transition={"200ms"}
      >
        {loading && <ComponentSpinner minH={"200px"} />}

        {!loading && (
          <>
            {searchResult?.length === 0 && (
              <CContainer p={responsiveSpacing}>
                <NotFound minH={"200px"} label="Alamat tidak ditemukan" />
              </CContainer>
            )}

            {searchResult?.length > 0 &&
              searchResult.map((res: any, i: number) => {
                return (
                  i < 5 && (
                    <Button
                      className="btn"
                      h={"48px"}
                      justifyContent={"start"}
                      key={i}
                      onClick={() => {
                        setSelectedSearchResult(res);
                        onClose();
                      }}
                      w={"100%"}
                      px={4}
                      py={2}
                    >
                      <Text
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        fontWeight={500}
                      >
                        {res.display_name}
                      </Text>
                    </Button>
                  )
                );
              })}
          </>
        )}

        {/* <Menu isOpen={isOpen} initialFocusRef={undefined} autoSelect={true}>
          <MenuList
            minW={`calc(${searchComponentRef?.current?.offsetWidth}px - 16px)`}
            maxW={`calc(${searchComponentRef?.current?.offsetWidth}px - 16px)`}
            onMouseEnter={() => searchComponentRef.current?.focus()}
          >
            {loading && <ComponentSpinner minH={"200px"} />}

            {!loading && (
              <>
                {searchResult?.length === 0 && (
                  <CContainer p={responsiveSpacing}>
                    <NotFound minH={"200px"} label="Alamat tidak ditemukan" />
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
                          }}
                          w={"100%"}
                          tabIndex={-1}
                          isFocusable={false}
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
              </>
            )}
          </MenuList>
        </Menu> */}
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
