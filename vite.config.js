import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: [
      'forebearingly-unprefaced-arcelia.ngrok-free.dev', // add your ngrok host here
      'localhost',
      '127.0.0.1'
    ],
  },
});