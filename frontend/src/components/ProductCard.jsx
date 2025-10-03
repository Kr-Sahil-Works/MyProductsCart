import React, { useState } from "react";
import { Box, Heading, HStack, Text, Image, VStack, Input, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster.jsx";
import { useColorModeValue } from "@/components/ui/color-mode.jsx"; // <- homepage theme logic

// Glassy icon button style
const iconButtonStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "50%",
  padding: "10px",
  cursor: "pointer",
  fontSize: "18px",
  color: "#fff",
  transition: "all 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
const iconButtonHover = {
  background: "rgba(255, 255, 255, 0.2)",
  transform: "scale(1.1)",
};

// ===== Custom Modal Component =====
const CustomModal = ({ visible, onClose, product, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const modalBg = useColorModeValue("#ffffff", "#181a0fff");
  const textColor = useColorModeValue("#121814ff", "#e4eee4ff");
  const inputBg = useColorModeValue("#f0f0f0", "#2a2a2aff");
  const buttonBg = useColorModeValue("#57b40bff", "#d4ba24ff");
  const buttonText = useColorModeValue("#ffffff", "#121814ff");
  const cancelBg = useColorModeValue("#e0e0e0", "#333333");
  const cancelText = useColorModeValue("#121814ff", "#e4eee4ff");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: modalBg,
          padding: "20px",
          borderRadius: "12px",
          minWidth: "320px",
          maxWidth: "400px",
          boxShadow: "0 5px 30px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Heading size="md" style={{ color: textColor, textAlign: "center" }}>
          Update Product
        </Heading>

        <VStack spacing={3} mt={4}>
          <Input
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            bg={inputBg}
            color={textColor}
          />
          <Input
            placeholder="Enter price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            bg={inputBg}
            color={textColor}
          />
          <Input
            placeholder="Enter image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            bg={inputBg}
            color={textColor}
          />

          <Button
            w="full"
            style={{ backgroundColor: buttonBg, color: buttonText }}
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            w="full"
            style={{ backgroundColor: cancelBg, color: cancelText }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </VStack>
      </div>
    </div>
  );
};

// ===== Product Card Component =====
const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("#0F1A09", "#e4eee4ff");
  const bg = useColorModeValue("#becf6aff", "#181a0fff");

  const { deleteProduct, updateProduct } = useProductStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteProduct = async (pid) => {
    const { success } = await deleteProduct(pid);
    if (!success) toaster.error("Something went wrong | server error");
    else toaster.success("Product deleted successfully!");
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success } = await updateProduct(pid, updatedProduct);
    setModalOpen(false);
    if (!success) toaster.error("Something went wrong | server error");
    else toaster.success("Product updated successfully!");
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.25s ease"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      w="90%"
      mt="20px"
      mx="auto"
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} color={textColor}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={3}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={iconButtonStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, iconButtonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, iconButtonStyle)
              }
              aria-label="Edit"
              onClick={() => setModalOpen(true)}
            >
              <FaEdit />
            </button>

            <button
              style={iconButtonStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, iconButtonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, iconButtonStyle)
              }
              aria-label="Delete"
              onClick={() => handleDeleteProduct(product._id)}
            >
              <FaTrash />
            </button>
          </div>
        </HStack>
      </Box>

      {/* Custom Modal */}
      <CustomModal
        visible={modalOpen}
        product={product}
        onClose={() => setModalOpen(false)}
        onUpdate={(updatedData) =>
          handleUpdateProduct(product._id, updatedData)
        }
      />
    </Box>
  );
};

export default ProductCard;
