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
  const dummy = {
    User: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    "Data Karyawan": {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    Role: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    Permission: {
      view: null,
      create: true,
      edit: true,
      delete: true,
      import: null,
      export: null,
      reset: null,
    },
    "Unit Kerja": {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    Jabatan: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    Kompetensi: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    "Kelompok Gaji": {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    Premi: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    TER21: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    "Jadwal Penggajian": {
      view: null,
      create: true,
      edit: null,
      delete: null,
      import: null,
      export: null,
      reset: true,
    },
    THR: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: null,
      export: null,
      reset: null,
    },
    Shift: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    "Hari Libur": {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
    Cuti: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      import: true,
      export: true,
      reset: null,
    },
  };
  //! DEBUG
  const [data] = useState<any | null>(dummy);
  const [semuaIzin, setSemuaIzin] = useState<boolean | null>(null);
  const [loading] = useState<boolean>(false);
  const [simpanLoading, setSimpanLoading] = useState<boolean>(false);
  const [simpanTrigger, setSimpanTrigger] = useState<boolean | null>(null);

  const dataToArray = Object.keys(data).map((key) => ({
    group: key,
    permissions: data[key],
  }));

  const checkAllPermissionsTrue = (permissionsArray: any) => {
    return permissionsArray.every((item: any) => {
      return Object.values(item.permissions).every(
        (permission) => permission === null || permission === true
      );
    });
  };

  useEffect(() => {
    //TODO get permission by role id
    console.log(role_id);

    if (checkAllPermissionsTrue(dataToArray)) {
      setSemuaIzin(true);
    }
  }, [role_id]);

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
                  isChecked={semuaIzin ? true : false}
                  size={"lg"}
                >
                  <Text fontWeight={500}>Semua izin</Text>
                </Checkbox>
              </HStack>
            </HStack>

            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              minW={"120px"}
              isLoading={simpanLoading}
              onClick={() => {
                setSimpanTrigger(!simpanTrigger);
              }}
            >
              Simpan
            </Button>
          </Wrap>

          <TabelKeizinan
            data={dataToArray}
            loading={loading}
            semuaIzin={semuaIzin}
            simpanTrigger={simpanTrigger}
            setSimpanLoading={setSimpanLoading}
          />
        </CContainer>
      </CWrapper>
    </>
  );
}
