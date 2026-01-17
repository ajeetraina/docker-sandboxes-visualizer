## Docker Sandboxes Visualizer

### Prerequisite

- Docker Desktop

### Run the Docker Sandbox 

```
docker sandbox run claude
```

## 1. Clone the repo

```
git clone https://github.com/ajeetraina/docker-sandboxes-visualizer
```

## 2. Build the image

```
docker build -t docker-sandbox-visualizer .
```


<img width="1478" height="744" alt="image" src="https://github.com/user-attachments/assets/55181662-c2c7-422a-b8d5-8ec1f635f15d" />



## 5. Run it!

```
docker run -p 3000:80 docker-sandbox-visualizer
```
