import { VStack } from "@chakra-ui/react";
import L from "leaflet";
import { useEffect } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { LatLng } from "../../const/interfaces";

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
  // console.log(center);

  // const userIcon = new L.Icon({
  //   iconUrl: "/vectors/icons/userPin.svg",
  //   iconSize: [64, 64], // Ukuran ikon
  // });

  const officeIcon = new L.Icon({
    iconUrl: "/vectors/icons/hospital.svg",
    iconSize: [80, 80], // Ukuran ikon
  });

  const containerStyle = {
    width: `100%`,
    height: `auto`,
    borderRadius: "8px",
    aspectRatio: 1,
    // padding: "8px",
  };

  const minZoomLevel = 3; // Tentukan level zoom minimum di sini
  const maxZoomLevel = 18; // Tentukan level zoom maksimum di sini

  // Tentukan batas maksimum yang dapat digeser
  const maxBounds = L.latLngBounds(
    L.latLng(-90, -180), // Batas bawah kiri (selatan barat)
    L.latLng(90, 180) // Batas atas kanan (utara timur)
  );

  return (
    <VStack
      w={"100%"}
      minH={"300px"}
      h={"50%"}
      aspectRatio={1}
      borderRadius={8}
      overflow={"clip"}
    >
      <MapContainer
        //@ts-ignore
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={containerStyle as any}
        minZoom={minZoomLevel}
        maxZoom={maxZoomLevel}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0} // Biarkan peta memantul ketika mencapai batas
        // scrollWheelZoom={false}
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

        {/* <Marker
          position={[center.lat, center.lng]}
          //@ts-ignore
          icon={userIcon}
        /> */}

        <SetViewOnClick center={center} />

        <HandleDoubleClick setOfficeLoc={setOfficeLoc} />
      </MapContainer>
    </VStack>
  );
}
