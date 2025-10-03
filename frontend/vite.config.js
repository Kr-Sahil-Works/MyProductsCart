import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // <-- MUST be http://
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      "@chakra-ui/react",
      "@chakra-ui/icons",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
    ],
  },
})


