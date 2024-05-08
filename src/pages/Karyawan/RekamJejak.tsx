import TopNavs from "../../components/dependent/TopNavs";
import karyawanTopNavs from "../../const/karyawanTopNavs";

export default function RekamJejak() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={4} />
    </>
  );
}
