# Usar la imagen oficial de Node.js
FROM node:lts-alpine AS build

# Crear y cambiar al directorio de la aplicación
WORKDIR /app

# Declarar variables de entorno necesarias para el build
ARG NUXT_PUBLIC_API_URL
ARG IBM_APPID_CLIENT_ID
ARG IBM_APPID_CLIENT_SECRET
ARG IBM_APPID_DISCOVERY_URL
ARG IBM_APPID_AZURE_IDP

# Convertir ARG a ENV para que estén disponibles durante el build
ENV NUXT_PUBLIC_API_URL=$NUXT_PUBLIC_API_URL
ENV IBM_APPID_CLIENT_ID=$IBM_APPID_CLIENT_ID
ENV IBM_APPID_CLIENT_SECRET=$IBM_APPID_CLIENT_SECRET
ENV IBM_APPID_DISCOVERY_URL=$IBM_APPID_DISCOVERY_URL
ENV IBM_APPID_AZURE_IDP=$IBM_APPID_AZURE_IDP

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación (ahora con las variables disponibles)
RUN npm run build

# Configurar el comando para ejecutar la aplicación
CMD ["node", ".output/server/index.mjs"]
