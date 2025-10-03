import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useColorModeValue } from "@/components/ui/color-mode.jsx";


const HomePage = () => {

  const { fetchProducts, products } = useProductStore();
   const bgColor = useColorModeValue("#22221fff", "#fff");
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);
  

  return (
    <Container maxW="conatiner.xl" py={12} pt="20" >
      <VStack spacing={8}>
        <Text
          fontSize={'xl'}
          fontFamily="monospace"
          bgColor={bgColor}
          bgClip="text"
          textAlign="center"
        >
          Current Products 📦
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md:2,
            lg:3
          }}
          sapcing={10}
          w={"full"}
        >

           {products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}


        </SimpleGrid>

       {products.length === 0 &&(
         <VStack spacing={2} align="center">
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
            mt="20px"
          >
            No Products Found 🙁
          </Text>

          <Text
            mt="10px"
            fontSize="xl"
            fontWeight="bold"
            color="#ffffffaf"
            cursor="pointer"
            _hover={{
              textDecoration: "underline",
              color: "#ffffff",
            }}
          >
            <Link to="/create">Create a Product Now 😀</Link>
          </Text>
        </VStack>
       )}
      </VStack>
    </Container>
  );
};

export default HomePage;
