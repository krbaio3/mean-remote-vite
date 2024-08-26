import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'myRemoteApp', // Nombre del remoto
      filename: 'remoteEntry.js', // Archivo que expone los módulos
      exposes: {
        './MyComponent': './src/App.tsx', // Componente expuesto
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false, // Puedes activar minificación para producción
  },
  server: {
    port: 3001, // El puerto en el que este remoto se ejecutará
  }
})
