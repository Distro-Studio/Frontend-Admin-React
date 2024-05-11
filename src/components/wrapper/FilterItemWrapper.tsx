import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCloseLine } from "@remixicon/react";
import { Dispatch } from "react";

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
        px={filterValue ? 0 : 2}
      >
        <HStack w={"100%"} justify={"space-between"} position={"relative"}>
          {filterValue && (
            <IconButton
              aria-label="Delete filter item button"
              icon={<Icon as={RiCloseLine} />}
              size={"xs"}
              colorScheme="red"
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                setFilterConfig((ps: any) => ({ ...ps, [filterKey]: null }));
              }}
            />
          )}

          {/* {filterValue && (
            <Box
              // position={"absolute"}
              // left={"-16px"}
              h={"6px"}
              w={"6px"}
              borderRadius={"full"}
              bg={"p.500"}
            />
          )} */}

          <Text flexShrink={0}>{title}</Text>

          {filterValue && (
            <Text
              fontWeight={400}
              ml={"auto"}
              mr={2}
              noOfLines={1}
              maxW={"140px"}
              fontSize={12}
            >
              {filterValue}
            </Text>
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
