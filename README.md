# 1. Download the files to a directory
mkdir sandbox-visualizer && cd sandbox-visualizer

# 2. Create the directory structure
mkdir -p src

# 3. Copy the files (Dockerfile, src/App.jsx, src/main.jsx)
# Or download from where you saved them

# 4. Build the image
docker build -t sandbox-visualizer .

# 5. Run it!
docker run -p 3000:80 sandbox-visualizer
