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

export default function TabelTransferKarywan({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "no_induk_karyawan",
      label: "No. Induk Karyawan",
      dataType: "string",
    },
    {
      key: "tgl",
      label: "Tanggal",
      dataType: "date",
    },
    {
      key: "tipe",
      label: "Tipe",
      dataType: "string",
    },
    {
      key: "unit_kerja",
      label: "Unit Kerja",
      dataType: "string",
    },
    {
      key: "jabatan",
      label: "Jabatan",
      dataType: "string",
    },
    {
      key: "status_karyawan",
      label: "Pengharagaan",
      dataType: "badge",
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
