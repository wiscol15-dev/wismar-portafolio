import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "./",

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.info", "console.debug", "console.warn"],
        passes: 3,
        global_defs: {
          "process.env.NODE_ENV": "production",
        },
      },
      format: {
        comments: false,
      },
      mangle: {
        safari10: true,
      },
    },

    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    sourcemap: false,

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) {
              return "@infrastructure-cloud";
            }

            if (id.includes("lucide-react")) {
              return "@system-ui-icons";
            }

            if (id.includes("framer-motion") || id.includes("@radix-ui")) {
              return "@vendor-animations";
            }
            return "@vendor-core-stable";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
