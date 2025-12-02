import { ref } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Valores predeterminados
    const isAuthenticated = ref(false)
    const userInfo = ref(null)

    // Obtener configuración desde runtime config
    const config = useRuntimeConfig()
    const clientId = config.public.ibmAppId?.clientId
    const discoveryUrl = config.public.ibmAppId?.discoveryUrl
    const azureIdp = config.public.ibmAppId?.azureIdp

    // Objeto auth con métodos básicos
    const auth = {
      isAuthenticated,
      userInfo,
      login: () => {
        if (process.server) return

        // Validar que las variables existan
        if (!clientId || !discoveryUrl || !azureIdp) {
          console.error('❌ Variables de entorno de IBM App ID no configuradas correctamente')
          console.error('Verifica que estas variables estén configuradas en IBM Cloud Code Engine:')
          console.error('- IBM_APPID_CLIENT_ID')
          console.error('- IBM_APPID_DISCOVERY_URL')
          console.error('- IBM_APPID_AZURE_IDP')
          alert('Error de configuración: Variables de autenticación no encontradas. Por favor contacta al administrador.')
          return
        }

        try {
          // Construir URL de autorización con variables de entorno
          const baseUrl = discoveryUrl.replace('/.well-known/openid-configuration', '')
          const authUrl = `${baseUrl}/authorization?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}&scope=openid%20profile&identity_provider=${azureIdp}`

          console.log('🔐 Redirigiendo a autenticación...')
          window.location.href = authUrl
        } catch (error) {
          console.error('❌ Error al construir URL de autenticación:', error)
          alert('Error al iniciar sesión. Por favor intenta nuevamente.')
        }
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