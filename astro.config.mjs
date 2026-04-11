import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abdotaher.me',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
