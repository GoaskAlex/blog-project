import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
      target:'http://localhost:3000',
      secure:false,
    },
  },
},
  plugins: [react(),],
  build:{
    rollupOptions:{
      manualChunks: {
        'vendor': [
          'node_modules/react/index.js',
          'node_modules/react-dom/index.js',
          'node_modules/react-router-dom.js',
          'node_modules/flowbite',
          'node_modules/flowbite-react',
        ]},
        experimentalCodeSplitting: true,
      },
    }
  })
