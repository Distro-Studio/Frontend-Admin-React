import { Wrap } from "@chakra-ui/react";
import DashboardTotal from "../../components/independent/Dashboard/DashboardTotal";
import DashboardJabatan from "../../components/independent/Dashboard/DashboardJabatan";
import DashboardStatusKaryawan from "../../components/independent/Dashboard/DashboardStatusKaryawan";
import DashboardSiapaYangLibur from "../../components/independent/Dashboard/DashboardSiapaYangLibur";
import DashboardPengumuman from "../../components/independent/Dashboard/DashboardPengumuman";
import DashboardJenisKelamin from "../../components/independent/Dashboard/DashboardJenisKelamin";
import CWrapper from "../../components/wrapper/CWrapper";
import { itemSpacing } from "../../const/sizes";

export default function Dashboard() {
  return (
    <>
      <CWrapper>
        <DashboardTotal mb={6} />
      </CWrapper>

      <CWrapper>
        <Wrap spacing={itemSpacing}>
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
