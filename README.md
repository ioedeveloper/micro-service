# MICRO-SERVICE
A stateless micro-service in Node, which implements Authentication, JSON patching and Image Thumbnail Generation.

## Docker Image
[index.docker.io/ioedeveloper/micro-service:latest](index.docker.io/ioedeveloper/micro-service:latest)

## How To Setup Application
1. install node.js
2. clone repository
3. run `npm install` to download and install all application dependencies.
4. run `npm start` to start application on port 8001

## How To Use MICRO-SERVICE
1. Make a POST request to http://localhost:8001/login with request body containing `username` and `password` to generate **JSON Web Token** for subsequent requests to protected routes.
2. Make a PATCH request to http://localhost:8001/applyjsonpatch with request body containing `jsonobject` and a `jsonpatchobject` to apply patch to jsonobject and return result.
3. Make a POST request to http://localhost:8001/createthumbnail with request body containing `url` pointing to a public image. This request if successfull will resize the image and return a 50X50 thumbnail image. 

