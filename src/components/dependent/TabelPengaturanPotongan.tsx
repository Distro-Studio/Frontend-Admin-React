import {
  Box,
  Center,
  HStack,
  Icon,
  MenuItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { RiDeleteBinLine, RiEditLine, RiHistoryLine } from "@remixicon/react";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import NoData from "../independent/NoData";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import Retry from "./Retry";
import { Interface__SelectOption } from "../../constant/interfaces";
import { dummyPremi } from "../../const/dummy";

interface Props {
  filterConfig?: any;
}

export default function TabelPengaturanPotongan({ filterConfig }: Props) {
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
    initialData: dummyPremi,
    url: "",
    dependencies: [],
  });

  const fd = data?.filter((item: any) => {
    const searchTerm = filterConfig?.search.toLowerCase();
    const isDeletedTerm = filterConfig?.is_deleted?.map(
      (term: Interface__SelectOption) => term.value
    );
    const jabatanTerm = filterConfig?.jabatan?.map(
      (term: Interface__SelectOption) => term.value
    );

    const matchesSearchTerm = item.nama_premi
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
    const matchesJabatan =
      jabatanTerm && jabatanTerm.length > 0
        ? jabatanTerm?.includes(item.jabatan.id)
        : true;

    return matchesSearchTerm && matchesIsDeletedTerm && matchesJabatan;
  });

  const formattedHeader = [
    {
      th: "Nama Potongan",
      isSortable: true,
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
      th: "Jenis Potongan",
      isSortable: true,
    },
    {
      th: "Besaran Premi",
      isSortable: true,
    },
  ];
  const formattedData = fd?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.nama_premi,
        td: (
          <Tooltip label={item.nama_premi}>
            <Text
              maxW={"180px"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
            >
              {item.pertanyaan}
            </Text>
          </Tooltip>
        ),
        isSortable: true,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.deleted_at,
        td: item.deleted_at ? (
          <Tooltip
            openDelay={500}
            label={
              "Data yang dihapus tidak akan muncul di dafta opsi, namun akan tetap menjadi legacy data"
            }
            placement="right"
          >
            <Box>
              <BooleanBadge
                w={"120px"}
                data={item.deleted_at}
                trueValue="Dihapus"
                falseValue=""
                colorScheme={item.deleted_at ? "red" : ""}
              />
            </Box>
          </Tooltip>
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
        value: item.jenis_premi,
        td: item.jenis_premi,
        isNumeric: true,
      },
      {
        value: item.besaran_premi,
        td: item.besaran_premi,
        isNumeric: true,
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
