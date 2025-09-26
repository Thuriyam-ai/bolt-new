import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "bolt-new"; // update this!

export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_ENV === "GH_PAGES" ? `/${repoName}/` : "/",
});
