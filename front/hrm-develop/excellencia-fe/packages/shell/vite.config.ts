import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        finance: 'http://localhost:3001/assets/remoteEntry.js',
        hrm: 'http://localhost:3002/assets/remoteEntry.js',
        productionmgt: 'http://localhost:3003/assets/remoteEntry.js',
        projectmgt: 'http://localhost:3004/assets/remoteEntry.js',
        supplychain: 'http://localhost:3005/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
      
    })
  ],
  server: {
    port: 3000,
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})