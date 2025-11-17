import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { webcrypto } from "node:crypto";

(globalThis as any).crypto = webcrypto;

export default defineConfig({
    define: {
        crypto: webcrypto,
    },
    plugins: [
        vue(),
        dts({
            entryRoot: "src",
            include: ["src/components", "src/npm.ts"],
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
    base: "/Teddy-UI/",
});
