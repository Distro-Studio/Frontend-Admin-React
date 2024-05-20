import { Button, Checkbox, HStack, Text, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabelKeizinan from "../../components/dependent/Pengaturan/Tabel/TabelKeizinan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanKeizinan() {
  const { role_id, role_name } = useParams();
  //! DEBUG
  const dummy = [
    {
      id: 1,
      name: "Karyawan",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 2,
      name: "Keluarga Karyawan",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 3,
      name: "Akun Karyawan",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 4,
      name: "Pekerja Kontrak",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 5,
      name: "Rekam Jejak",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 6,
      name: "Transfer Karyawan",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 7,
      name: "Presensi",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 8,
      name: "Jadwal",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 9,
      name: "Penukaran Jadwal",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 10,
      name: "Lembur",
      permission: { view: true, add: true, edit: true, delete: true },
    },
    {
      id: 11,
      name: "Cuti",
      permission: { view: true, add: true, edit: true, delete: true },
    },
  ];
  //! DEBUG
  const [data] = useState<any[] | null>(dummy);
  const [semuaIzin, setSemuaIzin] = useState(false);

  useEffect(() => {
    //TODO get permission
    console.log(role_id);
  }, []);

  return (
    <>
      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap justify={"space-between"} mb={responsiveSpacing}>
            <HStack gap={8}>
              <HStack>
                <Text>Role :</Text>
                <Text fontWeight={600} fontSize={18}>
                  {role_name}
                </Text>
              </HStack>

              <HStack>
                <Checkbox
                  colorScheme="ap"
                  onChange={() => {
                    setSemuaIzin(!semuaIzin);
                  }}
                  isChecked={semuaIzin}
                  size={"lg"}
                >
                  <Text fontWeight={500}>Beri semua izin</Text>
                </Checkbox>
              </HStack>
            </HStack>

            <Button colorScheme="ap" className="btn-ap clicky" minW={"100px"}>
              Simpan
            </Button>
          </Wrap>

          <TabelKeizinan data={data} />
        </CContainer>
      </CWrapper>
    </>
  );
}
