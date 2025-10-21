# Deployment Guide

This guide explains how to deploy the password-strength application using GitHub Actions and DockerHub to Google Cloud Run.

## Prerequisites

1. Install Google Cloud SDK: https://cloud.google.com/sdk/docs/install
2. Authenticate with Google Cloud:
   ```bash
   gcloud auth login
   ```
3. Set your project ID:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
4. Enable required APIs:
   ```bash
   gcloud services enable run.googleapis.com
   ```

## GitHub Actions Setup

The project uses GitHub Actions to automatically build and push Docker images to DockerHub.

### Required GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

1. `DOCKERHUB_USERNAME` - Your DockerHub username
2. `DOCKERHUB_TOKEN` - DockerHub access token (create at https://hub.docker.com/settings/security)

### Workflow Triggers

The workflow (`.github/workflows/docker-publish.yml`) runs on:
- Push to `main` branch - builds and pushes with `latest` tag
- Version tags (e.g., `v1.0.0`) - builds and pushes with semantic version tags
- Pull requests - builds only (no push)

### Tagging Strategy

Images are tagged automatically:
- `latest` - latest main branch build
- `main-<sha>` - commit SHA on main branch
- `v1.0.0`, `v1.0`, `v1` - semantic version tags (when you create git tags)

## Deploy to Cloud Run

After GitHub Actions builds and pushes your image to DockerHub, deploy to Cloud Run:

```bash
gcloud run deploy password-strength \
  --image docker.io/YOUR_DOCKERHUB_USERNAME/password-strength:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

Replace `YOUR_DOCKERHUB_USERNAME` with your actual DockerHub username.

### Local Docker Testing

Test the Docker image locally before deploying:

```bash
# Build the image
docker build -t password-strength .

# Run the container
docker run -p 8080:8080 password-strength

# Visit http://localhost:8080
```

## Automated Deployment Workflow

1. **Push to GitHub**: Push your code to the `main` branch or create a version tag
2. **GitHub Actions Build**: The workflow automatically builds and pushes to DockerHub
3. **Deploy to Cloud Run**: Deploy the image from DockerHub to Cloud Run (manual or automated)

### Creating Version Releases

To create a versioned release:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will trigger the GitHub Actions workflow and create multiple tags: `v1.0.0`, `v1.0`, and `v1`.

## Configuration Options

### Customize GitHub Actions Workflow

Edit `.github/workflows/docker-publish.yml` to:
- Change the Docker image name
- Modify build platforms (currently builds for amd64 and arm64)
- Adjust tagging strategy
- Add additional build steps

### Cloud Run Configuration

Modify the `gcloud run deploy` command to:
- **Region**: Change `us-central1` to your preferred region
- **Service name**: Change `password-strength` to your preferred name
- **Authentication**: Remove `--allow-unauthenticated` to require authentication
- **Resources**: Add `--memory 512Mi` or `--cpu 2` to adjust resources

### Environment Variables

To add environment variables to your Cloud Run service:

```bash
gcloud run deploy password-strength \
  --image docker.io/YOUR_DOCKERHUB_USERNAME/password-strength:latest \
  --set-env-vars "KEY1=VALUE1,KEY2=VALUE2"
```

## Monitoring and Logs

View logs:
```bash
gcloud run services logs read password-strength --region us-central1
```

View service details:
```bash
gcloud run services describe password-strength --region us-central1
```

## Cost Optimization

Cloud Run charges for:
- CPU and memory allocated during request processing
- Number of requests
- Networking

Tips:
- Cloud Run auto-scales to zero when not in use
- First 2 million requests per month are free
- Consider setting `--max-instances` to control costs

## Troubleshooting

### GitHub Actions build fails
- Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are set correctly
- Check GitHub Actions logs in the Actions tab
- Ensure your DockerHub account has space for new images

### Local Docker build fails
- Check that `next.config.ts` has `output: 'standalone'`
- Verify all dependencies in `package.json` are correct
- Try clearing Docker cache: `docker builder prune`

### Cloud Run deployment fails
- Verify the image exists on DockerHub
- Check that the image name and tag are correct
- Ensure you have permissions to deploy to Cloud Run

### Service won't start
- Check logs: `gcloud run services logs read password-strength`
- Ensure PORT is set to 8080 in the Dockerfile
- Verify the image works locally first

### Pull from DockerHub fails
- Make sure the image is public on DockerHub, or
- Configure Cloud Run to use DockerHub credentials for private images
