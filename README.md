# Coris Explorer

A community-built Blockchain explorer for the cosmos ecosystem, brought to you by Cypher Core LLC

## Demo (alpha)
- [Cosmos](http://144.202.39.104:3000/cosmos)

## Using Docker
 [Install Docker](https://docs.docker.com/get-docker/)  on your machine.
   
   ``` 
    git clone https://github.com/jim380/coris-v2.git 
 
   ```
  Development
   
  Build your container: 
  ``` 
  docker compose build --no-cache
  ```
  
  Run your container: 
  ``` 
  docker compose up -d
  ```
  Stop and remove the containers: 
  ``` 
  docker compose down
  ```
  You can view your images created with 
  ```
  docker images
  ```
  
  Yon can view your logs 
  ```
   docker logs CONTAINER
  ```

Open [http://localhost:3000/cosmos](http://localhost:3000/cosmos) with your browser to see the result



  
  
  
  
  
  
  
  
  
  
