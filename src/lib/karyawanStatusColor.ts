import { Valid__Status__Type } from "../const/types";

export default function karyawanStatusColor(
  status: Valid__Status__Type
): string {
  const color = {
    Kerja: "green",
    Cuti: "yellow",
    Izin: "blue",
    Libur: "gray",
  };

  return color[status];
}
