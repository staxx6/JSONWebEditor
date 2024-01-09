// import { defineConfig } from 'vite'; - uncomment if `defineConfig` function is used

export default ({ command }) => ({
  server: {
    hmr: {
      exclude: ['schemas/**']
    }
  }
});
