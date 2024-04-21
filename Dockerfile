# Usamos una imagen base de Node.js
FROM node:14

# Creamos un directorio para la aplicación
WORKDIR /usr/src/app

# Copiamos el archivo de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Exponemos el puerto que usa nuestra aplicación
EXPOSE 80

# Comando para iniciar la aplicación
CMD [ "node", "server.js" ]