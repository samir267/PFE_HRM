# Vault Setup and Config Guide for msrv-template

Welcome to the **msrv-template** project! This guide explains how we handle environment settings securely using HashiCorp Vault and our `envConfig` module. It’s written for our team to quickly understand how to set up Vault, load configurations, and keep things running smoothly. We use Node.js, Express, TypeScript, and MongoDB, so this should feel familiar if you’re working on the project.

## What’s This About?
We store sensitive info—like MongoDB passwords and JWT secrets—in Vault, a secure tool, instead of plain `.env` files. The `env.config.ts` file grabs these secrets and combines them with safe settings (like port numbers) from `.env` files. This keeps our app secure and makes it easy to switch between dev, test, and prod environments.

**Why it matters**:
- **Safe**: No passwords in code or Git.
- **Simple**: One way to manage settings for everyone.
- **Team-friendly**: Clear steps to get started.

**What you’ll learn**:
- How to use `envConfig` to get settings.
- How to set up Vault with `./setup-vault.sh`.
- Tips to avoid common issues.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Using `envConfig`](#using-envconfig)
3. [Setting Up Vault](#setting-up-vault)
4. [Working with Secrets](#working-with-secrets)
5. [Tips for Success](#tips-for-success)
6. [Fixing Problems](#fixing-problems)

## Quick Start
To get going:
1. Clone the project: `git clone <repo-url>`.
2. Install dependencies: `npm install`.
3. Set up Vault: `chmod +x ./setup-vault.sh && ./setup-vault.sh`.
4. Create `.env.dev` from `.env.example`:
   ```bash
   cp .env.example .env.dev