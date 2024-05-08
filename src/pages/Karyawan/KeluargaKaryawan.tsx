import TopNavs from "../../components/dependent/TopNavs";
import karyawanTopNavs from "../../const/karyawanTopNavs";

export default function KeluargaKaryawan() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={2} />
    </>
  );
}
