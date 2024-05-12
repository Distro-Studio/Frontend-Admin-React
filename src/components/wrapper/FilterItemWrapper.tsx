import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  Center,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCloseLine } from "@remixicon/react";
import { Dispatch } from "react";
import { useBodyColor } from "../../const/colors";
import formatNumber from "../../lib/formatNumber";

interface Props extends AccordionItemProps {
  title: string;
  children: any;
  setFilterConfig: Dispatch<any>;
  filterValue?: string;
  filterKey: string;
}
export default function FilterItemWrapper({
  title,
  children,
  setFilterConfig,
  filterValue,
  filterKey,
  ...props
}: Props) {
  // SX
  const bodyColor = useBodyColor();

  return (
    <AccordionItem {...props}>
      <AccordionButton
        h={"50px"}
        _expanded={{
          color: "p.500",
          fontWeight: 500,
          // borderBottom: "1px solid var(--divider)",
        }}
        _hover={{ bg: "transparent" }}
        justifyContent={"space-between"}
        pl={5}
        pr={4}
        position="relative"
        role="group"
      >
        <HStack w={"100%"} justify={"space-between"}>
          {filterValue && (
            <IconButton
              aria-label="Delete filter item button"
              icon={<Icon as={RiCloseLine} fontSize={16} />}
              size={"xs"}
              className="btn-clear"
              colorScheme="red"
              variant={"ghost"}
              position={"absolute"}
              left={-2}
              opacity={0} // Set opacity 0 saat kondisi hover tidak terpenuhi
              _groupHover={{ opacity: 1 }} // Set opacity 1 saat tombol akordion dihover
              onClick={(e) => {
                e.stopPropagation();
                setFilterConfig((ps: any) => ({ ...ps, [filterKey]: null }));
              }}
            />
          )}

          <Text flexShrink={0}>{title}</Text>

          {filterValue && filterValue.length > 0 && (
            <Center
              flexShrink={0}
              minW={"20px"}
              h={"20px"}
              borderRadius={"full"}
              bg={"p.500"}
              ml={"auto"}
              mr={2}
            >
              <Text color={bodyColor} fontSize={12} fontWeight={600}>
                {formatNumber(filterValue.length)}
              </Text>
            </Center>
          )}
        </HStack>

        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel p={0}>
        <VStack
          align={"stretch"}
          maxH={"300px"}
          overflowY={"auto"}
          gap={0}
          // pb={2}
          // px={2}
          className="scrollY scrollYkotak"
        >
          {children}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}
