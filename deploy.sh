#!/bin/sh

git pull
npm run migration
docker build --target production -t ilink-crm-api .
docker-compose down --remove-orphans
docker-compose up -d
docker system prune --volumes --force
