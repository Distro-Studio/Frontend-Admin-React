import { HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { Dispatch } from "react";
import DataNotFound from "../../independent/DataNotFound";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";

interface Props {
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterMasaKerja({
  filterConfig,
  setFilterConfig,
}: Props) {
  // const [search, setSearch] = useState<string>("");

  //TODO get list unit kerja

  const dummy = [
    {
      id: 1,
      masa_kerja: 2,
      jenis_karyawan: 0,
      created_at: "2023-08-06T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 2,
      masa_kerja: 12,
      jenis_karyawan: 1,
      created_at: "2024-04-04T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 3,
      masa_kerja: 4,
      jenis_karyawan: 0,
      created_at: "2023-07-08T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
  ];

  // const filteredList = dummy.filter((data) =>
  //   data.masa_kerja.toString().toLowerCase().includes(search.toLowerCase())
  // );

  // SX

  return (
    <FilterItemWrapper
      title="Masa Kerja"
      filterValue={filterConfig.masa_kerja}
      setFilterConfig={setFilterConfig}
      filterKey="masa_kerja"
    >
      {/* <InputGroup position={"sticky"} top={0} bg={useBodyColor()} zIndex={2}>
        <InputLeftElement>
          <Icon as={RiSearch2Line} fontSize={iconSize} color={"p.500"} />
        </InputLeftElement>

        <Input
          name="search"
          placeholder="Pencarian"
          border={"0 !important"}
          borderBottom={"1px solid var(--divider) !important"}
          borderRadius={"0 !important"}
          _focus={{
            border: "0 !important",
            borderBottom: "1px solid var(--p500) !important",
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </InputGroup> */}

      <VStack align={"stretch"} gap={0}>
        {dummy?.length === 0 && <DataNotFound mt={4} />}

        <Wrap py={4} w={"100%"}>
          {dummy?.map((data, i) => {
            const active =
              filterConfig?.masa_kerja &&
              filterConfig?.masa_kerja.some((unit: any) => unit.id === data.id);

            return (
              <HStack
                key={i}
                borderRadius={"full"}
                className="btn-outline"
                fontWeight={400}
                opacity={active ? 1 : 0.6}
                bg={active && `var(--p500a2) !important`}
                borderColor={active && "p.500"}
                flexShrink={0}
                h={"40px"}
                maxW={"100%"}
                px={4}
                cursor={"pointer"}
                onClick={() => {
                  setFilterConfig((ps: any) => {
                    // Mengecek apakah data sudah ada dalam masa_kerja
                    const isDataExist =
                      ps.masa_kerja &&
                      ps.masa_kerja.some((unit: any) => unit.id === data.id);

                    // Jika data sudah ada, maka hapus data dari masa_kerja
                    if (isDataExist) {
                      return {
                        ...ps,
                        masa_kerja: ps.masa_kerja.filter(
                          (unit: any) => unit.id !== data.id
                        ),
                      };
                    } else {
                      // Jika data belum ada, maka tambahkan data ke masa_kerja
                      return {
                        ...ps,
                        masa_kerja: ps.masa_kerja
                          ? [...ps.masa_kerja, data]
                          : [data],
                      };
                    }
                  });
                }}
              >
                <Text
                  lineHeight={1.3}
                  w={"100%"}
                  h={"20px !important"}
                  noOfLines={1}
                >
                  {data.masa_kerja} Bulan
                </Text>
              </HStack>
            );
          })}
        </Wrap>
      </VStack>
    </FilterItemWrapper>
  );
}
