import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@", replacement: "/src/*"},
      {find: "@pages", replacement: "/src/pages"},
      {find: "@types", replacement: "/src/types"},
      {find: "@service", replacement: "/src/service"},
      {find: "@assets", replacement: "/src/assets"},
      {find: "@components", replacement: "/src/components"},
      {find: "@modal", replacement: "/src/components/modal"},
    ]
  }
})
