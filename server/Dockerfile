# 1. Base Image: Start with a lightweight Node.js environment
FROM node:24-alpine

# 2. Working Directory: Create a folder for our app code inside the container
WORKDIR /app

# 3. Dependencies: Copy package files first to leverage caching
COPY package*.json ./
RUN npm install

# 4. Copy Prisma schema + migrations explicitly
COPY prisma ./prisma
RUN npx prisma generate

# 5. Source Code: Copy the rest of the application
COPY . .

# 6. Build the application
RUN npm run build

# 7. Expose Port: Tell Docker which port the app runs on
EXPOSE 3000

# 8. Startup Command: Run migrations and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]