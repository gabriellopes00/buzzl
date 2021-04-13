#!/usr/bin/env bash

set -e

API_ROOT_DIR=$(pwd)

SCRIPT_DIR=$(
  cd $(dirname "$0")
  pwd
)

clear() {
    rm -rf ./dist/*
}

build() {
    ./node_modules/.bin/tsc --project tsconfig-build.json --skipLibCheck
}

copy() {
    cp ./package.json ./dist/package.json
    cp ./.env ./dist/.env
    cp ./yarn.lock ./dist/yarn.lock
}

install() {
    cd ./dist
    yarn install --production --frozen-lockfile
    cd ..
}

setup(){
  echo "#!/usr/bin/env bash" > dist/run.sh
  echo "" >> dist/run.sh
  echo "node src/app/server.js" >> dist/run.sh
}

compile() {
    clear
    build
    copy
    install
    setup
}

start() {
    cd "$SCRIPT_DIR" && cd ..
    compile
    cd "$API_ROOT_DIR"
}

start
