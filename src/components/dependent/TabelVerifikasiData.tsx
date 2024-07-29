import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { dummyTransferKaryawan } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import CustomTable from "./CustomTable";
import Retry from "./Retry";
import TabelFooterConfig from "./TabelFooterConfig";
import BooleanBadge from "./BooleanBadge";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "./DisclosureHeader";
import useBackOnClose from "../../hooks/useBackOnClose";

interface DataDetailProps {
  data: any;
}

const DataDetail = ({ data }: DataDetailProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("detail-data-verif-modal", isOpen, onOpen, onClose);

  return (
    <>
      <Button colorScheme="ap" variant={"ghost"} onClick={onOpen}>
        Lihat
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Detail Data"} />
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function TabelVerifikasiData() {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Filter Config
  const { filterKaryawan } = useFilterKaryawan();

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyTransferKaryawan,
    url: "",
    payload: filterKaryawan,
    dependencies: [],
  });

  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
      props: {
        position: "sticky",
        left: 0,
        zIndex: 99,
        w: "180px",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    {
      th: "Status Verifikasi",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Data",
      cProps: {
        justify: "center",
      },
    },
  ];
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.user.nama,
        td: (
          <AvatarAndNameTableData
            data={{
              id: item.user.id,
              nama: item.user.nama,
              foto_profil: item.user.foto_profil,
            }}
          />
        ),
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
        value: item.status_verifikasi,
        td: (
          <BooleanBadge
            w={"150px"}
            data={item.status_verifikasi}
            trueValue="Diverifikasi"
            falseValue="Verifikasi Ditolak"
            nullValue="Menunggu"
          />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.data,
        td: <DataDetail data={item.data} />,
        cProps: {
          justify: "center",
        },
      },
    ],
  }));

  return (
    <>
      {error && (
        <Center my={"auto"} minH={"400px"}>
          <Retry loading={loading} retry={retry} />
        </Center>
      )}
      {!error && (
        <>
          {loading && (
            <>
              <Skeleton minH={"300px"} flex={1} mx={"auto"} />
              <HStack justify={"space-between"} mt={responsiveSpacing}>
                <Skeleton maxW={"120px"} />
                <Skeleton maxW={"300px"} h={"20px"} />
                <Skeleton maxW={"112px"} />
              </HStack>
            </>
          )}
          {!loading && (
            <>
              {(!data || (data && data.length === 0)) && (
                <NoData minH={"400px"} />
              )}

              {(data || (data && data.length > 0)) && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      // onRowClick={() => {
                      //   onOpen();
                      // }}
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
                    // footer={
                    //   <Text opacity={0.4}>
                    //     Klik row untuk melihat detail karyawan
                    //   </Text>
                    // }
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
