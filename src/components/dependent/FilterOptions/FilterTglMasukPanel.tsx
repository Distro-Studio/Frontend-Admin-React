import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { id } from "date-fns/locale"; // Import locale for Indonesian language
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { iconSize } from "../../../const/sizes";
import formatDate from "../../../lib/formatDate";
import parseNumber from "../../../lib/parseNumber";

interface Props extends ButtonProps {
  placeholder?: string;
  confirmDate: (date: any) => void;
  dateValue?: Date[];
  defaultDateSelected?: Date;
  dateFormatOptions?: any;
}

export default function FilterTglMasukPanel({
  placeholder,
  confirmDate,
  dateValue,
  defaultDateSelected,
  dateFormatOptions,
  ...props
}: Props) {
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [tahun, setTahun] = useState<number>(date.getFullYear());
  const [bulan, setBulan] = useState<number>(date.getMonth() + 1);
  const [selected, setSelected] = useState<any>();

  const confirmDateRef = useRef(confirmDate);

  useEffect(() => {
    if (selected) {
      confirmDateRef.current(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (defaultDateSelected) {
      setSelected(defaultDateSelected);
    }
  }, [defaultDateSelected]);

  function todayMonth() {
    const today = new Date();
    setDate(today);
    setSelected(today);
    setBulan(today.getMonth() + 1);
    setTahun(today.getFullYear());
    // setSelected(undefined);
  }
  function nextMonth() {
    const currentMonth = date.getMonth();
    const currentyear = date.getFullYear();

    const nextMonth = new Date(
      bulan === 12 ? currentyear + 1 : tahun,
      bulan === 12 ? 0 : currentMonth + 1
    );
    setDate(nextMonth);
    setBulan(nextMonth.getMonth() + 1);
    setTahun(nextMonth.getFullYear());
    // setSelected(undefined); // Hindari pemanggilan setSelected di sini
  }
  function prevMonth() {
    const currentMonth = date.getMonth();
    const currentyear = date.getFullYear();

    const prevMonth = new Date(
      bulan === 1 ? currentyear - 1 : tahun,
      bulan === 1 ? 11 : currentMonth - 1
    );
    setDate(prevMonth);
    setBulan(prevMonth.getMonth() + 1);
    setTahun(prevMonth.getFullYear());
    // setSelected(undefined); // Hindari pemanggilan setSelected di sini
  }

  const isBulanValid = (bulan: number) => {
    return bulan > 0 && bulan <= 12;
  };
  const isTahunValid = (tahun: number) => {
    return tahun >= 100 && tahun <= 270000;
  };

  // SX
  const bnwColor = useColorModeValue("black", "white");
  const modifiersStyles = {
    selected: {
      border: "2px solid var(--p500)",
      background: "transparent",
      color: bnwColor,
      opacity: 1,
    },
    today: {
      color: "var(--p500)",
    },
  };

  return (
    <VStack align={"stretch"} px={2}>
      <Box>
        <HStack w={"100%"}>
          <FormControl>
            <FormLabel>Bulan</FormLabel>
            <Input
              ref={monthInputRef}
              name="bulan"
              placeholder="Bulan ke-"
              onChange={(e) => {
                const value = parseNumber(e.target.value);
                if (value && value <= 12) {
                  setDate(new Date(tahun, value - 1));
                  setBulan(value);
                  // setConfirm(false);
                  setSelected(undefined);
                }
              }}
              value={bulan === 0 ? "" : bulan}
              onFocus={() => {
                if (monthInputRef.current) {
                  monthInputRef.current.select();
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tahun</FormLabel>
            <Input
              name="tahun"
              placeholder="Tahun"
              onChange={(e) => {
                const value = parseNumber(e.target.value);
                if (value) {
                  setDate(new Date(value, bulan - 1));
                  setTahun(value);
                }
                // setConfirm(false);
                setSelected(undefined);
              }}
              value={tahun === 0 ? "" : tahun}
              onFocus={() => {
                if (yearInputRef.current) {
                  yearInputRef.current.select();
                }
              }}
            />
          </FormControl>
        </HStack>
      </Box>

      <VStack align={"stretch"} pt={1}>
        {!isBulanValid(bulan) && isTahunValid(tahun) && (
          <HStack h={"360px"} justify={"center"}>
            <Text textAlign={"center"}>Bulan tidak valid</Text>
          </HStack>
        )}

        {isBulanValid(bulan) && !isTahunValid(tahun) && (
          <HStack h={"360px"} justify={"center"}>
            <Text textAlign={"center"}>Tahun tidak valid</Text>
          </HStack>
        )}

        {!isBulanValid(bulan) && !isTahunValid(tahun) && (
          <HStack h={"360px"} justify={"center"}>
            <Text textAlign={"center"}>Bulan dan Tahun tidak valid</Text>
          </HStack>
        )}

        {isBulanValid(bulan) && isTahunValid(tahun) && (
          <>
            <VStack overflowX={"auto"} w={"100%"} align={"stretch"}>
              <DayPicker
                mode="single"
                selected={dateValue && dateValue[0]}
                onSelect={(e) => {
                  setSelected(e);
                  // setConfirm(false);
                }}
                locale={id}
                modifiersStyles={modifiersStyles}
                month={date}
                showOutsideDays
                fixedWeeks
                disableNavigation
              />
            </VStack>

            <ButtonGroup w={"100%"}>
              <Button
                aria-label="Previous Month"
                leftIcon={<Icon as={RiArrowLeftSLine} fontSize={iconSize} />}
                pr={"10px"}
                className="btn-outline clicky"
                onClick={prevMonth}
                w={"20%"}
              >
                {/* Sebelumnya */}
              </Button>

              <Button
                flex={1}
                className="btn-outline clicky"
                onClick={todayMonth}
              >
                Hari Ini
              </Button>

              <Button
                aria-label="Next Month"
                rightIcon={<Icon as={RiArrowRightSLine} fontSize={iconSize} />}
                pl={"10px"}
                className="btn-outline clicky"
                onClick={nextMonth}
                w={"20%"}
              >
                {/* Selanjutnya */}
              </Button>
            </ButtonGroup>
          </>
        )}
      </VStack>

      <VStack align={"stretch"} w={"100%"}>
        <VStack borderRadius={8} bg={"var(--divider)"} p={2} gap={1}>
          <Text
            opacity={selected || (dateValue && dateValue.length > 0) ? 1 : 0.6}
          >
            {selected || (dateValue && dateValue.length > 0)
              ? `${formatDate(selected || dateValue)}`
              : "Silahkan pilih tanggal"}
          </Text>
        </VStack>

        {/* <Button
          colorScheme="ap"
          className="btn-ap clicky"
          w={"100%"}
          isDisabled={selected ? false : true}
          onClick={() => {
            confirmSelect();
          }}
        >
          Konfirmasi
        </Button> */}
      </VStack>
    </VStack>
  );
}
