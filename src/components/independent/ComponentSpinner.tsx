import { Spinner, StackProps, VStack } from "@chakra-ui/react";
import React from "react";

interface Props extends StackProps {}

export default function ComponentSpinner({ ...props }: Props) {
  return (
    <VStack w={"100%"} h={"200px"} justify={"center"} {...props}>
      <Spinner />
    </VStack>
  );
}
