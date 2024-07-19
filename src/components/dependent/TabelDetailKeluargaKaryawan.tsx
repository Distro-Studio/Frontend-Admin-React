import { Interface__AnggotaKeluarga } from "../../const/interfaces";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";

interface Props {
  data: Interface__AnggotaKeluarga[];
}

export default function TabelDetailKeluargaKaryawan({ data }: Props) {
  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
    },
    {
      th: "Status Hubungan",
      isSortable: true,
    },
    {
      th: "Pendidikan Terakhir",
      isSortable: true,
    },
    {
      th: "Pekerjaan",
      isSortable: true,
    },
    {
      th: "Status Hidup",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "No. Telepon",
      isSortable: true,
    },
    {
      th: "Email",
      isSortable: true,
    },
  ];

  const formattedData = data.map((anggota) => ({
    id: anggota.id,
    rows: [
      {
        value: anggota.nama,
        td: anggota.nama,
      },
      {
        value: anggota.nama,
        td: anggota.nama,
      },
      {
        value: anggota.pendidikan_terakhir,
        td: anggota.pendidikan_terakhir,
      },
      {
        value: anggota.pekerjaan,
        td: anggota.pekerjaan,
      },
      {
        value: anggota.status_hidup,
        td: (
          <BooleanBadge
            data={anggota.status_hidup}
            trueValue="Hidup"
            falseValue="Meninggal"
            w={"120px"}
          />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: anggota.no_hp,
        td: anggota.no_hp,
      },
      {
        value: anggota.email,
        td: anggota.email,
      },
    ],
  }));

  return (
    <CustomTableContainer>
      <CustomTable
        formattedHeader={formattedHeader}
        formattedData={formattedData}
      />
    </CustomTableContainer>
  );
}
