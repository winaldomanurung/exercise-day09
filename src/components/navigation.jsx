import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";

export default function Navigation({ sortHandler }) {
  const [isFormActive, setIsFormActive] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/table") {
      setIsFormActive(() => false);
    }
  }, []);

  return (
    <Flex
      w="100%"
      py="20px"
      marginBottom="15px"
      px="161px"
      justifyContent="space-between"
    >
      <Flex>
        <Box
          py="8px"
          px="15px"
          cursor="pointer"
          borderBottom={isFormActive ? "2px" : null}
          borderBottomColor={isFormActive ? "#2B6CB0" : null}
        >
          <Link onClick={() => setIsFormActive(() => true)} to="/">
            Form Input
          </Link>
        </Box>
        <Box
          py="8px"
          px="15px"
          cursor="pointer"
          borderBottom={isFormActive ? null : "2px"}
          borderBottomColor={isFormActive ? null : "#2B6CB0"}
        >
          <Link onClick={() => setIsFormActive(() => false)} to="/table">
            Table
          </Link>
        </Box>
      </Flex>
      <Flex>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input type="text" placeholder="Search" />
        </InputGroup>
        <Menu>
          <MenuButton
            minW="150px"
            ml="10px"
            backgroundColor="#F9F9F9"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Sort By
          </MenuButton>
          <MenuList>
            <MenuItem value={"programAZ"} onClick={sortHandler}>
              Program A-Z
            </MenuItem>
            <MenuItem value={"programZA"} onClick={sortHandler}>
              Program Z-A
            </MenuItem>
            <MenuItem value={"countryAZ"} onClick={sortHandler}>
              Country A-Z
            </MenuItem>
            <MenuItem value={"countryZA"} onClick={sortHandler}>
              Country Z-A
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
