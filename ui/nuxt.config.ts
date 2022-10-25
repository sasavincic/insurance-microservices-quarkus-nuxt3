import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined',
        rel: 'stylesheet',
      },
    ],
  },
  publicRuntimeConfig: {
    INSURANCE_BASE_API: process.env.INSURANCE_BASE_API,
    CLAIM_BASE_API: process.env.CLAIM_BASE_API,
    INSURED_PERSON_BASE_API: process.env.INSURED_PERSON_BASE_API,
    RISK_ASSESSMENT_BASE_API: process.env.RISK_ASSESSMENT_BASE_API,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  privateRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  buildModules: [
    '@pinia/nuxt',
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: [
    "~/assets/css/tailwind.css"
  ],
})
