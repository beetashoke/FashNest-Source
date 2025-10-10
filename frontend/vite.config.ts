import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8006',
                changeOrigin: true,
                secure: false,
            },
            '/assets': {
                target: 'http://127.0.0.1:8006',
                changeOrigin: true,
                secure: false,
            },
            '/files': {
                target: 'http://127.0.0.1:8006',
                changeOrigin: true,
                secure: false,
            },
            '/private': {
                target: 'http://127.0.0.1:8006',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})


