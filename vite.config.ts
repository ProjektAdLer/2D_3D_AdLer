import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy", "classProperties"],
        },
      },
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  assetsInclude: ["**/*.glb"],
  server: {
    open: true,
    port: 4000,
  },
});
