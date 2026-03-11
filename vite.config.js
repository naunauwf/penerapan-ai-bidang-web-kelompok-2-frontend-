import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base:
    command === "build"
      ? "/penerapan-ai-bidang-web-kelompok-2-frontend-/"
      : "/",
}));  
