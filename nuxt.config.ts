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
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud',
      ibmAppId: {
        clientId: process.env.IBM_APPID_CLIENT_ID,
        discoveryUrl: process.env.IBM_APPID_DISCOVERY_URL,
        azureIdp: process.env.IBM_APPID_AZURE_IDP
      }
    }
  }
});
