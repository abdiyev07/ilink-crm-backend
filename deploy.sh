#!/bin/sh

git pull
npm run migration
npx pm2 stop 0
npx pm2 delete all
npx pm2 start dist/src/main.js --name ilink-backend
