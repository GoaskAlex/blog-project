import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
    //   '/api':{
    //   target:'http://localhost:3000',
    //   secure:false,
    // },
    '/api':{
      target:'https://goaskdev-john-blog.onrender.com',
      secure:false,
    },
  },
},
  plugins: [react()],
})
