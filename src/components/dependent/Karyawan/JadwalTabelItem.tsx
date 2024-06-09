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
  ModalCloseButton,
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
import { responsiveSpacing } from "../../../const/sizes";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import formatTime from "../../../lib/formatTime";
import useBackOnClose from "../../../lib/useBackOnClose";
import DeletePermanentWarning from "../../alert/DeletePermanentWarning";
import FormRequired from "../../form/FormRequired";
import SelectShift from "../_Select/SelectShift";
import JenisKaryawanBadge from "../JenisKaryawanBadge";

interface Props {
  data: any;
  tgl: Date | string;
  jadwal: any;
}

export default function TabelJadwalItem({ data, tgl, jadwal }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { shift: { value: jadwal.id, label: jadwal.label } },
    validationSchema: yup
      .object()
      .shape({ shift: yup.object().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoadingUpdate(true);
      //TODO api update pengumuman
    },
  });

  function deleteJadwal() {
    setLoadingDelete(true);

    //TODO api delete pengumuman
  }

  return (
    <>
      <VStack
        p={3}
        gap={1}
        borderRadius={8}
        w={"100%"}
        h={"70px"}
        align={"stretch"}
        className="btn-solid clicky"
        cursor={"pointer"}
        onClick={onOpen}
      >
        <HStack justify={"space-between"}>
          <Box>
            <Text noOfLines={1} mb={1} fontSize={14} fontWeight={500}>
              {jadwal.label}
            </Text>
            <Text fontWeight={500} fontSize={14} whiteSpace={"nowrap"}>
              {formatTime(jadwal.jam_masuk)} - {formatTime(jadwal.jam_keluar)}
            </Text>
          </Box>

          {data.unit_kerja.jenis_karyawan === 1 && (
            <Icon
              as={RiEditBoxLine}
              fontSize={20}
              alignSelf={"flex-start"}
              color={"p.500"}
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
          <ModalCloseButton />
          <ModalHeader>Detail Jadwal</ModalHeader>
          <ModalBody>
            {!isDeleting && (
              <>
                <VStack gap={responsiveSpacing} px={1} flexShrink={0} mb={4}>
                  <Avatar
                    mb={"auto"}
                    size={"xl"}
                    src={data.foto_profil}
                    name={data.nama}
                  />

                  <VStack align={"stretch"} w={"100%"} gap={3}>
                    <HStack justify={"space-between"}>
                      <Text fontSize={14} w={"120px"} opacity={0.6}>
                        Nama
                      </Text>
                      <Text textAlign={"right"} fontWeight={500}>
                        {data.nama}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text fontSize={14} w={"120px"} opacity={0.6}>
                        Tanggal
                      </Text>
                      <Text textAlign={"right"}>
                        {formatDate(tgl as string)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text fontSize={14} w={"120px"} opacity={0.6}>
                        Jenis Karyawan
                      </Text>
                      <JenisKaryawanBadge
                        data={data.unit_kerja.jenis_karyawan}
                      />
                    </HStack>
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
                        <FormRequired />
                      </FormLabel>
                      <SelectShift
                        formik={formik}
                        name="shift"
                        placeholder="Pilih shift"
                        initialSelected={formik.values.shift}
                        noUseBackOnClose
                      />
                      <FormErrorMessage>
                        {formik.errors.shift as string}
                      </FormErrorMessage>
                    </FormControl>
                  </form>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter pt={isDeleting ? "0 !important" : 6}>
            {data.unit_kerja.jenis_karyawan === 1 && !isDeleting && (
              <ButtonGroup w={"100%"}>
                <Button
                  w={"100%"}
                  className="clicky"
                  colorScheme="red"
                  variant={"ghost"}
                  onClick={() => {
                    setIsDeleting(true);
                  }}
                  isDisabled={loadingUpdate}
                  bg={"var(--reda)"}
                  _hover={{ bg: "var(--reda)" }}
                >
                  Hapus
                </Button>
                <Button
                  w={"100%"}
                  type="submit"
                  form="terapkanJadwalKaryawanTerpilihForm"
                  colorScheme="ap"
                  className="btn-ap clicky"
                  isLoading={loadingUpdate}
                >
                  Simpan
                </Button>
              </ButtonGroup>
            )}

            {data.unit_kerja.jenis_karyawan === 0 && !isDeleting && (
              <Button
                w={"100%"}
                className="btn-ap clicky"
                colorScheme="ap"
                onClick={() => {
                  backOnClose(onClose);
                  formik.resetForm();
                }}
              >
                Mengerti
              </Button>
            )}

            {isDeleting && (
              <VStack w={"100%"} align={"stretch"}>
                <Text textAlign={"center"}>
                  Apakah anda yakin menghapus jadwal untuk karyawan ini?
                </Text>

                <DeletePermanentWarning mb={2} mt={4} />

                <ButtonGroup w={"100%"}>
                  <Button
                    w={"50%"}
                    className="clicky"
                    colorScheme="red"
                    onClick={() => {
                      setIsDeleting(false);
                    }}
                    isDisabled={loadingDelete}
                  >
                    Tidak
                  </Button>
                  <Button
                    w={"50%"}
                    className="clicky"
                    variant={"ghost"}
                    colorScheme="red"
                    bg={"var(--reda)"}
                    _hover={{ bg: "var(--reda)" }}
                    isLoading={loadingDelete}
                    onClick={deleteJadwal}
                  >
                    Ya
                  </Button>
                </ButtonGroup>
              </VStack>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
