#!/bin/sh

# Run npm install
npm install

if [ "$ENV_VAR_NAME" = "production" ]; then
  npx tsc -p ./tsconfig.json
  npm run start

elif [ "$ENV_VAR_NAME" = "development" ]; then
  npm install sqlite3
  npm run dev
fi