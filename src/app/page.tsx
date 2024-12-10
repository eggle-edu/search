"use client";
import { items } from "@/data/item";
import { Container, Input, Text, Table, Kbd } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Theme } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch, LuUser } from "react-icons/lu";
import { AiFillCloseCircle } from "react-icons/ai";
import { Image } from "@chakra-ui/react";

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
      item.question.toLowerCase().includes(search.toLowerCase()) || // 질문 검색
    item.grade.toLowerCase().includes(search.toLowerCase()) ||   // 학년 검색
    item.address.toLowerCase().includes(search.toLowerCase())   // 지역 검색
    );
    setSearchResults(filteredResults);
  }, [search]);

  return (
    <Theme appearance="light">
      <Container
        width={{ base: "100%", md: "80%", lg: "70%", xl: "55%" }}
        bg="#FFFFFF"
      >
        <Image
          src="https://cdn.imweb.me/thumbnail/20241209/545634a1a32be.png" // 로고 이미지 경로
          alt="Logo"
          width={{ base: "140px", md: "200px" }}
          height="auto"
          cursor="pointer"
          mb={{ base: "12px", md: "20px" }}
          pt="60px"
          onClick={() =>
            window.open("https://eggleedu35135.imweb.me/", "_blank")
          } // 클릭 시 구글로 이동
        />
        <Text
          fontFamily="pretendard"
          fontWeight="semibold"
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
            fontSize="16px"
            fontWeight="regular"
            placeholder="검색어를 입력하세요.(ex. 선행, 학년, 지역)"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Container
          border="solid"
          borderWidth={{ base: "0px", md: "1px" }}
          borderColor="#e4e4e7"
          borderRadius="4px" // 둥근 모서리 설정
          overflow="hidden" // 둥근 모서리 내부에 콘텐츠를 맞춤
          p="0"
        >
          <Table.Root size="lg">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  w="30%"
                  textAlign="center"
                  bg="#F2F2F7"
                  fontFamily="pretendard"
                  fontWeight="bold"
                >
                  학년/지역
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  w="70%"
                  textAlign="center"
                  fontFamily="pretendard"
                  fontWeight="bold"
                >
                  질문
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {searchResults.map((item, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center" bg="#F2F2F7">
                    <Text fontFamily="pretendard" fontWeight="semibold">
                    <SearchHighlight text={item.grade} search={search} />
                      {/* {item.grade} */}
                    </Text>
                    <Text fontFamily="pretendard" fontWeight="regular">
                    (<SearchHighlight text={item.address} search={search} />)
                    </Text>
                  </Table.Cell>
                  <Table.Cell
                    textAlign="start"
                    fontFamily="pretendard"
                    fontWeight="regular"
                  >
                    <SearchHighlight text={item.question} search={search} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>
      </Container>
    </Theme>
  );
};

export default SearchableTable;
