import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { RiSearchLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import FilterTabelKaryawan from "../../components/dependent/Karyawan/FilterTabelKaryawan";
import JadwalPeriodeModal from "../../components/dependent/Karyawan/JadwalPeriodeModal";
import TopNavs from "../../components/dependent/TopNavs";
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import TabelJadwal from "../../components/independent/Karyawan/TabelJadwal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import jadwalTopNavs from "../../const/jadwalTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Jadwal() {
  const periode = [
    {
      id: 1,
      label: "29 April - 5 Mei 2024",
      dates: [
        "Apr 29 2024",
        "Apr 30 2024",
        "May 1 2024",
        "May 2 2024",
        "May 3 2024",
        "May 4 2024",
        "May 5 2024",
      ],
    },
    {
      id: 2,
      label: "6 Mei - 12 Mei 2024",
      dates: [
        "May 6 2024",
        "May 7 2024",
        "May 8 2024",
        "May 9 2024",
        "May 10 2024",
        "May 11 2024",
        "May 12 2024",
      ],
    },
    {
      id: 3,
      label: "13 Mei - 19 Mei 2024",
      dates: [
        "Mon May 13 2024",
        "Tue May 14 2024",
        "Wed May 15 2024",
        "Thu May 16 2024",
        "Fri May 17 2024",
        "Sat May 18 2024",
        "Sun May 19 2024",
      ],
    },
  ];
  const [active, setActive] = useState<any | null>(periode[periode.length - 1]);

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    range_tgl: {
      start: "",
      end: "",
    },
  });
  const confirmDate = (newDate: string) => {
    setFilterConfig((ps: any) => ({ ...ps, tgl: newDate }));
  };

  return (
    <>
      <TopNavs active={0} data={jadwalTopNavs} mb={responsiveSpacing} />

      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <InputGroup flex={"1 1 200px"}>
              <InputLeftElement>
                <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
              </InputLeftElement>
              <Input
                placeholder="Pencarian"
                flex={"1 1 0"}
                onChange={(e) => {
                  setFilterConfig((ps: any) => ({
                    ...ps,
                    search: e.target.value,
                  }));
                }}
                value={filterConfig.search}
              />
            </InputGroup>

            <JadwalPeriodeModal
              data={periode}
              active={active}
              setActive={setActive}
              flex={"1 1 200px"}
            />

            <FilterTabelKaryawan
              filterConfig={filterConfig}
              setFilterConfig={setFilterConfig}
            />

            <Button
              flex={"1 1 110px"}
              variant={"outline"}
              colorScheme="ap"
              className="clicky"
              rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
            >
              Export
            </Button>

            <ImportKaryawanModal />
          </Wrap>

          <TabelJadwal filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
