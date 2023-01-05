import reactRefresh from '@vitejs/plugin-react-refresh';
import {defineConfig, loadEnv} from 'vite';
import * as path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        plugins: [reactRefresh(),],
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "node_modules"),
                "@": path.resolve(__dirname, "src"),
            },
        },
        build: {
            chunkSizeWarningLimit : 1600,
            rollupOptions: {
                output: {
                    assetFileNames: ({name}) => {
                        if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
                            return 'assets/images/[name]-[hash][extname]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                }
            }
        }
    });
    }
