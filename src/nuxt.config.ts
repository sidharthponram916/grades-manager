// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }, 
  nitro: { 
    plugins: ["~/server/index.ts"]
  }, 
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mongodbUri: process.env.DB_URI,
    salt: process.env.SALT,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
