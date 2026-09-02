FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json from the backend folder
COPY Orbit-main/backend/package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the backend source code
COPY Orbit-main/backend/ ./

# Create an uploads folder just in case for multer
RUN mkdir -p uploads

# Start the Node server
CMD ["npm", "start"]
