import { Box, Button } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import { useColorModeValue } from "./components/ui/color-mode"

// "#25221eff"

function App() {
  return (
    <Box minH={"100vh"}  bg={useColorModeValue("#a8c03eff","gray.900")}>  
     <Navbar/>
     <Routes>
      <Route path = "/" element = {< HomePage />} />
      <Route path = "/create" element = {< CreatePage />} />
     </Routes>
    </Box>
  )
}

export default App
