import { Center, HStack, Icon, MenuItem, Text } from "@chakra-ui/react";
import { RiDeleteBinLine, RiEditLine, RiHistoryLine } from "@remixicon/react";
import { dummyTerPph21 } from "../../const/dummy";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import { Interface__SelectOption } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import formatNumber from "../../lib/formatNumber";
import NoData from "../independent/NoData";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import CustomTable from "./CustomTable";
import Retry from "./Retry";
import StatusDihapus from "./StatusDihapus";

interface Props {
  filterConfig?: any;
}

export default function TabelPengaturanTerPph21({ filterConfig }: Props) {
  // SX

  // Row Options Config
  const rowOptions = [
    (rowData: any) => {
      return (
        <MenuItem>
          <Text>Edit</Text>
          <Icon as={RiEditLine} fontSize={iconSize} opacity={0.4} />
        </MenuItem>
      );
    },
    (rowData: any) => {
      return (
        <MenuItem isDisabled={!rowData.columnsFormat[1].value}>
          <Text>Restore</Text>
          <Icon as={RiHistoryLine} fontSize={iconSize} opacity={0.4} />
        </MenuItem>
      );
    },
    "divider",
    (rowData: any) => {
      return (
        <MenuItem fontWeight={500} isDisabled={rowData.columnsFormat[1].value}>
          <Text color={"red.400"}>Delete</Text>
          <Icon color={"red.400"} as={RiDeleteBinLine} fontSize={iconSize} />
        </MenuItem>
      );
    },
  ];

  const { error, loading, data, retry } = useDataState<any[]>({
    initialData: dummyTerPph21,
    url: "",
    dependencies: [],
  });

  const fd = data?.filter((item: any) => {
    const searchTerm = filterConfig?.search.toLowerCase();
    const isDeletedTerm = filterConfig?.is_deleted?.map(
      (term: Interface__SelectOption) => term.value
    );

    const matchesSearchTerm = item.ptkp.kode_ptkp
      .toLowerCase()
      .includes(searchTerm);
    const matchesIsDeletedTerm =
      isDeletedTerm?.includes(1) && isDeletedTerm?.includes(0)
        ? true
        : isDeletedTerm?.includes(1)
        ? !!item.deleted_at
        : isDeletedTerm?.includes(0)
        ? !item.deleted_at
        : true;

    return matchesSearchTerm && matchesIsDeletedTerm;
  });

  const formattedHeader = [
    {
      th: "Kode PTKP",
      isSortable: true,
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
      th: "Status Dihapus",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Penghasilan Bruto Bulanan",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Persentase TER",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
  ];
  const formattedData = fd?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.ptkp.kode_ptkp,
        td: item.ptkp.kode_ptkp,
        isSortable: true,
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
        value: item.deleted_at,
        td: item.deleted_at ? <StatusDihapus data={item.deleted_at} /> : "",
        isDate: true,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.from_ter,
        td: `Rp ${formatNumber(item.from_ter)} - Rp ${formatNumber(
          item.to_ter
        )}`,
        isNumeric: true,
      },
      {
        value: item.percetage_ter,
        td: `${item.percentage_ter}%`,
        isNumeric: true,
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
              {!formattedData && <NoData minH={"400px"} />}

              {formattedData && (
                <>
                  {fd && fd?.length === 0 && <NotFound minH={"400px"} />}

                  {fd && fd?.length > 0 && (
                    <>
                      <CustomTableContainer>
                        <CustomTable
                          formattedHeader={formattedHeader}
                          formattedData={formattedData}
                          rowOptions={rowOptions}
                        />
                      </CustomTableContainer>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
