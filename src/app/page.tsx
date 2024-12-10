"use client";
import { items } from "@/data/item";
import { Container, Input, Text, Table, Kbd } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Theme } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch, LuUser } from "react-icons/lu";
import { AiFillCloseCircle } from "react-icons/ai";

const SearchHighlight = ({
  text,
  search,
}: {
  text: string;
  search: string;
}) => {
  if (!search) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${search})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span
            key={index}
            style={{ background: "yellow", fontWeight: "bolder" }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const SearchableTable = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(items);

  useEffect(() => {
    const filteredResults = items.filter((item) =>
      item.question.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [search]);

  return (
    <Theme appearance="light">
      <Container width={{ base: "100%", lg: "100%" }} bg="#FFFFFF">
        <Text
          fontFamily="pretendard"
          fontWeight="semibold"
          pt="60px"
          pb="4px"
          fontSize={{ base: "24px", md: "30px" }}
        >
          학부모님 질문 모음
        </Text>
        <Text
          fontFamily="pretendard"
          fontWeight="regular"
          pt="0px"
          pb="20px"
          fontSize={{ base: "14px", md: "16px" }}
        >
          다른 학부모님은 어떤 질문을 했는지 알아보세요.
        </Text>
        <InputGroup
          width="100%"
          mb="20px"
          startElement={<LuSearch size="16px" />}
          endElement={
            <AiFillCloseCircle
              size="20px"
              cursor="pointer"
              onClick={() => setSearch("")}
            />
          }
        >
          <Input
            value={search}
            fontFamily="pretendard"
            fontWeight="regular"
            placeholder="검색어를 입력하세요.(ex. 선행, 학년, 지역)"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Table.Root size="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="30%" textAlign="center">
                학년/지역
              </Table.ColumnHeader>
              <Table.ColumnHeader w="70%" textAlign="center">
                질문
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {searchResults.map((item, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>
                  {item.grade}
                  <br />
                  {item.address}
                </Table.Cell>
                <Table.Cell textAlign="start">
                  <SearchHighlight text={item.question} search={search} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </Theme>
  );
};

export default SearchableTable;
