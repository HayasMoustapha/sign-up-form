import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/sign-up-form/",
  plugins: [react(), tailwindcss()],
});
