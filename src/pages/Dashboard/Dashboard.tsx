import { Wrap } from "@chakra-ui/react";
import DashboardTotal from "../../components/independent/DashboardTotal";
import DashboardJabatan from "../../components/independent/DashboardJabatan";
import DashboardStatusKaryawan from "../../components/independent/DashboardStatusKaryawan";
import DashboardSiapaYangLibur from "../../components/independent/DashboardSiapaYangLibur";
import DashboardPengumuman from "../../components/independent/DashboardPengumuman";
import DashboardJenisKelamin from "../../components/independent/DashboardJenisKelamin";
import CWrapper from "../../components/wrapper/CWrapper";
import { responsiveSpacing } from "../../const/sizes";

export default function Dashboard() {
  return (
    <>
      <CWrapper>
        <DashboardTotal mb={responsiveSpacing} />

        <Wrap spacing={responsiveSpacing}>
          <DashboardJenisKelamin flex={"1 1 0"} />

          <DashboardJabatan flex={"1 1 0"} />

          <DashboardStatusKaryawan flex={"1 1 0"} />

          <DashboardSiapaYangLibur flex={"1 1 0"} />

          <DashboardPengumuman flex={"1 1 0"} />
        </Wrap>
      </CWrapper>
    </>
  );
}
