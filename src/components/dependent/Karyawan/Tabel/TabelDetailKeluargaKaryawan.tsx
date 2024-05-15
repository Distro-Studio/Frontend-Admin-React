import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Tabel__Column__Interface } from "../../../../const/interfaces";
import { responsiveSpacing } from "../../../../const/sizes";
import Skeleton from "../../../independent/Skeleton";
import TabelContainer from "../../../wrapper/TabelContainer";
import Tabel from "../../Tabel";

interface Props {
  data: any;
  filterConfig?: any;
}

export default function TabelDetailKeluargaKaryawan({
  data,
  filterConfig,
}: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "hubungan",
      label: "Status Hubungan",
      dataType: "string",
    },
    {
      key: "nama",
      label: "Nama",
      dataType: "string",
    },
    {
      key: "pendidikan_terakhir",
      label: "Pendidikan Terakhir",
      dataType: "string",
    },
    {
      key: "pekerjaan",
      label: "Pekerjaan",
      dataType: "string",
    },
    {
      key: "status_hidup",
      label: "Status Hidup",
      dataType: "badge",
    },
    {
      key: "no_hp",
      label: "No. Telepon",
      dataType: "string",
    },
    {
      key: "email",
      label: "Email",
      dataType: "string",
    },
  ];

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
          flexGrow={0}
          h={"fit-content"}
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
