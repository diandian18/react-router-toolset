import path from 'path';
import { defineConfig, UserConfigExport, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';

// https://vitejs.dev/config/

/**
 * npm run build:test
 * npm run build:lib
 */
enum Mode {
  /**
   * 库模式，其他为不同环境下的demo模式
   */
  'LIB' = 'lib',
  'PROD' = 'prod',
}

interface ViteParams {
  mode: string;
  command: string;
  ssrBuild: boolean;
}

export default (viteParams: ViteParams) => {
  const { mode } = viteParams;
  const env = loadEnv(mode, process.cwd());
  // console.log(mode); // { mode: 'localhost', command: 'serve', ssrBuild: false }
  const config: UserConfigExport = {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@@': path.resolve(__dirname, './examples'),
      },
    },
    server: {
      host: true,
      port: 9527,
    },
    esbuild: {
      target: 'chrome65',
    },
    base: env.VITE_BASENAME,
    build: {
      target: 'es2015',
    },
  };

  if (mode === Mode.LIB) {
    // 生成类型文件
    const dstConfig = dts({
      outDir: './dist-lib',
      insertTypesEntry: true,
      // skipDiagnostics: true,
      rollupTypes: true,
      exclude: ['examples'],
    });
    if (config.plugins) {
      config.plugins.push(dstConfig);
    } else {
      config.plugins = [dstConfig];
    }

    // 构建打包
    if (config.build) {
      // 库模式打包
      config.build.lib = {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'ReactRouterToolset', // umd中变量名称
        fileName: 'react-router-toolset', // 打包后的dist里文件名称
      };
      // rollup配置
      config.build.rollupOptions = {
        output: {
          inlineDynamicImports: true,
          dir: './dist-lib',
          globals: {
            'react': 'React',
            'react/jsx-runtime': 'ReactJsxRuntime',
            'react-is': 'ReactIs',
            'react-router': 'ReactRouter',
          },
          plugins: [terser()],
        },
        external: [
          'react', 'react-dom', 'react/jsx-runtime', 'react-is',
          'react-router',
        ],
      };
    }
  }

  return defineConfig(config);
};
