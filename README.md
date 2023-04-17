# RareWeave UI

Welcome to the RareWeave UI repository on GitHub! RareWeave is an NFT marketplace built on top of the Arweave blockchain network. Our platform allows users to buy, sell, and trade unique digital assets with ease and security. This repository contains the frontend code for the RareWeave marketplace, which is hosted at rareweave.store.

This project is built using [Nuxt.js](https://nuxtjs.org), a powerful Vue.js framework that enables server-rendered applications, static site generation, and more.

## Table of Contents

1. [Setup](#setup)
2. [Development Server](#development-server)
3. [Production](#production)

## Setup
To get started with the RareWeave UI, first ensure that you have [Node.js](https://nodejs.org/en) and [Yarn](https://yarnpkg.com) installed on your system. Once you have these prerequisites, follow the steps below:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/RareWeave/rareweave-ui.git
```
2. Navigate to the project directory:
```bash
cd rareweave-ui
```
3. Install the required dependencies using Yarn:
```bash
yarn install
```

## Development Server

To start the development server and run the RareWeave UI locally, use the following command:
```bash
yarn dev
```

This will start the development server on http://localhost:3000. Open your browser and navigate to this URL to see the RareWeave UI in action. Any changes you make to the source code will be automatically reflected in your browser, thanks to hot module replacement.

## Production

When you're ready to build the RareWeave UI for production (dist/ static dir), use the following command:
```bash
yarn generate
```

This command will build the application for production, generating an optimized version of the RareWeave UI that is suitable for deployment.
