import { Wrap } from "@chakra-ui/react";
import DashboardTotal from "../../components/Independent/Dashboard/DashboardTotal";
import DashboardJenisKelamin from "../../components/Independent/Dashboard/DashboardJenisKelamin";
import DashboardJabatan from "../../components/Independent/Dashboard/DashboardJabatan";
import DashboardStatusKaryawan from "../../components/Independent/Dashboard/DashboardStatusKaryawan";
import DashboardSiapaYangLibur from "../../components/Independent/Dashboard/DashboardSiapaYangLibur";
import DashboardPengumuman from "../../components/Independent/Dashboard/DashboardPengumuman";

export default function Dashboard() {
  return (
    <>
      <DashboardTotal mb={6} />

      <Wrap spacing={6}>
        <DashboardJenisKelamin flex={"1 1 0"} />

        <DashboardJabatan flex={"1 1 0"} />

        <DashboardStatusKaryawan flex={"1 1 0"} />

        <DashboardSiapaYangLibur flex={"1 1 0"} />

        <DashboardPengumuman flex={"1 1 0"} />
      </Wrap>
    </>
  );
}
