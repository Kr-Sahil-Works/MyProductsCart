import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { Container, Heading, VStack, Box, Button, Input, Fade, IconButton } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowBox(true); // Trigger entrance animation
  }, []);

  const handleAddProduct = async () => {
    const { success } = await createProduct(newProduct);
    if (!success) {
      toaster.error("Something went wrong!");
    } else {
      toaster.success("Product Added successfully!");
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  // Theme-aware colors
  const bg = useColorModeValue("rgba(255,255,255,0.15)", "rgba(26,32,44,0.6)");
  const boxShadow = useColorModeValue("0 8px 30px rgba(0,0,0,0.1)", "0 8px 30px rgba(0,0,0,0.6)");
  const inputBg = useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.4)");
  const inputColor = useColorModeValue("#1d2c22", "#e4eee4");
  const buttonBg = useColorModeValue("green.500", "yellow.400");
  const buttonColor = useColorModeValue("white", "gray.900");

  const homeBtnBg = useColorModeValue("rgba(255,255,255,0.2)", "rgba(0,0,0,0.4)");
  const homeBtnHoverBg = useColorModeValue("rgba(255,255,255,0.3)", "rgba(0,0,0,0.6)");
  const homeBtnColor = useColorModeValue("#1d2c22", "#e4eee4");

  return (
    <Container
      maxW="container.sm"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      pt={{ base: "100px", md: "140px" }}
    >
      <Fade in={showBox} transition={{ duration: 0.6 }}>
        <Box
          w={{ base: "90%", md: "400px" }}
          bg={bg}
          p={8}
          rounded="2xl"
          shadow={boxShadow}
          backdropFilter="blur(12px)"
          border="1px solid rgba(255,255,255,0.2)"
          transition="all 0.3s ease"
          _hover={{ transform: "translateY(-8px)", shadow: "xl" }}
          mb={8}
        >
          <VStack spacing={6}>
            <Heading as="h1" size="xl" textAlign="center" color={inputColor}>
              Add New Product
            </Heading>

            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              bg={inputBg}
              color={inputColor}
              borderRadius="md"
              _placeholder={{ color: useColorModeValue("gray.600", "gray.400") }}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              bg={inputBg}
              color={inputColor}
              borderRadius="md"
              _placeholder={{ color: useColorModeValue("gray.600", "gray.400") }}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              bg={inputBg}
              color={inputColor}
              borderRadius="md"
              _placeholder={{ color: useColorModeValue("gray.600", "gray.400") }}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button
              bg={buttonBg}
              color={buttonColor}
              w="full"
              borderRadius="md"
              fontWeight="bold"
              _hover={{ bg: useColorModeValue("green.600", "yellow.500"), transform: "scale(1.05)" }}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </Fade>

      {/* Floating Home Button */}
      <IconButton
        icon={<FaHome />}
        aria-label="Go Home"
        position="fixed"
        bottom="50px"
        right="140px"
        bg={homeBtnBg}
        color={homeBtnColor}
        borderRadius="full"
        boxSize="65px"
        shadow="lg"
        backdropFilter="blur(8px)"
        _hover={{
          bg: homeBtnHoverBg,
          transform: "scale(1.1)",
        }}
        onClick={() => navigate("/")}
      />
    </Container>
  );
};

export default CreatePage;
