/// <reference types="vite/client" />
import { reactRouter } from '@react-router/dev/vite'
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import autoprefixer from 'autoprefixer'
import { reactRouterDevTools } from 'react-router-devtools'
import { reactRouterHonoServer } from 'react-router-hono-server/dev'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    babel({
      include: ['./app/**/*'],
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    cloudflareDevProxy(),
    reactRouterHonoServer({
      runtime: 'cloudflare',
      serverEntryPoint: './server/index.ts',
    }),
    reactRouterDevTools(),
    reactRouter(),
    tsconfigPaths(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
