import React from "react";
import TopNavs from "../../components/dependent/TopNavs";
import karyawanTopNavs from "../../const/karyawanTopNavs";

export default function AkunKaryawan() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={1} />
    </>
  );
}
