import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiEditBoxLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as yup from "yup";
import { responsiveSpacing } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnCloseOld";
import formatDate from "../../lib/formatDate";
import formatTime from "../../lib/formatTime";
import isDatePassed from "../../lib/isDatePassed";
import RequiredForm from "../form/RequiredForm";
import SelectShift from "./_Select/SelectShift";
import DeleteJadwalModal from "./DeleteJadwalModal";
import DisclosureHeader from "./DisclosureHeader";
import JenisKaryawanBadge from "./JenisKaryawanBadge";

interface Props {
  data: any;
  tgl: Date | string;
  jadwal: any;
  index: number;
}

export default function TabelJadwalItem({ data, tgl, jadwal, index }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    `jadwal-detail-${data.id}-${formatDate(tgl)}-${index}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      shift: {
        value: jadwal.id,
        label: jadwal.label,
        label2: `${formatTime(jadwal.jam_masuk)}-${formatTime(
          jadwal.jam_keluar
        )}`,
      },
    },
    validationSchema: yup
      .object()
      .shape({ shift: yup.object().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoadingUpdate(true);
      //TODO api update pengumuman
    },
  });

  return (
    <>
      <VStack
        p={3}
        gap={1}
        borderRadius={8}
        w={"100%"}
        minH={"74px"}
        align={"stretch"}
        justify={"center"}
        className="btn-solid clicky"
        cursor={"pointer"}
        onClick={onOpen}
      >
        <HStack justify={"space-between"} flex={1}>
          <Box>
            <Text noOfLines={1} mb={1} fontSize={14}>
              {jadwal.label}
            </Text>
            <Text fontSize={14} whiteSpace={"nowrap"}>
              {formatTime(jadwal.jam_masuk)} - {formatTime(jadwal.jam_keluar)}
            </Text>
          </Box>

          {data.unit_kerja.jenis_karyawan === 1 && (
            <Icon
              as={RiEditBoxLine}
              fontSize={20}
              alignSelf={"flex-start"}
              color={"p.500"}
              mb={"auto"}
            />
          )}
        </HStack>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
          formik.resetForm();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent ref={initialRef}>
          <ModalHeader>
            <DisclosureHeader title="Detail Jadwal" />
          </ModalHeader>
          <ModalBody>
            <VStack gap={responsiveSpacing} px={1} flexShrink={0}>
              <Avatar
                mb={"auto"}
                size={"xl"}
                src={data.user.foto_profil}
                name={data.user.nama}
              />

              <VStack align={"stretch"} w={"100%"} gap={3}>
                <HStack justify={"space-between"}>
                  <Text fontSize={14} w={"120px"} opacity={0.6}>
                    Nama
                  </Text>
                  <Text textAlign={"right"} fontWeight={500}>
                    {data.user.nama}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text fontSize={14} w={"120px"} opacity={0.6}>
                    Tanggal
                  </Text>
                  <Text textAlign={"right"}>{formatDate(tgl as string)}</Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text fontSize={14} w={"120px"} opacity={0.6}>
                    Jenis Karyawan
                  </Text>
                  <JenisKaryawanBadge data={data.unit_kerja.jenis_karyawan} />
                </HStack>

                {data.unit_kerja.jenis_karyawan === 0 && (
                  <HStack justify={"space-between"}>
                    <Text fontSize={14} w={"120px"} opacity={0.6}>
                      Jam Kerja
                    </Text>
                    <Text>{`${formatTime(jadwal.jam_masuk)} - ${formatTime(
                      jadwal.jam_keluar
                    )}`}</Text>
                  </HStack>
                )}
              </VStack>
            </VStack>

            {data.unit_kerja.jenis_karyawan === 1 && (
              <form
                id="terapkanJadwalKaryawanTerpilihForm"
                onSubmit={formik.handleSubmit}
              >
                <FormControl mt={6} isInvalid={!!formik.errors.shift}>
                  <FormLabel>
                    Shift
                    <RequiredForm />
                  </FormLabel>
                  <SelectShift
                    name="shift"
                    placeholder="Pilih Jadwal"
                    onConfirm={(input) => {
                      formik.setFieldValue("shift", input);
                    }}
                    inputValue={formik.values.shift}
                  />
                  <FormErrorMessage>
                    {formik.errors.shift as string}
                  </FormErrorMessage>
                </FormControl>
              </form>
            )}
          </ModalBody>
          <ModalFooter pt={6}>
            {data.unit_kerja.jenis_karyawan === 1 && (
              <ButtonGroup w={"100%"}>
                <DeleteJadwalModal
                  data={data}
                  isDisabled={isDatePassed(data.tgl_masuk)}
                  noUseBackOnClose
                />

                <Button
                  w={"100%"}
                  type="submit"
                  form="terapkanJadwalKaryawanTerpilihForm"
                  colorScheme="ap"
                  className="btn-ap clicky"
                  isLoading={loadingUpdate}
                  isDisabled={isDatePassed(data.tgl_masuk)}
                >
                  Simpan
                </Button>
              </ButtonGroup>
            )}

            {data.unit_kerja.jenis_karyawan === 0 && (
              <Button
                w={"100%"}
                className="btn-solid clicky"
                onClick={() => {
                  backOnClose(onClose);
                  formik.resetForm();
                }}
              >
                Mengerti
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
