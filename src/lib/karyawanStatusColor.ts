import { ValidStatusType } from "../const/types";

export default function karyawanStatusColor(status: ValidStatusType): string {
  const color = {
    Kerja: "green",
    Cuti: "yellow",
    Izin: "blue",
    Libur: "gray",
  };

  return color[status];
}
