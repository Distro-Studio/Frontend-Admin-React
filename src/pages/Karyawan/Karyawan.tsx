import TopNavs from "../../components/dependent/TopNavs";
import karyawanTopNavs from "../../const/karyawanTopNavs";

export default function Karyawan() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={0} />
    </>
  );
}
