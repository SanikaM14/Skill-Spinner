# Skill Spinner

Skill Spinner is a modern web application designed to help users track and manage their learning progress across various topics. The application provides an interactive interface for creating custom skill paths, managing predefined skills, and visualizing completion rates.

## Table of Contents

- [Demo](#demo)
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Production Build](#production-build)
- [Docker Integration](#docker-integration)
  - [Building the Image](#building-the-image)
  - [Running the Container](#running-the-container)

## Demo

Watch the video below to see how the application works:

<video controls src="src/read.mp4" title="Skill Spinner Demo" width="100%"></video>

## Overview

The application is built using Angular and follows a feature-based architecture for scalability and maintainability. Data persistence is handled entirely via the browser's Local Storage, ensuring a seamless and responsive user experience without the need for an external database backend.

## Technology Stack

- **Framework**: Angular 
- **Language**: TypeScript, HTML5, CSS3
- **Styling**: Vanilla CSS, Bootstrap Icons
- **Package Manager**: npm
- **Containerization**: Docker, Nginx
- **Data Storage**: Browser Local Storage

## Features

- **Skill Management**: View, create, and delete skills and their associated sub-skills.
- **Progress Tracking**: Track completion percentage for individual topics.
- **Customization**: Users can define their own learning paths with estimated times and resources.
- **Data Persistence**: All data is saved to the local storage, allowing progress to be retained across sessions.
- **Responsive Design**: The application interface adapts to various screen sizes.

## Folder Structure

The project directory follows Angular best practices, separating core functionality from specific features.

```text
skill-spinner/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/            # Data models and interfaces
│   │   │   │   └── skill.model.ts
│   │   │   └── services/          # Singleton services (e.g., Local Storage handling)
│   │   │       └── skill-storage.service.ts
│   │   ├── features/
│   │   │   └── skills/            # Feature module for skill management
│   │   │       └── components/
│   │   │           ├── skill-card/
│   │   │           ├── skill-creator/
│   │   │           ├── skill-selector/
│   │   │           └── skill-view/
│   │   ├── app-routing.module.ts  # Application routing configuration
│   │   ├── app.component.css      # Root component styles
│   │   ├── app.component.html     # Root component template
│   │   ├── app.component.ts       # Root component logic
│   │   └── app.module.ts          # Main application module
│   ├── assets/                    # Static assets
│   ├── favicon.ico
│   ├── index.html                 # Main HTML entry point
│   ├── main.ts                    # Application bootstrap entry point
│   └── styles.css                 # Global stylesheets
├── angular.json                   # Angular CLI configuration
├── Dockerfile                     # Docker multi-stage build configuration
├── nginx.conf                     # Nginx server configuration
├── package.json                   # Project dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

## Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (version 18.x or higher)
- npm (Node Package Manager)
- Angular CLI

### Local Development

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
   Or using Angular CLI directly:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200/`.

### Production Build

To build the project for production, run:

```bash
npm run build
```
The build artifacts will be stored in the `dist/skill-spinner` directory.

## Docker Integration

The application includes a `Dockerfile` that uses a multi-stage build process. It first compiles the Angular application using a Node.js image, and then serves the static files using a lightweight Nginx image.

### Building the Image

To build the Docker image, run the following command in the root directory:

```bash
docker build -t skill-spinner:latest .
```

### Running the Container

Once the image is built, you can run it as a container:

```bash
docker run -d -p 8080:80 --name skill-spinner-app skill-spinner:latest
```

The application will be accessible at `http://localhost:8080/`.
