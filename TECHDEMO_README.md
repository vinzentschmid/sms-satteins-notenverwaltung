# GitHub Actions Workflows Documentation

## Overview

This documentation details the three GitHub Actions workflows implemented in my projectwork. Each workflow is designed to automate specific aspects of the continuous integration and deployment process, catering to database management, front-end, and back-end deployments.

### Workflow 1: Database Versioning

#### Name

Get the latest version of the database

#### Trigger

Manually via `workflow_dispatch`.

#### Purpose

This workflow is dedicated to managing the PostgreSQL database schema. It provides a manual control mechanism to update the database schema, ensuring that changes are deliberate and controlled.

#### Detailed Steps

1. **Checkout Code**: Retrieves the latest version of the repository code.
2. **Install PostgreSQL Client**: Installs the PostgreSQL client on the runner to facilitate database operations.
3. **Drop and Recreate Schema**: Connects to the PostgreSQL database and executes commands to drop the existing schema and then recreate it. This step ensures that the database is reset to a clean state.
4. **Restore Schema from Backup**: Loads the schema from a predefined backup file. This step is crucial for restoring the database to a specific version or state.

### Workflow 2: Angular App Deployment

#### Name

Build and Deploy Angular App to Azure Web App

#### Triggers

- On push to the `main` branch.
- Manually via `workflow_dispatch`.

#### Purpose

Automates the process of building and deploying the Angular front-end application to an Azure Web App service.

#### Detailed Steps

1. **Checkout Code**: Retrieves the source code from the repository.
2. **Setup Node.js**: Configures the Node.js environment, ensuring the correct version for the Angular application.
3. **Install Dependencies**: Runs `npm install` to install all necessary npm packages as specified in `package.json`.
4. **Build Angular App**: Executes the Angular build process, targeting the production environment.
5. **Upload Build Artifacts**: Uploads the build artifacts (compiled code) for use in the subsequent deployment job.
6. **Deploy to Azure Web App**: Downloads the build artifacts and deploys them to the specified Azure Web App.

### Workflow 3: ASP.Net Core App Deployment

#### Name

Build and deploy ASP.Net Core app to Azure Web App - restapinotenverwaltung

#### Triggers

- On push to the `main` branch.
- Manually via `workflow_dispatch`.

#### Purpose

This workflow focuses on the ASP.NET Core backend application, handling its building and deployment to Azure Web App.

#### Detailed Steps

1. **Checkout Code**: Clones the repository to access the ASP.NET Core application source code.
2. **Setup .NET Core Environment**: Configures the .NET Core SDK and runtime on the GitHub Actions runner.
3. **Build with dotnet**: Compiles the ASP.NET Core application, ensuring it's ready for deployment.
4. **dotnet Publish**: Publishes the application to a folder, preparing it as a deployment package.
5. **Upload Artifact for Deployment Job**: Uploads the compiled application for deployment.
6. **Deploy to Azure Web App**: Deploys the .NET application to the specified Azure Web App.

## Additional Information

- It's crucial to ensure all GitHub secrets and Azure credentials are securely stored and correctly referenced in the workflows.
- Testing these workflows in a non-production environment is recommended to validate their functionality.
- Regularly update and maintain these workflows to adapt to any changes in the project infrastructure or dependencies.
