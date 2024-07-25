import { Box, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { dummyKelolaRole } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import CustomTable from "./CustomTable";
import Retry from "./Retry";
import TabelFooterConfig from "./TabelFooterConfig";
import DetailKelolaRoleModal from "./DetailKelolaRoleModal";

interface Props {
  filterConfig?: any;
}

export default function TabelPengaturanKelolaRole({ filterConfig }: Props) {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Disclosure Config
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { error, loading, data, retry } = useDataState<any[]>({
    initialData: dummyKelolaRole,
    url: "",
    limit: limitConfig,
    dependencies: [limitConfig, pageConfig],
  });

  const formattedHeader = [
    {
      th: "Nama Role",
      isSortable: true,
      props: {
        position: "sticky",
        left: 0,
        zIndex: 3,
        w: "180px",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    {
      th: "Deskripsi",
      isSortable: true,
    },
  ];
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.name,
        td: item.name,
        props: {
          position: "sticky",
          left: 0,
          zIndex: 2,
        },
        cProps: {
          borderRight: "1px solid var(--divider3)",
        },
      },
      {
        value: item.deskripsi,
        td: item.deskripsi,
      },
    ],
  }));

  return (
    <>
      {error && (
        <Box my={"auto"}>
          <Retry loading={loading} retry={retry} />
        </Box>
      )}
      {!error && (
        <>
          {loading && (
            <>
              <Skeleton flex={1} mx={"auto"} />
              <HStack justify={"space-between"} mt={responsiveSpacing}>
                <Skeleton maxW={"120px"} />
                <Skeleton maxW={"300px"} h={"20px"} />
                <Skeleton maxW={"112px"} />
              </HStack>
            </>
          )}
          {!loading && (
            <>
              {!formattedData && <NoData />}

              {formattedData && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      onRowClick={onOpen}
                    />
                  </CustomTableContainer>

                  <TabelFooterConfig
                    limitConfig={limitConfig}
                    setLimitConfig={setLimitConfig}
                    pageConfig={pageConfig}
                    setPageConfig={setPageConfig}
                    paginationData={{
                      prev_page_url: "",
                      next_page_url: "",
                      last_page: 1,
                    }}
                    footer={
                      <Text opacity={0.4}>
                        Klik row untuk melihat detail role
                      </Text>
                    }
                  />

                  <DetailKelolaRoleModal
                    role_id={1}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
