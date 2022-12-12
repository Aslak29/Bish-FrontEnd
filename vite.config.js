import reactRefresh from '@vitejs/plugin-react-refresh';
import {defineConfig, loadEnv} from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        plugins: [reactRefresh()],
    });
    }
