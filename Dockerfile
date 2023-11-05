# Use an official Node.js runtime as a parent image
FROM node:latest
# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary app source code
COPY . .

RUN npm install

RUN npm run build
# Expose the port that your app will run on
EXPOSE 3000

# Define the command to start your app
ENTRYPOINT ["npm", "start"]
