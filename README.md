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


## 5. Run it!

```
docker run -p 3000:80 docker-sandbox-visualizer
```
