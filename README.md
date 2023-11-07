# message-handling-system

Follow these steps to set up and run the chatbot sandbox on your local environment using Docker Desktop:

### 1. Download the Repository </br></br>

### 2. Start the Container with Docker Compose

* Open a terminal.
* Navigate to the project's root directory.
* Run the following command to start Docker Compose.

```shell
docker-compose up -d 
``` 

### 3. Get the ID of the Container

Find the CONTAINER ID of the container you've just built using docker ps.

```shell
docker ps
```

### 4. Enter the Container

Use the container ID to enter into the container

```shell
docker exec -it {container id} /bin/sh</br></br>
```

[//]: # (2. Configure Environment Variables)

[//]: # (   Copy the provided .env.example file and rename it to .env.)