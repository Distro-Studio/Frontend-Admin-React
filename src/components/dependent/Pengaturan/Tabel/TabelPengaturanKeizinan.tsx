import {
  Checkbox,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useBodyColor, useContentBgColor } from "../../../../const/colors";
import { Tabel__Column__Interface } from "../../../../const/interfaces";
import ComponentSpinner from "../../../independent/ComponentSpinner";
import TabelContainer from "../../../wrapper/TabelContainer";

interface Props {
  data: any;
  loading: boolean;
  simpanTrigger: boolean | null;
  semuaIzin: boolean | null;
  setSimpanLoading: React.Dispatch<boolean>;
}

export default function TabelPengaturanKeizinan({
  data,
  loading,
  simpanTrigger,
  semuaIzin,
  setSimpanLoading,
}: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "name",
      label: "Nama Modul",
      dataType: "string",
    },
  ];

  // Sort Config
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>({ key: columns[0].key, direction: "asc" });
  const sortedData = data && [...data];
  if (sortConfig !== null && sortedData) {
    sortedData.sort((a: any, b: any) => {
      //@ts-ignore
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      //@ts-ignore
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  const sort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { permissions: data },
    validationSchema: yup
      .object()
      .shape({ permissions: yup.array().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setSimpanLoading(true);
    },
  });
  const formikRef = useRef(formik);

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    if (simpanTrigger !== null) {
      formikRef.current.handleSubmit();
    }
  }, [simpanTrigger]);

  const handleCheckboxChange = (index: number, key: string) => {
    const updatedPermissions = [...formik.values.permissions];
    updatedPermissions[index].permissions[key] =
      !updatedPermissions[index].permissions[key];
    formik.setFieldValue("permissions", updatedPermissions);
  };

  useEffect(() => {
    if (semuaIzin !== null) {
      const updatedPermissions = formikRef.current.values.permissions.map(
        (item: any) => {
          const updatedItem = { ...item };
          Object.keys(updatedItem.permissions).forEach((key) => {
            if (updatedItem.permissions[key] !== null) {
              updatedItem.permissions[key] = semuaIzin;
            }
          });
          return updatedItem;
        }
      );

      formikRef.current.setFieldValue("permissions", updatedPermissions);
    }
  }, [semuaIzin]);

  // SX
  const contentBgColor = useContentBgColor();
  const bodyColor = useBodyColor();

  return (
    <>
      {loading && <ComponentSpinner mt={4} />}

      {!loading && sortedData && (
        <>
          <TabelContainer noFooterConfig noTopNavs>
            <Table minW={"100%"}>
              <Thead>
                <Tr position={"sticky"} top={0} zIndex={3} bg={bodyColor}>
                  {columns.map((column, i) => (
                    <Th
                      key={i}
                      whiteSpace={"nowrap"}
                      onClick={() => {
                        if (column.dataType !== "action") {
                          sort(column.key);
                        }
                      }}
                      cursor={"pointer"}
                      borderBottom={"none !important"}
                      zIndex={2}
                      p={0}
                      {...column.thProps}
                    >
                      {column.dataType === "action" ? (
                        <HStack
                          justify={"center"}
                          borderBottom={"1px solid var(--divider3)"}
                          px={4}
                          py={3}
                          h={"52px"}
                          pl={i === 0 ? 4 : ""}
                          pr={i === columns.length - 1 ? 4 : ""}
                          {...column.thContentProps}
                        >
                          <Text>{column.label}</Text>
                        </HStack>
                      ) : (
                        <HStack
                          justify={
                            column.preferredTextAlign === "center"
                              ? "center"
                              : column.dataType === "numeric"
                              ? "flex-end"
                              : "space-between"
                          }
                          borderBottom={"1px solid var(--divider3)"}
                          px={4}
                          py={3}
                          h={"52px"}
                          pl={i === 0 ? 4 : ""}
                          pr={i === columns.length - 1 ? 4 : ""}
                          {...column.thContentProps}
                        >
                          <Text
                            fontWeight={600}
                            flexShrink={0}
                            lineHeight={1.2}
                          >
                            {column.label}
                          </Text>

                          {sortConfig && sortConfig.key === column.key && (
                            <>
                              {sortConfig.direction === "asc" ? (
                                <Icon
                                  as={RiArrowUpLine}
                                  color={"p.500"}
                                  fontSize={16}
                                />
                              ) : (
                                <Icon
                                  as={RiArrowDownLine}
                                  color={"p.500"}
                                  fontSize={16}
                                />
                              )}
                            </>
                          )}
                        </HStack>
                      )}
                    </Th>
                  ))}

                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                    >
                      <Text>View</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                    >
                      <Text>Create</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                    >
                      <Text>Edit</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      pr={4}
                      h={"52px"}
                    >
                      <Text>Delete</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      pr={4}
                      h={"52px"}
                    >
                      <Text>Export</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      pr={4}
                      h={"52px"}
                    >
                      <Text>Import</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      pr={4}
                      h={"52px"}
                    >
                      <Text>Reset</Text>
                    </HStack>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {sortedData.map((row: any, i: number) => (
                  <Tr
                    h={"72px"}
                    key={i}
                    bg={i % 2 === 0 ? contentBgColor : bodyColor}
                  >
                    <Td whiteSpace={"nowrap"}>{row.group}</Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.view === null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.view === null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.view === null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.view
                        }
                        onChange={() => handleCheckboxChange(i, "view")}
                      ></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.create ===
                          null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.create ===
                          null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.create ===
                          null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.create
                        }
                        onChange={() => handleCheckboxChange(i, "create")}
                      ></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.edit === null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.edit === null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.edit === null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.edit
                        }
                        onChange={() => handleCheckboxChange(i, "edit")}
                      ></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.delete ===
                          null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.delete ===
                          null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.delete ===
                          null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.delete
                        }
                        onChange={() => handleCheckboxChange(i, "delete")}
                      ></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.export ===
                          null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.export ===
                          null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.export ===
                          null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.export
                        }
                        onChange={() => handleCheckboxChange(i, "export")}
                      ></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.import ===
                          null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.import ===
                          null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.import ===
                          null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.import
                        }
                        onChange={() => handleCheckboxChange(i, "import")}
                      ></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox
                        colorScheme="ap"
                        size={"lg"}
                        display={
                          formik.values.permissions[i].permissions.reset ===
                          null
                            ? "none"
                            : "block"
                        }
                        opacity={
                          formik.values.permissions[i].permissions.reset ===
                          null
                            ? 0
                            : 1
                        }
                        isDisabled={
                          formik.values.permissions[i].permissions.reset ===
                          null
                        }
                        isChecked={
                          formik.values.permissions[i].permissions.reset
                        }
                        onChange={() => handleCheckboxChange(i, "reset")}
                      ></Checkbox>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabelContainer>
        </>
      )}
    </>
  );
}
