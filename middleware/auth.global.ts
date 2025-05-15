// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/login', '/callback', '/'];
  const { $auth } = useNuxtApp();
  
  // Si la ruta no es pública y el usuario no está autenticado
  if (!publicRoutes.includes(to.path) && !$auth?.isAuthenticated?.value) {
    console.log('Redirigiendo a login: Acceso no autorizado a', to.path);
    return navigateTo('/login');
  }
});