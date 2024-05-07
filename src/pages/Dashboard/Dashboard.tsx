import { Wrap } from "@chakra-ui/react";
import DashboardTotal from "../../components/Independent/DashboardTotal";
import DashboardJenisKelamin from "../../components/Independent/DashboardJenisKelamin";

export default function Dashboard() {
  return (
    <>
      <DashboardTotal mb={6} />

      <Wrap>
        <DashboardJenisKelamin />
      </Wrap>
    </>
  );
}
