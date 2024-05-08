import {
  Alert,
  AlertDescription,
  AlertIcon,
  TextProps,
} from "@chakra-ui/react";

interface Props extends TextProps {}
export default function DeletePermanentWarning({ ...props }: Props) {
  return (
    // <Text fontSize={14} opacity={0.6} {...props}>
    //   Data yang dihapus tidak bisa dikembalikan
    // </Text>
    <Alert
      variant={"left-accent"}
      borderRadius={8}
      colorScheme="red"
      {...props}
    >
      <AlertIcon />
      <AlertDescription mt={0}>
        Data yang dihapus tidak bisa dikembalikan
      </AlertDescription>
    </Alert>
  );
}
