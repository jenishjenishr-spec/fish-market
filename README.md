# Kadal Kani — Fish Market Website

A simple static website for a fresh-catch fish market, built as a DevOps practice
project covering the full pipeline:

**Git → GitHub → Docker → Jenkins → AWS EC2**

## Local preview
Open `index.html` directly in a browser, or serve it:
```bash
python3 -m http.server 8000
```

## Run with Docker
```bash
docker build -t fish-market .
docker run -d -p 8080:80 fish-market
# visit http://localhost:8080
```

## CI/CD
See `Jenkinsfile` — builds the Docker image, pushes it to Docker Hub,
and deploys it to an AWS EC2 instance over SSH on every push to `main`.
