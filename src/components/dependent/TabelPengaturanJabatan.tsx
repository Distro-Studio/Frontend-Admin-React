import { Center, HStack, Icon, MenuItem, Text } from "@chakra-ui/react";
import { RiDeleteBinLine, RiEditLine, RiHistoryLine } from "@remixicon/react";
import { dummyJabatan } from "../../const/dummy";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import NoData from "../independent/NoData";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import Retry from "./Retry";

interface Props {
  filterConfig?: any;
}

export default function TabelPengaturanJabatan({ filterConfig }: Props) {
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
        <MenuItem fontWeight={500}>
          <Text color={"red.400"}>Delete</Text>
          <Icon color={"red.400"} as={RiDeleteBinLine} fontSize={iconSize} />
        </MenuItem>
      );
    },
  ];

  const { error, loading, data, retry } = useDataState<any[]>({
    initialData: dummyJabatan,
    url: "",
    dependencies: [],
  });

  const fd = data?.filter((item: any) => {
    const searchTerm = filterConfig.search.toLowerCase();

    const matchesSearchTerm = item.nama_jabatan
      .toLowerCase()
      .includes(searchTerm);

    return matchesSearchTerm;
  });

  const formattedHeader = [
    {
      th: "Nama Jabatan",
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
      th: "Status Dihapus",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Tanggal Dihapus",
      isSortable: true,
    },
    {
      th: "Besaran Tunjangan",
      isSortable: true,
      cProps: {
        justify: "end",
      },
    },
  ];
  const formattedData = fd?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.nama_jabatan,
        td: item.nama_jabatan,
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
        td: item.deleted_at ? (
          <BooleanBadge
            w={"120px"}
            data={item.deleted_at}
            trueValue="Dihapus"
            falseValue=""
            colorScheme={item.deleted_at ? "red" : ""}
          />
        ) : (
          ""
        ),
        isDate: true,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.deleted_at,
        td: item.deleted_at ? formatDate(item.deleted_at) : "",
        isDate: true,
      },
      {
        value: item.tunjangan,
        td: `Rp ${formatNumber(item.tunjangan)}`,
        isNumeric: true,
        cProps: {
          justify: "end",
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
