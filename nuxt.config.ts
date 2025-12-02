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
      clientSecret: 'MTg3MmJhYWItMjljOC00NDcxLWExM2EtZDEzYzlkODZkZTIy'
    },

    // Variables públicas (cliente y servidor)
    public: {
      apiUrl: 'https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud',
      ibmAppId: {
        clientId: '25e71bc4-15ee-4837-946a-ecf8015c775c',
        discoveryUrl: 'https://us-south.appid.cloud.ibm.com/oauth/v4/85e29de8-031c-4ea9-baf3-4d196998a2bb/.well-known/openid-configuration',
        azureIdp: 'azure'
      }
    }
  }
});
