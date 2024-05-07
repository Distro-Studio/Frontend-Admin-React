import { Wrap } from "@chakra-ui/react";
import DashboardTotal from "../../components/Independent/DashboardTotal";
import DashboardJenisKelamin from "../../components/Independent/DashboardJenisKelamin";
import DashboardJabatan from "../../components/Independent/DashboardJabatan";

export default function Dashboard() {
  return (
    <>
      <DashboardTotal mb={6} />

      <Wrap spacing={6}>
        <DashboardJenisKelamin />

        <DashboardJabatan />
      </Wrap>
    </>
  );
}
