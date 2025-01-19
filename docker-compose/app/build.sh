#!/bin/bash

# 스크립트가 위치한 디렉토리로 이동
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

docker builder prune  
docker compose -f ./app-compose.yml down
docker compose -f ./app-compose.yml up --build -d
