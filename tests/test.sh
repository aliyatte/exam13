#!/bin/bash

REL_PATH=`dirname $0`
cd ${REL_PATH}
CURRENT_DIR=`pwd`

echo ${CURRENT_DIR}
cd ${CURRENT_DIR}


echo '##################'
echo "# Running tests! #"
echo '##################'

echo '# API'

cd ../server

echo '# Running fixtures'
NODE_ENV=test npm run seed

echo '# Running API server in test mode'
pm2 start "npm run start:test" --name="mock-server-test"

echo '# Running client in test mode'
cd ../client
pm2 start "npm run start:test" --name="mock-client-test"

while ! nc -z localhost 3010; do
    sleep 0.1
done

echo "# Running tests"
cd ../tests
echo "$@"
npx codeceptjs run --steps "$@"
EXIT_CODE=$?

echo '# Killing test processes'
pm2 kill

echo ${EXIT_CODE}