import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  RiBuilding2Line,
  RiCloudLine,
  RiMoonLine,
  RiRefreshLine,
  RiSunLine,
  RiTerminalBoxFill,
} from "@remixicon/react";
import { useState } from "react";
import getLocation from "../lib/getLocation";
import useBackOnClose from "../lib/useBackOnClose";
import useDebugLoadingState from "../global/useDebugLoadingState";

export default function DebugTools() {
  //! DEBUG
  const { debugLoadingState, setDebugLoadingState } = useDebugLoadingState();
  const { toggleColorMode } = useColorMode();
  const colorMode = useColorModeValue("false", "true");
  const SwitchIcon = useColorModeValue(RiSunLine, RiMoonLine);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  function handleOnClose() {
    onClose();
    window.history.back();
  }
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const [lat, setLat] = useState<string | null>(
    localStorage.getItem("officeLat")
  );
  const [lng, setLng] = useState<string | null>(
    localStorage.getItem("officeLng")
  );
  //! DEBUG

  return (
    <>
      <IconButton
        aria-label="Debug Tools"
        icon={<Icon as={RiTerminalBoxFill} fontSize={24} />}
        borderRadius={"full"}
        colorScheme="ap"
        className="btn-ap"
        position={"fixed"}
        bottom={"92px"}
        right={"6px"}
        zIndex={99}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={handleOnClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Debug Tools</ModalHeader>

          <ModalBody>
            <VStack align={"stretch"}>
              <SimpleGrid columns={[1, 2]} gap={2}>
                <Button
                  leftIcon={<Icon as={SwitchIcon} />}
                  className="btn-solid clicky"
                  onClick={toggleColorMode}
                >
                  {`Dark Mode (${colorMode})`}
                </Button>

                <Button
                  leftIcon={<Icon as={RiCloudLine} />}
                  className="btn-solid clicky"
                  onClick={() => {
                    setDebugLoadingState(!debugLoadingState);
                  }}
                >
                  {`Loading State (${debugLoadingState})`}
                </Button>

                <Button
                  leftIcon={<Icon as={RiRefreshLine} />}
                  className="btn-solid clicky"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Manual Refresh
                </Button>
              </SimpleGrid>

              <HStack mt={4}>
                <Icon as={RiBuilding2Line} />
                <Text fontWeight={600}>Office Center</Text>
              </HStack>

              <VStack
                // p={4}
                // border={"1px solid var(--divider3)"}
                borderRadius={8}
              >
                <FormControl>
                  <FormLabel>Office Latitude</FormLabel>
                  <HStack>
                    <Input
                      placeholder="Office Latitude"
                      onChange={(e) => {
                        setLat(e.target.value);
                      }}
                      value={lat?.toString()}
                    />
                    <Button
                      className="btn-ap clicky"
                      colorScheme="ap"
                      onClick={() => {
                        localStorage.setItem("officeLat", lat as string);
                        toast({
                          status: "success",
                          isClosable: true,
                          title: "Office Latitude set",
                        });
                      }}
                    >
                      Set
                    </Button>
                  </HStack>
                </FormControl>

                <FormControl>
                  <FormLabel>Office Longitude</FormLabel>
                  <HStack>
                    <Input
                      placeholder="Office Longitude"
                      onChange={(e) => {
                        setLng(e.target.value);
                      }}
                      value={lng?.toString()}
                    />
                    <Button
                      className="btn-ap clicky"
                      colorScheme="ap"
                      onClick={() => {
                        localStorage.setItem("officeLng", lat as string);
                        toast({
                          status: "success",
                          isClosable: true,
                          title: "Office Longitude set",
                        });
                      }}
                    >
                      Set
                    </Button>
                  </HStack>
                </FormControl>

                <Button
                  mt={4}
                  className="btn-ap clicky"
                  colorScheme="ap"
                  onClick={() => {
                    setLoading(true);
                    getLocation()
                      .then((myLocation) => {
                        setLat((myLocation.lat + 0.0001).toString());
                        setLng((myLocation.long + 0.0001).toString());
                        localStorage.setItem(
                          "officeLat",
                          (myLocation.lat + 0.0001).toString()
                        );
                        localStorage.setItem(
                          "officeLng",
                          (myLocation.long + 0.0001).toString()
                        );
                        toast({
                          status: "success",
                          isClosable: true,
                          title: "Office Latitude & Longitude set",
                        });
                      })
                      .catch((error) => {
                        console.error("Gagal mendapatkan lokasi:", error);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                  isLoading={loading}
                  w={"100%"}
                >
                  Set Current Center as Office Center
                </Button>

                <Text
                  opacity={0.6}
                  textAlign={"center"}
                  fontSize={[12, null, 14]}
                >
                  Refresh dulu habis setting office center yak
                </Text>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={handleOnClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
