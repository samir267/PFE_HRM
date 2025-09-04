FROM node:22.14-slim

# Create a new user and set the working directory
RUN id -u node &>/dev/null || useradd -m node
# Set working directory
WORKDIR /usr/src/app

# Change the ownership of the working directory to the created user
RUN chown -R node:node /usr/src/app

# Switch to the created user
USER node

# Copy package files 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy  files
COPY tsconfig.json ./
COPY src/ ./
COPY .env.test ./
# Copy application files
COPY . .
ARG VAULT_ADDR

ENV VAULT_ADDR=$VAULT_ADDR
# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["npm", "run","dev"]