# node version

- v22.12.0

# 패키지 설치 및 실행

```bash
# pnpm install
pnpm install

```

# project 실행

```bash
pnpm run dev
```

# postgres setting

```bash
# up
  cd docker-compose/postgres
  docker compose -f postgres-compose.yml up --build -d
```

```bash
# exec
  docker exec -it postgres_db bash
```

### 접속이 된다면 prisma 설정을 진행하여 db생성 및 연결을 진행합니다. prisma의 기본 설정된 데이터베이스 이름은 mydb 입니다.

```bash
# psql connect
  psql -U postgres -d mydb
```

```bash
# down
  docker-compose -f postgres-compose.yml down
```

```bash
#   volume
  docker volume ls
```

```bash
# volume inspect
  docker volume inspect postgres_db_volume
```

```bash
# volume remove
  docker volume rm postgres_db_volume
```

```bash
# show port
  psql -U postgres -d mydb -c "SHOW PORT;"
```

```bash
# show all user
  psql -U postgres -d mydb -c "\du"
```

```bash
# show all database
  psql -U postgres -d mydb -c "\l"
```

```bash
# create database
  psql -U postgres -d mydb -c "CREATE DATABASE mydb;"
```

```bash
# create table
  psql -U postgres -d mydb -c "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255));"
```

```bash
# create user
  psql -U postgres -d mydb -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
```

```bash
# grant all privileges on database mydb to myuser;
  psql -U postgres -d mydb -c "GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;"
```

# prisma setting

- ref: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql

```bash
# prisma migrate
  npx prisma migrate dev
```

```bash
# prisma studio
npx prisma studio
```

# prisma code generate

```bash
# prisma code generate
  npx prisma generate
```

# prisma studio

npx prisma studio

# graphql codegen

- ref: https://www.npmjs.com/package/graphql
- ref: https://the-guild.dev/graphql/codegen

# analyze

- ref: https://www.npmjs.com/package/@next/bundle-analyzer

```bash
# analyze
  npx run analyze
```

# cli usage

commander와 inquirer의 조합으로 사용자가 쉽게 사용할 수 있도록 구성되었습니다.

```bash
# version
  npx ludgi-cli -V
```

```bash
# create
  npx ludgi-cli -n getUserProfile
```

```bash
# delete
  npx ludgi-cli -d
```

```bash
# list
  npx ludgi-cli -l
```

# react hook form with zod

- ref: https://react-hook-form.com/get-started#SchemaValidation
- ref: https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod

# next-safe-action

- ref: https://next-safe-action.dev/docs/getting-started

# 왜 고민 nextjs와 shadcn 홈피 톤과 디자인처럼 동일하게 구현

docker builder prune  
docker compose -f app-compose.yml down
docker compose -f app-compose.yml up --build -d
docker compose -f docker-compose/app/app-compose.yml up --build -d

# 왜 고민 nextjs와 shadcn 홈피 톤과 디자인처럼 동일하게 구현

# eslint

- ref: https://nextjs.org/docs/app/api-reference/config/eslint
- ref: https://github.com/prettier/eslint-config-prettier

# storybook

- ref: https://storybook.js.org/
- npm run storybook

# cypress

- ref: https://www.cypress.io/
- npm run cy:open

# redis

- ref: https://redis.io/

```bash
  # 컨테이너 실행 자동 스크립트
  sh docker-compose/redis/up.sh
```

```bash
  # 컨테이너 실행 (백그라운드에서)
  docker compose -f docker-compose/redis/redis-compose.yml up -d

  # 비밀번호 설정 - 비밀번호를 변경하시면 .env 파일에도 변경해주세요.
  docker exec redis_cache redis-cli CONFIG SET requirepass ludgi1234

  # 비밀번호 설정 확인
  docker exec redis_cache bash -c 'echo "PING" | redis-cli -a ludgi1234 2>/dev/null'
```

```bash
  # 컨테이너 중지
  docker compose -f docker-compose/redis/redis-compose.yml down
```

```bash
# redis-cli in docker
  docker exec -it redis_cache redis-cli
```

# 더미 데이터 생성

- 더미 데이터 생성
  npx tsx scripts/createDummyData.ts

# rabbitqm

- 컨테이너 실행 (백그라운드에서)
  docker compose -f docker-compose/rabbitmq/rabbitmq-compose.yml up -d

- 컨테이너 중지
  docker compose -f docker-compose/rabbitmq/rabbitmq-compose.yml down

접속( rabbitmq-compose.yml 설정에서 변경하세요.)
http://localhost:15672/
기본 아이디: admin
기본 비밀번호: admin123

# prometheus and grafana

```bash
docker compose -f docker-compose/prometheus_grafana/prometheus-grafana-compose.yml up -d
```

Prometheus 웹 UI: http://localhost:9090

Grafana 웹 UI: http://localhost:8081

# nextjs와 연동

npm install prom-client

- endpoint: /api/metrics
- example api: /api/example

# Graphql

### 필드 셀렉션 (Field Selection)

- ref:
- ref: https://www.graphql-java.com/documentation/field-selection/

### 리졸버 (Resolver)

- ref: https://graphql.org/learn/execution/


| 타입 정의 | 설명                                 | 예시                |
|-----------|-------------------------------------|---------------------|
| 루트 타입   | API 요청의 진입점                   | Query, Mutation 등  |
| 커스텀 타입 | 루트 타입에서 사용되는 데이터 구조     | User, Post, Comment |


### graphql-ws doc
- ref: https://github.com/enisdenjo/graphql-ws/blob/master/README.md