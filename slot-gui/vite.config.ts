import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.ts or vite.config.js
export default {
  // ...other config...
  plugins: [react()],
  server: {
    allowedHosts: ['hypr-nix.silverside-gopher.ts.net'],
    // You can add other settings here if needed, like port, etc.
  }
}

