#!/bin/bash

# Deploy Astro site to S3 and invalidate CloudFront cache
# Usage: ./scripts/deploy-to-s3.sh [--dryrun]

set -e

BUCKET="barracuida-ai-landing"
PROFILE="personal"
DIST_DIR="dist"

# Get CloudFront distribution ID from Terraform outputs
cd terraform
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
cd ..

# Check if dry run
if [ "$1" == "--dryrun" ]; then
    echo "🔍 DRY RUN MODE - No changes will be made"
    aws s3 sync $DIST_DIR/ s3://$BUCKET --profile $PROFILE --delete --dryrun
    exit 0
fi

echo "📦 Syncing files to S3 bucket: $BUCKET"
aws s3 sync $DIST_DIR/ s3://$BUCKET --profile $PROFILE --delete \
    --cache-control "public,max-age=31536000,immutable" \
    --exclude "*.html" \
    --exclude "*.xml" \
    --exclude "*.txt"

# Sync HTML, XML, and TXT with different cache settings
aws s3 sync $DIST_DIR/ s3://$BUCKET --profile $PROFILE --delete \
    --cache-control "public,max-age=0,must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "*.xml" \
    --include "*.txt"

echo "✅ S3 sync complete!"

if [ -n "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache (ID: $DISTRIBUTION_ID)"
    aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" \
        --profile $PROFILE \
        --no-cli-pager
    echo "✅ CloudFront invalidation started!"
else
    echo "⚠️  Could not get CloudFront distribution ID from Terraform"
    echo "   Run: cd terraform && terraform output cloudfront_distribution_id"
fi

echo "🚀 Deployment complete!"
