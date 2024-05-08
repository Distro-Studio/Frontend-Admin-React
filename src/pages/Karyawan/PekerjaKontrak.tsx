import TopNavs from "../../components/dependent/TopNavs";
import karyawanTopNavs from "../../const/karyawanTopNavs";

export default function PekerjaKontrak() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={3} />
    </>
  );
}
