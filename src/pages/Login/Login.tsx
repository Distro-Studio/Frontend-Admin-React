import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import FormLogin from "../../components/form/FormLogin";
import Container from "../../components/wrapper/Container";
import CContainer from "../../components/wrapper/CContainer";

export default function Login() {
  return (
    <Container>
      <CContainer>
        <HStack minH={"100vh"} w={"100%"}>
          <VStack
            align={"stretch"}
            justify={"space-between"}
            minH={"100vh"}
            py={6}
            px={12}
            maxW={"450px"}
          >
            <VStack align={"flex-start"}>
              <Image src={"/logo512.png"} w={"180px"} />
            </VStack>

            <Box>
              <Text fontSize={24} fontWeight={600}>
                Selamat Datang!
              </Text>
              <Text opacity={0.6} mb={8}>
                Masuk untuk mendapatkan akses tak terbatas ke data & informasi
              </Text>

              <FormLogin />
            </Box>

            <Text opacity={0.6}>Copyright 2024 RSKI All right Reserved</Text>
          </VStack>

          <VStack p={6} h={"100vh"} flex={1}>
            <VStack
              borderRadius={24}
              justify={"flex-end"}
              align={"flex-start"}
              p={4}
              overflow={"clip"}
              w={"100%"}
              bgImage={"/images/login.png"}
              bgSize={"cover"}
              bgPos={"center"}
              flex={1}
            >
              <VStack
                // maxW={"700px"}
                bg={"blackAlpha.600"}
                color={"white"}
                p={4}
                borderRadius={12}
                backdropFilter={"blur(5px)"}
              >
                <Text>
                  “Di rumah sakit kami, kami memberikan perawatan yang tak
                  tertandingi, di mana keahlian berpadu dengan kasih sayang,
                  untuk memastikan hasil terbaik bagi setiap pasien”
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </CContainer>
    </Container>
  );
}
