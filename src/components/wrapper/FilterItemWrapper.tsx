import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props extends AccordionItemProps {
  title: string;
  children: any;
  filterValue?: string;
}
export default function FilterItemWrapper({
  title,
  children,
  filterValue,
  ...props
}: Props) {
  return (
    <AccordionItem {...props}>
      <AccordionButton
        h={"50px"}
        _expanded={{
          color: "p.500",
          fontWeight: 600,
          // borderBottom: "1px solid var(--divider)",
        }}
        _hover={{ bg: "transparent" }}
        justifyContent={"space-between"}
      >
        <HStack w={"100%"} justify={"space-between"} gap={20}>
          <Text flexShrink={0}>{title}</Text>

          {filterValue && (
            <Box py={1} px={3} borderRadius={"full"} mr={4}>
              <Text fontWeight={400} ml={"auto"} noOfLines={1} fontSize={12}>
                {filterValue}
              </Text>
            </Box>
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
