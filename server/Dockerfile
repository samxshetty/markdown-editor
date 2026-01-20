# 1. Base Image: Start with a lightweight Node.js environment
FROM node:24-alpine

# 2. Working Directory: Create a folder for our app code inside the container
WORKDIR /app

# 3. Dependencies: Copy package files first to leverage Docker's layer caching.
# If these files don't change, the `npm install` layer won't be re-run.
COPY package*.json ./
RUN npm install

# 4. Prisma Schema: Copy the Prisma schema and generate the client.
# This is done as a separate step to ensure the client is generated before the app starts.
COPY prisma ./prisma
RUN npx prisma generate

# 5. Source Code: Copy the rest of the application code.
COPY . .

# 6. Build the project to obtain /dist folder
RUN npm run build

# 7. Expose Port: Tell Docker which port the app will run on.
EXPOSE 3000

# 8. Startup Command: Define the command to run when the container starts.
# This script first ensures the database is up-to-date with migrations, then starts the server.
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]