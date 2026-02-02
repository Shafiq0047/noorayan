import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // এটি অত্যন্ত গুরুত্বপূর্ণ যাতে ফাইলগুলো যেকোনো ফোল্ডারে লোড হতে পারে
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true
  }
});