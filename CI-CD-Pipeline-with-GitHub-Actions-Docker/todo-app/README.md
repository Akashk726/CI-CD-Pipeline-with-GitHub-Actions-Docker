# To-Do List App with CI/CD

A simple To-Do List application built with HTML, CSS, JavaScript, and Bootstrap, deployed via a CI/CD pipeline using GitHub Actions, Docker, and Minikube. Users can add, edit, delete, and mark tasks as complete, with tasks persisted in the browser's localStorage.

## Features
- Add new tasks with a user-friendly interface.
- Edit existing tasks inline.
- Mark tasks as complete or undo completion.
- Delete tasks.
- Responsive design with Bootstrap.
- Automated CI/CD pipeline for testing, building, and deploying.

## Prerequisites
- GitHub account
- Docker Hub account
- Docker (`docker --version`)
- Minikube (`minikube version`)
- kubectl (`kubectl version --client`)
- Node.js 20 (`node --version`)
- Git (`git --version`)

## Project Structure
```
todo-app/
├── .github/workflows/ci-cd.yml
├── src/
│   ├── index.html
│   └── assets/
│       ├── css/styles.css
│       └── js/script.js
├── tests/test_index.test.js
├── deploy/
│   ├── deployment.yml
│   └── service.yml
├── docs/
│   └── CICD_GUIDE.md
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install Dependencies** (for testing):
   ```bash
   npm install
   ```

3. **Test Locally with Docker Compose**:
   Set environment variables:
   ```bash
   export DOCKERHUB_USERNAME=your_username
   export TAG=latest
   ```
   Run:
   ```bash
   docker-compose up --build
   ```
   Access at `http://localhost:8080`.

4. **Deploy with Minikube**:
   Update `deploy/deployment.yml` with your Docker Hub username:
   ```yaml
   image: your_username/todo-app:latest
   ```
   Deploy:
   ```bash
   minikube start
   kubectl apply -f deploy/deployment.yml
   kubectl apply -f deploy/service.yml
   minikube service todo-app-service --url
   ```

5. **Run Tests**:
   ```bash
   npm test
   ```

## CI/CD Pipeline
- **Trigger**: Push or pull request to `main`.
- **Steps**:
  - Runs Jest tests to verify HTML structure.
  - Builds and pushes Docker image to `docker.io/your_username/todo-app:latest`.
- **Configuration**: `.github/workflows/ci-cd.yml`.
- **Secrets**:
  - `DOCKERHUB_USERNAME`: Your Docker Hub username.
  - `DOCKERHUB_TOKEN`: Your Docker Hub access token.

## Deliverables
- **GitHub Repository**: `https://github.com/your-username/todo-app`
- **Docker Image**: `docker.io/your_username/todo-app:latest`
- **CI/CD Results**: GitHub Actions tab
- **Screenshots**:
  - Workflow run: GitHub Actions logs
  - Deployed app: Browser with tasks

## Troubleshooting
- **Jest Test Failure ("TextEncoder is not defined")**:
  - Ensure Node.js 20 (`node --version`).
  - Verify `tests/test_index.test.js` includes:
    ```javascript
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
    ```
  - Run `npm test` locally.
- **Jest Test Failure ("No tests found")**:
  - Ensure `tests/test_index.test.js` exists.
  - Verify `package.json` includes:
    ```json
    "testMatch": ["**/tests/**/*.js", "**/?(*.)+(spec|test).js"]
    ```
- **Minikube Issues**: See `docs/CICD_GUIDE.md`.
- **CI/CD Failures**: Check Actions logs and secrets.
- **App Issues**: Verify `index.html` asset paths (`/assets/...`).

## Documentation
See `docs/CICD_GUIDE.md` for detailed CI/CD setup and troubleshooting.