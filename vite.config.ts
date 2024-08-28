import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
// import viteLegacyPlugin from '@vitejs/plugin-legacy';
import commonjs from '@rollup/plugin-commonjs';
// import { resolve }      from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // viteLegacyPlugin({
    //   targets: ['defaults', 'not IE 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    // }),
    federation({
      name: 'myRemoteApp', // Nombre del remoto
      filename: 'remoteEntry.js', // Archivo que expone los módulos
      exposes: {
        './MyComponent': './src/App.tsx', // Componente expuesto
      },
      shared: ['react', 'react-dom'],
    }),
    commonjs(), // Plugin para manejar módulos CommonJS

  ],
  build: {
      // lib: {
      //   entry: resolve(__dirname, 'src/index.ts'), // Entrada principal de la librería
      //   name: 'LibReactLayoutComponents',
      //   formats: ['es', 'cjs'], // Formatos que deseas exportar
      //   fileName: format => `layout-components.${format}.js`,
      // },
    target: 'es2022',
    // minify: false, // Puedes activar minificación para producción
    // modulePreload: false,
    // cssCodeSplit: false,
    commonjsOptions: {
      strictRequires: true,
    },
    rollupOptions :{

        output: {
          // format: 'cjs', // Cambia el formato a CommonJS
        //   esModule: 'if-default-prop',
        //     ...newConfig.output,
        //     scriptType: 'text/javascript'
          },
          // extend: true,
        // }
    }
      // rollupOptions: {
      //   output: {
      //     format: 'system', // Cambia el formato a CommonJS
      //   },
      // },
  },
  server: {
    port: 4001, // El puerto en el que este remoto se ejecutará
  }
})
