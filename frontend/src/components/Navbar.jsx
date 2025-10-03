import React from 'react';
import { Container, Flex, Text, HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LiaPlusSquare } from "react-icons/lia";
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import './Navbar.css';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("#22221fff", "#bad619ff");

  return (
    <Flex
      className="glassy-navbar"
      w="100%"
      h="16"
      align="center"
      justify="space-between"
      px={8}
      position="fixed"
      top={0}
      zIndex={1000}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        bgClip="text"
        bgColor={textColor}
        className="navbar-logo"
      >
        <Link to="/">Products Cart 🛒</Link>
      </Text>

      <HStack spacing={4}>
        <Link to="/create">
          <Button className="glassy-btn">
            <LiaPlusSquare />
          </Button>
        </Link>
        <Button onClick={toggleColorMode} className="glassy-btn">
          {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
