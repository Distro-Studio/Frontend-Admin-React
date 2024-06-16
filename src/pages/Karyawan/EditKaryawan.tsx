import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
} from "@chakra-ui/react";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";
import EditKaryawanForm from "./EditKaryawanForm";
import { useState } from "react";
import { dummyDetailKaryawan } from "../../const/dummy";

export default function EditKaryawan() {
  const steps = [{ title: "Data Karyawan" }, { title: "Penggajian" }];
  const { activeStep, setActiveStep } = useSteps();
  const activeStepText = steps[activeStep].title;
  const sw = useScreenWidth();

  const [data] = useState<any | null>(dummyDetailKaryawan);

  return (
    <CWrapper maxW={"800px"} mx={"auto"} my={12}>
      <Stepper
        index={activeStep}
        colorScheme="ap"
        mb={6}
        w={"100%"}
        maxW={"500px"}
        mx={"auto"}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{sw >= 768 && <Text>{step.title}</Text>}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {sw < 768 && (
        <Text mb={6}>
          Step {activeStep + 1} : <b>{activeStepText}</b>
        </Text>
      )}

      <CContainer
        p={responsiveSpacing}
        bg={useBodyColor()}
        borderRadius={12}
        overflowY={"auto"}
        flex={1}
      >
        <Text fontSize={22} fontWeight={600}>
          {steps[activeStep].title}
        </Text>
        <Text opacity={0.6} mb={6}>
          Silahkan Isi Semua Data Informasi Dasar Karyawan
        </Text>

        <EditKaryawanForm
          data={data}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </CContainer>
    </CWrapper>
  );
}
