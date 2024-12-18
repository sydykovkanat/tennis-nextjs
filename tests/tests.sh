#!/bin/bash

REL_PATH=$(dirname "$0")
CURRENT_DIR=$(pwd)

if ! command -v pm2 &> /dev/null
then
  echo "pm2 is not installed or not in PATH"
  exit 1
fi

echo '######################'
echo '### Running tests! ###'
echo '######################'

echo '### Killing test backend and frontend before running tests'
pm2 kill

echo '### API'

cd ../backend || exit 1

echo '### Running fixtures'
npm run seed:test

echo '### Running API server in test mode'
pm2 start "npm run start:test" --name="API-tests"

echo '### Frontend'
cd ../frontend || exit 1

echo '### Running Frontend in test mode'
pm2 start "npm run start:test" --name="Frontend-tests"

while ! nc -z localhost 5183; do
  sleep 0.1
done

echo '### Running tests'

cd '../tests' || exit 1
npx codeceptjs run --steps "$@"
EXIT_CODE=$?

echo '### Killing test processes'
pm2 kill

exit ${EXIT_CODE}
