FROM redis:latest

COPY redis.conf /usr/local/etc/redis/redis.conf

# Redis 서버 시작 시 설정 파일을 사용하도록 CMD 수정
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

EXPOSE 6379 