import { ref } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Valores predeterminados
    const isAuthenticated = ref(false)
    const userInfo = ref(null)

    // Obtener configuración desde runtime config
    const config = useRuntimeConfig()
    const clientId = config.public.ibmAppId.clientId
    const discoveryUrl = config.public.ibmAppId.discoveryUrl
    const azureIdp = config.public.ibmAppId.azureIdp

    // Objeto auth con métodos básicos
    const auth = {
      isAuthenticated,
      userInfo,
      login: () => {
        if (process.server) return

        // Construir URL de autorización con variables de entorno
        const authUrl = `${discoveryUrl.replace('/.well-known/openid-configuration', '')}/authorization?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}&scope=openid%20profile&identity_provider=${azureIdp}`
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