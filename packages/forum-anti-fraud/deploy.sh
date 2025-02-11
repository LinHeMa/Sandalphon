#!/bin/bash

# Load environment variables from .env.local
source .env.local

# Build your static website
yarn export

# Sync the local files with the GCS bucket based on the environment
gsutil -m rsync -r -d out/ gs://$GCS_BUCKET_NAME/$NEXT_PUBLIC_PROJECT_NAME
