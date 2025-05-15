import { ref } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Valores predeterminados
    const isAuthenticated = ref(false)
    const userInfo = ref(null)
    
    // Obtenemos la configuración en tiempo de ejecución
    const config = useRuntimeConfig()
    
    // Usamos las variables desde runtimeConfig
    const clientId = config.public.ibmAppId.clientId
    const clientSecret = config.ibmAppId?.clientSecret // Solo disponible en el servidor
    const discoveryUrl = config.public.ibmAppId.discoveryUrl
    const azureIdp = config.public.ibmAppId.azureIdp
    
    // Extraer la URL base del discoveryUrl (eliminando la parte '/.well-known/openid-configuration')
    const baseAuthUrl = discoveryUrl?.replace('/.well-known/openid-configuration', '')
    
    // Objeto auth con métodos básicos
    const auth = {
      isAuthenticated,
      userInfo,
      login: () => {
        if (process.server) return
        
        // URL construida dinámicamente con variables de configuración
        const authUrl = `${baseAuthUrl}/authorization?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}&scope=openid%20profile&identity_provider=${azureIdp}`
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