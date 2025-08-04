import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";


import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  // Base path para GitHub Pages - será /nome-do-repositorio/
  base: process.env.NODE_ENV === 'production' ? '/pele-rara-investment/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType ?? '')) {
            return `images/[name].[hash].[ext]`;
          }
          return `assets/[name].[hash].[ext]`;
        },
      },
    },
  },
});
