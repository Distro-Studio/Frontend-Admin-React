import { useState } from "react";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../../const/interfaces";
import Tabel from "../../Tabel";
import Skeleton from "../../../independent/Skeleton";
import TabelContainer from "../../../wrapper/TabelContainer";
import { HStack, VStack } from "@chakra-ui/react";
import { responsiveSpacing } from "../../../../const/sizes";
import { dummyKaryawanList } from "../../../../const/dummy";

interface Props {
  filterConfig?: any;
}

export default function TabelRekamJejak({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "tgl_masuk",
      label: "Tanggal Masuk",
      dataType: "date",
    },
    {
      key: "tgl_keluar",
      label: "Tanggal Keluar",
      dataType: "date",
    },
    {
      key: "masa_kerja",
      label: "Masa Kerja",
      dataType: "string",
    },
    {
      key: "promosi",
      label: "Promosi",
      dataType: "string",
    },
    {
      key: "mutasi",
      label: "Mutasi",
      dataType: "string",
    },
    {
      key: "pernghargaan",
      label: "Pengharagaan",
      dataType: "string",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  //! DEBUG

  const [data] = useState<Karyawan__Interface[] | null>(dummyKaryawanList);
  const [loading] = useState<boolean>(false);

  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);

  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  return (
    <>
      {loading && (
        <>
          <TabelContainer p={responsiveSpacing}>
            <VStack h={"100%"} align={"stretch"} gap={responsiveSpacing}>
              <Skeleton h={"52px"} />
              <Skeleton flex={1} flexShrink={0} />
            </VStack>
          </TabelContainer>

          <HStack justify={"space-between"} mt={responsiveSpacing}>
            <Skeleton h={"40px"} w={"120px"} />
            <Skeleton h={"40px"} w={"120px"} />
          </HStack>
        </>
      )}

      {!loading && data && (
        <Tabel
          columns={columns}
          data={data}
          paginationData={{
            prev_page_url: "",
            next_page_url: "",
            last_page: 1,
          }}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          limitConfig={limitConfig}
          setLimitConfig={setLimitConfig}
        />
      )}
    </>
  );
}
