import TopNavs from "../../components/dependent/TopNavs";
import karyawanTopNavs from "../../const/karyawanTopNavs";

export default function TransferKaryawan() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={5} />
    </>
  );
}
