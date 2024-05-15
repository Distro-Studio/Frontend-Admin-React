import { HStack, Icon, VStack } from "@chakra-ui/react";
import { RiArrowRightSLine } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../../const/interfaces";
import { iconSize, responsiveSpacing } from "../../../../const/sizes";
import Skeleton from "../../../independent/Skeleton";
import TabelContainer from "../../../wrapper/TabelContainer";
import Tabel from "../../Tabel";
import { dummyKaryawanList } from "../../../../const/dummy";

interface Props {
  filterConfig?: any;
}

export default function TabelKeluargaKaryawan({ filterConfig }: Props) {
  const navigate = useNavigate();
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "ayah",
      label: "Ayah",
      dataType: "string",
    },
    {
      key: "ibu",
      label: "Ibu",
      dataType: "string",
    },
    {
      key: "jumlah_keluarga",
      label: "Jumlah Keluarga",
      dataType: "number",
      thProps: { w: "200px" },
      preferredTextAlign: "center",
    },
    {
      key: "",
      label: "Detail",
      actionLabel: "Detail",
      dataType: "action",
      action: (id: number) => {
        navigate(`/karyawan/keluarga-karyawan/${id}`);
      },
      actionButtonProps: {
        colorScheme: "ap",
        className: "btn-ap clicky",
        rightIcon: <Icon as={RiArrowRightSLine} fontSize={iconSize} />,
        pr: 3,
      },
      thProps: { w: "100px" },
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  //! DEBUG

  const [data] = useState<Karyawan__Interface[] | null>(dummyKaryawanList);
  const [loading] = useState<boolean>(false);

  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);

  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  return (
    <>
      {loading && (
        <>
          <TabelContainer p={responsiveSpacing}>
            <VStack h={"100%"} align={"stretch"} gap={responsiveSpacing}>
              <Skeleton h={"52px"} />
              <Skeleton flex={1} flexShrink={0} />
            </VStack>
          </TabelContainer>

          <HStack justify={"space-between"} mt={responsiveSpacing}>
            <Skeleton h={"40px"} w={"120px"} />
            <Skeleton h={"40px"} w={"120px"} />
          </HStack>
        </>
      )}

      {!loading && data && (
        <Tabel
          columns={columns}
          data={data}
          paginationData={{
            prev_page_url: "",
            next_page_url: "",
            last_page: 1,
          }}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          limitConfig={limitConfig}
          setLimitConfig={setLimitConfig}
          noMore
          noCheckList
        />
      )}
    </>
  );
}
