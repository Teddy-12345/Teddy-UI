import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: "src",
      include: ["src/components", "src/npm.ts"],
      skipDiagnostics: true,     // ← 关键：忽略所有 TS 报错
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/npm.ts",
      name: "TeddyUI",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
});
