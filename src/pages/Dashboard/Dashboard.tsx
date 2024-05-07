import { Wrap } from "@chakra-ui/react";
import DashboardTotal from "../../components/Independent/DashboardTotal";
import DashboardJenisKelamin from "../../components/Independent/DashboardJenisKelamin";
import DashboardJabatan from "../../components/Independent/DashboardJabatan";
import DashboardStatusKaryawan from "../../components/Independent/DashboardStatusKaryawan";

export default function Dashboard() {
  return (
    <>
      <DashboardTotal mb={6} />

      <Wrap spacing={6}>
        <DashboardJenisKelamin flex={"1 1 0"} />

        <DashboardJabatan />

        <DashboardStatusKaryawan flex={"1 1 0"} />
      </Wrap>
    </>
  );
}
