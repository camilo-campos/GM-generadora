// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  
  plugins: [
    { src: "~/plugins/chartjs", mode: "client" },
    { src: "~/plugins/auth", mode: "client" }
  ],
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  // Configuración de runtime para IBM App ID y Backend API
  runtimeConfig: {
    // Variables privadas (solo servidor)
    ibmAppId: {
      clientSecret: process.env.IBM_APPID_CLIENT_SECRET
    },

    // Variables públicas (cliente y servidor)
    // En IBM Code Engine, configura estas variables con prefijo NUXT_PUBLIC_:
    // - NUXT_PUBLIC_API_URL
    // - NUXT_PUBLIC_IBM_APPID_CLIENT_ID
    // - NUXT_PUBLIC_IBM_APPID_DISCOVERY_URL
    // - NUXT_PUBLIC_IBM_APPID_AZURE_IDP
    public: {
      apiUrl: '',
      ibmAppId: {
        clientId: '',
        discoveryUrl: '',
        azureIdp: ''
      }
    }
  }
});
