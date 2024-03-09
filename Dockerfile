# Use a imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto usando o npm
RUN npm install

# Instala o cliente PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Copia o código fonte da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta 3000 (ou a porta que a sua aplicação Node.js está configurada para usar)
EXPOSE 3000

# Comando padrão para executar a aplicação
CMD ["npm", "start"]