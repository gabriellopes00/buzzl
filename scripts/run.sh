#!/usr/bin/env bash

set -e

API_ROOT_DIR=$(pwd)

SCRIPT_DIR=$(
  cd $(dirname "$0")
  pwd
)

run() {
  cd "$SCRIPT_DIR" && cd ..
  yarn install --production --frozen-lockfile
  node src/app/server.js
  cd "$API_ROOT_DIR"
}

run
