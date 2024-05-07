import { Image, Kbd, StackProps, Text, VStack } from "@chakra-ui/react";
import useScreenWidth from "../../lib/useScreenWidth";
import DebugTools from "../DebugTools";

interface Props extends StackProps {
  children: any;
}

export default function Container({ children, ...props }: Props) {
  const sw = useScreenWidth();

  return (
    <>
      {/* quick debug tools */}
      <DebugTools />
      {/* quick debug tools */}

      <VStack
        className="container"
        w={"100%"}
        maxW={"1440px"}
        gap={0}
        minH={"100vh"}
        mx={"auto"}
        align={"stretch"}
        {...props}
      >
        {sw < 1200 ? (
          <VStack my={"auto"} px={6}>
            <Image src={"/vectors/error404.webp"} mb={4} maxW={"300px"} />
            <Text
              textAlign={"center"}
              fontWeight={500}
              fontSize={24}
              mb={2}
              maxW={"600px"}
            >
              Untuk menggunakan aplikasi ini, minimal lebar viewport/monitor
              harus 1200px.
            </Text>
            <Text textAlign={"center"} maxW={"600px"}>
              Jika lebar layar tidak memenuhi syarat, anda dapat menurunkan
              scale/zoom out dengan <Kbd>Ctrl</Kbd> + <Kbd>-</Kbd>, untuk
              menaikkan scale/zoom in dengan <Kbd>Ctrl</Kbd> + <Kbd>+</Kbd>
            </Text>
          </VStack>
        ) : (
          children
        )}
      </VStack>
    </>
  );
}
