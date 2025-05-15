import { ref } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Valores predeterminados
    const isAuthenticated = ref(false)
    const userInfo = ref(null)
    
    // Usamos URLs directamente desde variables de entorno para evitar problemas de configuración
    const clientId = '25e71bc4-15ee-4837-946a-ecf8015c775c' // IBM_APPID_CLIENT_ID
    const clientSecret = 'MTg3MmJhYWItMjljOC00NDcxLWExM2EtZDEzYzlkODZkZTIy' // IBM_APPID_CLIENT_SECRET
    const discoveryUrl = 'https://us-south.appid.cloud.ibm.com/oauth/v4/85e29de8-031c-4ea9-baf3-4d196998a2bb/.well-known/openid-configuration'
    
    // Objeto auth con métodos básicos
    const auth = {
      isAuthenticated,
      userInfo,
      login: () => {
        if (process.server) return
        
        // URL hardcoded para pruebas
        const authUrl = `https://us-south.appid.cloud.ibm.com/oauth/v4/85e29de8-031c-4ea9-baf3-4d196998a2bb/authorization?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}&scope=openid%20profile&identity_provider=azure`
        window.location.href = authUrl
      },
      handleCallback: async (code) => {
        if (process.server) return null
        console.log('Callback recibido con código:', code)
        
        try {
          // En un entorno real, haríamos una llamada a la API para intercambiar el código
          // Por ahora simula autenticación exitosa para pruebas
          isAuthenticated.value = true
          userInfo.value = { name: 'Usuario de Prueba', email: 'test@example.com' }
          return userInfo.value
        } catch (error) {
          console.error('Error en callback:', error)
          return null
        }
      },
      logout: () => {
        if (process.server) return
        isAuthenticated.value = false
        userInfo.value = null
        window.location.href = '/'
      }
    }
  
    // No registramos auth aquí para evitar duplicación
    // Devolvemos el objeto auth
    return {
      provide: {
        auth
      }
    }
  })