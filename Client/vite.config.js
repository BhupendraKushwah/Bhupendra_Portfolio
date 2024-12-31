import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode (e.g., 'development' or 'production')
    const { VITE_SERVER_URL } = loadEnv(mode, process.cwd(), '');
    console.log(VITE_SERVER_URL)
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: VITE_SERVER_URL,  // Use the environment variable dynamically
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
});
