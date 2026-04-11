# Deployment & CI/CD (Firebase Hosting)

This project uses Astro static output and deploys to Firebase Hosting.

## Build Output
- Build command: `npm run build`
- Output directory: `dist`
- Hosting public directory: `dist` (configured in `firebase.json`)

## GitHub Actions Workflows

### 1) Live deployment
- Workflow: `.github/workflows/firebase-hosting-live.yml`
- Trigger: push to `main`
- Behavior:
  1. Checkout
  2. Setup Node.js 20
  3. `npm ci`
  4. `npm run build`
  5. Deploy to Firebase live channel

### 2) PR preview deployment
- Workflow: `.github/workflows/firebase-hosting-preview.yml`
- Trigger: pull request (`opened`, `synchronize`, `reopened`)
- Behavior:
  1. Checkout
  2. Setup Node.js 20
  3. `npm ci`
  4. `npm run build`
  5. Deploy preview channel and comment preview URL on PR

## Required GitHub Secrets
Add this repository secret:

- `FIREBASE_SERVICE_ACCOUNT_PROTOFILO_64439`

Value must be the full JSON of a Firebase service account key with Hosting deploy permissions.

## How to create/update the service account secret safely
1. In Firebase Console -> Project Settings -> Service accounts.
2. Generate a new private key JSON for deployment automation.
3. In GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret.
4. Name: `FIREBASE_SERVICE_ACCOUNT_PROTOFILO_64439`.
5. Paste JSON content exactly and save.

## Secret rotation
1. Generate a new service account key JSON.
2. Update `FIREBASE_SERVICE_ACCOUNT_PROTOFILO_64439` with the new JSON.
3. Revoke/delete old key from Google Cloud IAM.
4. Trigger a test deploy (push/PR) and verify success.

## Notes
- Manual deploy remains supported:
  - `npm run build`
  - `firebase deploy`
- Preview workflow is intentionally disabled for forked PRs to keep secrets safe.
