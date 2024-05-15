import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiEditFill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { iconSize } from "../../../../const/sizes";
import backOnClose from "../../../../lib/backOnClose";
import useBackOnClose from "../../../../lib/useBackOnClose";
import FormRequired from "../../../form/FormRequired";
import StaticSelect from "../../../input/StaticSelect";

interface Props {
  data: any;
}

export default function EditDataKeluargaKaryawanModal({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      hubungan: data.hubungan,
      nama: data.nama,
      pendidikan_terakhir: data.pendidikan_terakhir,
      pekerjaan: data.pekerjaan,
      status_hidup: data.status_hidup,
      no_hp: data.no_hp,
      email: data.email,
    },
    validationSchema: yup.object().shape({
      hubungan: yup.string().required("Harus diisi"),
      nama: yup.string().required("Harus diisi"),
      pendidikan_terakhir: yup.string().required("Harus diisi"),
      pekerjaan: yup.string().required("Harus diisi"),
      status_hidup: yup.string().required("Harus diisi"),
      no_hp: yup.string().required("Harus diisi"),
      email: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  const statusHidupOptions = [
    {
      value: 0,
      label: "Meninggal",
    },
    {
      value: 1,
      label: "Hidup",
    },
  ];

  return (
    <>
      <Button
        colorScheme="ap"
        variant={"ghost"}
        className=" clicky"
        leftIcon={<Icon as={RiEditFill} fontSize={iconSize} />}
        onClick={onOpen}
      >
        Edit
      </Button>

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
          <ModalHeader>Edit Data Keluarga</ModalHeader>
          <ModalBody>
            <form id="editKeluargaKaryawanForm">
              <FormControl mb={4} isInvalid={formik.errors.nama ? true : false}>
                <FormLabel>
                  Nama Anggota Keluarga
                  <FormRequired />
                </FormLabel>
                <Input
                  name="nama"
                  placeholder="Jolitos Kurniawan"
                  onChange={formik.handleChange}
                  value={formik.values.nama}
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.hubungan ? true : false}
              >
                <FormLabel>
                  Hubungan
                  <FormRequired />
                </FormLabel>
                <Input
                  name="hubungan"
                  placeholder="Ayah"
                  onChange={formik.handleChange}
                  value={formik.values.hubungan}
                />
                <FormErrorMessage>
                  {formik.errors.hubungan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.pendidikan_terakhir ? true : false}
              >
                <FormLabel>
                  Pendidikan Terakhir
                  <FormRequired />
                </FormLabel>
                <Input
                  name="pendidikan_terakhir"
                  placeholder="S1 Teknik Sipil"
                  onChange={formik.handleChange}
                  value={formik.values.pendidikan_terakhir}
                />
                <FormErrorMessage>
                  {formik.errors.pendidikan_terakhir as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.pekerjaan ? true : false}
              >
                <FormLabel>
                  Pekerjaan
                  <FormRequired />
                </FormLabel>
                <Input
                  name="pekerjaan"
                  placeholder="Mandor Proyek"
                  onChange={formik.handleChange}
                  value={formik.values.pekerjaan}
                />
                <FormErrorMessage>
                  {formik.errors.pekerjaan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.status_hidup ? true : false}
              >
                <FormLabel>
                  Status Hidup
                  <FormRequired />
                </FormLabel>
                <StaticSelect
                  formik={formik}
                  name="status_hidup"
                  placeholder="Pilih status hidup"
                  options={statusHidupOptions}
                  selectedValue={formik.values.status_hidup}
                  noSearch
                  noUseBackOnClsoe
                />
                <FormErrorMessage>
                  {formik.errors.status_hidup as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.no_hp ? true : false}
              >
                <FormLabel>
                  Bo. Telepon
                  <FormRequired />
                </FormLabel>
                <Input
                  name="no_hp"
                  placeholder="08616253****"
                  onChange={formik.handleChange}
                  value={formik.values.no_hp}
                />
                <FormErrorMessage>
                  {formik.errors.no_hp as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.email ? true : false}
              >
                <FormLabel>
                  Email
                  <FormRequired />
                </FormLabel>
                <Input
                  name="email"
                  placeholder="example@mail.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormErrorMessage>
                  {formik.errors.email as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                w={"100%"}
                className="btn-solid clicky"
                onClick={() => {
                  backOnClose(onClose);
                }}
              >
                Batal
              </Button>
              <Button w={"100%"} className="btn-ap clicky" colorScheme="ap">
                Simpan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}