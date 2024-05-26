import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
    return {
        plugins: [vue(), Components({ resolvers: [IconsResolver({ prefix: '' })] }), Icons({ autoInstall: true })],
        base: '/5letters/',
        resolve: { alias: { '@': path.resolve(__dirname, './src') } },
        css: { 
            modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' },
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import './src/assets/scss/variables.scss';
                    `,
                },
            }, 
        },
    };
});

