# CI/CD Pipeline Guide for To-Do List App

This guide details the implementation of a CI/CD pipeline for a To-Do List application built with HTML, CSS, JavaScript, and Bootstrap. The pipeline uses GitHub Actions, Docker, Docker Hub, and Minikube to automate testing, building, and local deployment.

## Project Overview
The To-Do List app allows users to add, edit, delete, and mark tasks as complete, with tasks stored in localStorage. It’s served via Nginx in a Docker container, tested with Jest, and deployed using Minikube.

## Prerequisites
- GitHub account
- Docker Hub account
- Docker
- Minikube
- kubectl
- Node.js 20
- Git

## Implementation Steps

### Step 1: Set Up Project Structure
- Created directories: `src/`, `tests/`, `.github/workflows/`, `deploy/`, `docs/`.
- Initialized Git repository.
- Commands:
  ```bash
  mkdir todo-app
  cd todo-app
  git init
  mkdir -p src/assets/{css,js} tests .github/workflows deploy docs
  ```

### Step 2: Create To-Do List Application
- Files: `src/index.html`, `src/assets/css/styles.css`, `src/assets/js/script.js`.
- Features: Add, edit, delete, toggle tasks; Bootstrap styling; localStorage persistence.

### Step 3: Add Testing
- File: `tests/test_index.test.js` with Jest and jsdom.
- Tests verify HTML structure.
- Fixed `TextEncoder` error with `util` polyfill.
- Setup:
  ```bash
  npm init -y
  npm install --save-dev jest jest-environment-jsdom
  npm test
  ```

### Step 4: Create Docker Configuration
- Files: `Dockerfile`, `docker-compose.yml`.
- `Dockerfile`: Uses `nginx:alpine`, copies `src/` to `/usr/share/nginx/html/`.
- `docker-compose.yml`: Maps port 8080 to 80.
- Test:
  ```bash
  export DOCKERHUB_USERNAME=your_username
  export TAG=latest
  docker-compose up --build
  ```

### Step 5: Configure GitHub Actions
- File: `.github/workflows/ci-cd.yml`.
- Runs tests, builds, and pushes Docker image.
- Setup:
  - Create GitHub repository.
  - Add secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`.
  - Push code:
    ```bash
    git remote add origin https://github.com/your-username/todo-app.git
    git push -u origin main
    ```

### Step 6: Deploy Locally with Minikube
- Files: `deploy/deployment.yml`, `deploy/service.yml`.
- Deploys 1 pod and exposes via NodePort.
- Commands:
  ```bash
  minikube start
  kubectl apply -f deploy/deployment.yml
  kubectl apply -f deploy/service.yml
  minikube service todo-app-service --url
  ```

### Step 7: Capture Deliverables
- Repository: `https://github.com/your-username/todo-app`
- Image: `docker.io/your_username/todo-app:latest`
- CI/CD Results: GitHub Actions logs
- Screenshots: Workflow run, app in browser

## Troubleshooting

### Step 5: GitHub Actions
#### Jest Test Failure ("TextEncoder is not defined")
- **Symptoms**: `ReferenceError: TextEncoder is not defined`.
- **Solutions**:
  - Ensure Node.js 20.
  - Verify `tests/test_index.test.js` includes:
    ```javascript
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
    ```
  - Test locally:
    ```bash
    npm install
    npm test
    ```

#### Jest Test Failure ("No tests found")
- Ensure `tests/test_index.test.js` exists.
- Verify `package.json`:
  ```json
  "testMatch": ["**/tests/**/*.js", "**/?(*.)+(spec|test).js"]
  ```

### Step 6: Minikube Deployment
#### Minikube Fails to Start
- Increase resources:
  ```bash
  minikube start --cpus=2 --memory=4096
  ```
- Use Docker driver:
  ```bash
  minikube start --driver=docker
  ```

#### Pod Fails (ImagePullBackOff)
- Verify image:
  ```bash
  docker pull your_username/todo-app:latest
  ```
- Re-run CI/CD:
  ```bash
  git commit --allow-empty -m "Trigger CI/CD"
  git push origin main
  ```

#### Service URL Not Working
- Use `minikube tunnel`:
  ```bash
  minikube tunnel
  minikube service todo-app-service --url
  ```
- Test port-forward:
  ```bash
  kubectl port-forward <pod-name> 8080:80
  ```