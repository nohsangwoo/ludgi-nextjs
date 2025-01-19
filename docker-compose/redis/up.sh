#!/bin/bash

# 스크립트가 위치한 디렉토리로 이동
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

docker compose -f ./redis-compose.yml down
docker compose -f ./redis-compose.yml up --build -d

# Redis 컨테이너가 완전히 시작될 때까지 잠시 대기
sleep 5

# Redis 비밀번호 설정
docker exec redis_cache redis-cli CONFIG SET requirepass ludgi1234

# 설정이 적용되었는지 확인 (경고 메시지 숨김)
docker exec redis_cache bash -c 'echo "PING" | redis-cli -a ludgi1234 2>/dev/null'
