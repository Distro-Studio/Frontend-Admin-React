import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { iconSize } from "../../const/sizes";
import PaginationJump from "./PaginationJump";

type Props = {
  page: number;
  setPage: (page: number) => void;
  pagination?: any;
};

export default function PaginationNav({ page, setPage, pagination }: Props) {
  return (
    pagination && (
      <HStack justify={"center"}>
        <IconButton
          aria-label="prev"
          icon={<Icon as={RiArrowLeftSLine} fontSize={iconSize} />}
          variant={"ghost"}
          className="btn"
          size={"sm"}
          onClick={() => {
            setPage(page - 1);
          }}
          isDisabled={!pagination.prev_page_url}
        />

        <PaginationJump page={page} setPage={setPage} pagination={pagination} />

        <IconButton
          aria-label="prev"
          icon={<Icon as={RiArrowRightSLine} fontSize={iconSize} />}
          variant={"ghost"}
          className="btn"
          size={"sm"}
          onClick={() => {
            setPage(page + 1);
          }}
          isDisabled={!pagination.next_page_url}
        />
      </HStack>
    )
  );
}
