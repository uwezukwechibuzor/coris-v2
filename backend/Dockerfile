FROM node:16.2.0-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

# Copy your project files to the container
COPY ./ ./

# Install build tools and Python
RUN apk add --no-cache make gcc g++ python2

# Install Node.js dependencies
RUN npm install --force
