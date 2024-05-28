import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as yup from "yup";
import formatTime from "../../../const/formatTime";
import { responsiveSpacing } from "../../../const/sizes";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import useBackOnClose from "../../../lib/useBackOnClose";
import DeletePermanentWarning from "../../alert/DeletePermanentWarning";
import FormRequired from "../../form/FormRequired";
import SelectShift from "../Jadwal/SelectShift";

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
    initialValues: { shift: data.shift },
    validationSchema: yup
      .object()
      .shape({ shift: yup.string().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  function updateJadwal() {
    setLoadingUpdate(true);

    //TODO api update pengumuman
  }

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
        w={"180px"}
        h={"70px"}
        align={"stretch"}
        className="btn-apa clicky"
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Box>
          <Text noOfLines={1} mb={1} fontSize={14}>
            {jadwal.label}
          </Text>
          <Text whiteSpace={"nowrap"} fontSize={14}>
            {formatTime(jadwal.jam_masuk)} - {formatTime(jadwal.jam_keluar)}
          </Text>
        </Box>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
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
                      <Badge
                        ml={"auto"}
                        colorScheme={
                          data.unit_kerja.jenis_karyawan === 1 ? "ap" : "gray"
                        }
                      >
                        {data.unit_kerja.jenis_karyawan === 1
                          ? "Shift"
                          : "Non-Shift"}
                      </Badge>
                    </HStack>
                  </VStack>
                </VStack>

                <FormControl
                  mt={6}
                  isInvalid={formik.errors.shift ? true : false}
                >
                  <FormLabel>
                    Shift
                    <FormRequired />
                  </FormLabel>
                  <SelectShift
                    formik={formik}
                    name="shift"
                    placeholder="Pilih shift"
                    initialSelected={{
                      value: jadwal.id,
                      label: jadwal.label,
                      jam_kerja: `${jadwal.jam_masuk} - ${jadwal.jam_keluar}`,
                    }}
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.shift as string}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}

            <form id="terapkanJadwa;KaryawanTerpilihForm"></form>
          </ModalBody>
          <ModalFooter pt={isDeleting ? "0 !important" : 6}>
            {!isDeleting && (
              <ButtonGroup w={"100%"}>
                <Button
                  w={"50%"}
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
                  w={"50%"}
                  colorScheme="ap"
                  className="btn-ap clicky"
                  onClick={updateJadwal}
                  isLoading={loadingUpdate}
                >
                  Simpan
                </Button>
              </ButtonGroup>
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
