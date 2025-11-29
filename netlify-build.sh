#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci --legacy-peer-deps

echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
