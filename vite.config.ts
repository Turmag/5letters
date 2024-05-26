import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
    return {
        plugins: [vue(), Icons()],
        base: '/5letters/',
        resolve: { alias: { '@': path.resolve(__dirname, './src') } },
        css: { 
            modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' },  preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import './src/assets/scss/variables.scss';
                    `,
                },
            }, 
        },
    };
});

