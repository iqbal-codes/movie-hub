import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.VITE_TMDB_API_KEY": JSON.stringify(env.VITE_TMDB_API_KEY),
      "process.env.VITE_TMDB_API_BASE_URL": JSON.stringify(
        env.VITE_TMDB_API_BASE_URL
      ),
      "process.env.VITE_TMPB_API_READ_ACCESS_TOKEN": JSON.stringify(
        env.VITE_TMPB_API_READ_ACCESS_TOKEN
      ),
      "process.env.VITE_TMDB_IMAGE_BASE_URL": JSON.stringify(
        env.VITE_TMDB_IMAGE_BASE_URL
      ),
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
