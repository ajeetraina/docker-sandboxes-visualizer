# Docker Sandbox Visualizer
# Build: docker build -t sandbox-visualizer .
# Run: docker run -p 3000:80 sandbox-visualizer

FROM node:20-alpine AS builder

WORKDIR /app

# Copy source files first
COPY src/ src/

# Create package.json
COPY <<EOF package.json
{
  "name": "sandbox-visualizer",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
EOF

# Create vite config
COPY <<EOF vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist" }
});
EOF

# Create index.html
COPY <<EOF index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Docker Sandbox Architecture</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
EOF

# Install and build
RUN npm install && npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

