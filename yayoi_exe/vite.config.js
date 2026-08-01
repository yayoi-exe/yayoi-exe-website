import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,js}',
        }),
        tailwindcss(),
    ],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    build: {
        outDir: 'build',
        emptyOutDir: true,
    },
    server: {
        host: true,
        port: 3000,
        watch: {
            // Docker Desktop (macOS) では inotify が届かないことがあるため polling を有効化
            usePolling: true,
            interval: 300,
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.test.js'],
    },
});
