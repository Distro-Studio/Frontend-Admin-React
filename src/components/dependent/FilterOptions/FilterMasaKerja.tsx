import {
  Box,
  Center,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch } from "react";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";

interface Props {
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterMasaKerja({
  filterConfig,
  setFilterConfig,
}: Props) {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  // SX

  return (
    <FilterItemWrapper
      title="Masa Kerja"
      filterValue={filterConfig.masa_kerja}
      setFilterConfig={setFilterConfig}
      filterKey="masa_kerja"
    >
      <VStack align={"stretch"} gap={0} overflow={"clip"}>
        <Center>
          <Text fontSize={18} fontWeight={500}>
            {filterConfig.masa_kerja[0] || 0} Tahun
          </Text>
        </Center>

        <Box p={4} mb={4}>
          <Slider
            colorScheme="ap"
            aria-label="slider-ex-6"
            onChange={(val) => {
              const newValue = Math.round((val * 6) / 10);
              if (newValue > 0) {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  masa_kerja: [newValue],
                }));
              } else {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  masa_kerja: [],
                }));
              }
            }}
            value={(filterConfig.masa_kerja[0] * 10) / 6 || 0}
          >
            <SliderMark value={25} {...labelStyles}>
              15
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              30
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              45
            </SliderMark>

            <SliderTrack bg={"var(--divider2)"}>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb bg={"p.600"} />
          </Slider>
        </Box>
        {/* <Stack flexDir={["column", "row"]} py={4} px={2} w={"100%"}>
          <FormControl flex={"1 1 100px"}>
            <FormLabel>Min. Tahun</FormLabel>
            <Input
              placeholder="Minimal (tahun)"
              onChange={(e) => {
                const newValue = parseNumber(e.target.value);
                setFilterConfig((ps: any) => {
                  if (newValue < 1) {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        tahun: {
                          ...ps.masa_kerja.tahun,
                          min: null,
                        },
                      },
                    };
                  } else {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        tahun: {
                          ...ps.masa_kerja.tahun,
                          min: newValue, // Menggunakan nilai newValue dari input
                        },
                      },
                    };
                  }
                });
              }}
              value={
                filterConfig.masa_kerja.tahun.min
                  ? formatNumber(filterConfig.masa_kerja.tahun.min)
                  : ""
              }
            />
          </FormControl>

          <FormControl flex={"1 1 100px"}>
            <FormLabel>Max. Tahun</FormLabel>
            <Input
              placeholder="Maximal (tahun)"
              onChange={(e) => {
                const newValue = parseNumber(e.target.value);
                setFilterConfig((ps: any) => {
                  if (newValue < 1) {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        tahun: {
                          ...ps.masa_kerja.tahun,
                          max: null,
                        },
                      },
                    };
                  } else {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        tahun: {
                          ...ps.masa_kerja.tahun,
                          max: newValue, // Menggunakan nilai newValue dari input
                        },
                      },
                    };
                  }
                });
              }}
              value={
                filterConfig.masa_kerja.tahun.max
                  ? formatNumber(filterConfig.masa_kerja.tahun.max)
                  : ""
              }
            />
          </FormControl>
        </Stack>

        <Stack flexDir={["column", "row"]} py={4} px={2} w={"100%"}>
          <FormControl flex={"1 1 100px"}>
            <FormLabel>Min. Bulan</FormLabel>
            <Input
              placeholder="Minimal (bulan)"
              onChange={(e) => {
                const newValue = parseNumber(e.target.value);
                setFilterConfig((ps: any) => {
                  if (newValue < 1) {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        bulan: {
                          ...ps.masa_kerja.bulan,
                          min: null,
                        },
                      },
                    };
                  } else {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        bulan: {
                          ...ps.masa_kerja.bulan,
                          min: newValue, // Menggunakan nilai newValue dari input
                        },
                      },
                    };
                  }
                });
              }}
              value={
                filterConfig.masa_kerja.bulan.min
                  ? formatNumber(filterConfig.masa_kerja.bulan.min)
                  : ""
              }
            />
          </FormControl>

          <FormControl flex={"1 1 100px"}>
            <FormLabel>Max. Bulan</FormLabel>
            <Input
              placeholder="Maximal (bulan)"
              onChange={(e) => {
                const newValue = parseNumber(e.target.value);
                setFilterConfig((ps: any) => {
                  if (newValue < 1) {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        bulan: {
                          ...ps.masa_kerja.bulan,
                          max: null,
                        },
                      },
                    };
                  } else {
                    return {
                      ...ps,
                      masa_kerja: {
                        ...ps.masa_kerja,
                        bulan: {
                          ...ps.masa_kerja.bulan,
                          max: newValue, // Menggunakan nilai newValue dari input
                        },
                      },
                    };
                  }
                });
              }}
              value={
                filterConfig.masa_kerja.bulan.max
                  ? formatNumber(filterConfig.masa_kerja.bulan.max)
                  : ""
              }
            />
          </FormControl>
        </Stack> */}
      </VStack>
    </FilterItemWrapper>
  );
}
