# Usar la imagen oficial de Node.js
FROM node:lts-alpine AS build

# Crear y cambiar al directorio de la aplicación
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Configurar el comando para ejecutar la aplicación
CMD ["node", ".output/server/index.mjs"]
