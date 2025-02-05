# 빌드 스테이지
FROM node:20.11.1-slim AS builder

WORKDIR /usr/src/app

# pnpm만 전역 설치 (pm2 제거)
RUN npm install -g pnpm

COPY . .

# pnpm으로 의존성 설치
RUN pnpm install
RUN pnpm run build

# 빌드 완료 후 .env.production 파일 삭제
RUN rm -f .env.production

# 실행 스테이지
FROM node:20.11.1-slim

WORKDIR /usr/src/app

# 타임존 설정을 실행 스테이지로 이동
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul

# pm2 전역 설치 추가
RUN npm install -g pm2

COPY --from=builder /usr/src/app .


RUN apt-get update && apt-get install -y gnupg && \
    apt-key adv --refresh-keys --keyserver keyserver.ubuntu.com && \
    apt-get update && apt-get install -y ffmpeg inetutils-ping dnsutils vim

# 기본 포트 설정 (환경변수가 없을 경우 2000 사용, app-compose.yml에서 설정 된 PORT가 있다면 그 값을 사용)
ENV PORT=2000
# 웹소켓 포트 환경변수 추가
ENV WEBSOCKET_PORT=4900

# 환경변수로 설정된 포트를 EXPOSE에 사용
EXPOSE ${PORT}
# 웹소켓 포트 노출
EXPOSE ${WEBSOCKET_PORT} 

CMD ["bash", "-c", "node scripts/modifyPackageJson.cjs remove && pm2-runtime start ecosystem.config.cjs --env production"]