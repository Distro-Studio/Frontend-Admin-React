import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { RiSearch2Line } from "@remixicon/react";
import { useBodyColor } from "../../const/colors";
import { iconSize } from "../../const/sizes";

interface Props extends AccordionItemProps {
  title: string;
  children: any;
}
export default function FilterItemWrapper({
  title,
  children,
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
      >
        <Box as="span" flex="1" textAlign="left" fontSize={16}>
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel p={0}>
        <VStack
          align={"stretch"}
          maxH={"300px"}
          overflowY={"auto"}
          pb={2}
          px={2}
          className="scrollY scrollYkotak"
        >
          <InputGroup
            position={"sticky"}
            top={0}
            bg={useBodyColor()}
            zIndex={2}
          >
            <InputLeftElement>
              <Icon as={RiSearch2Line} fontSize={iconSize} color={"p.500"} />
            </InputLeftElement>
            <Input
              name="search"
              placeholder="Pencarian"
              border={"0 !important"}
              borderBottom={"1px solid var(--divider3) !important"}
              borderRadius={"0 !important"}
              _focus={{
                border: "0 !important",
                borderBottom: "1px solid var(--p500) !important",
              }}
            />
          </InputGroup>

          {children}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}
