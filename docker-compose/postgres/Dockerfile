FROM postgres:latest

# 필요한 추가 패키지 설치
RUN apt-get update && apt-get install -y vim && apt-get clean

# 데이터 디렉토리 유지
VOLUME /var/lib/postgresql/data

# 기본 포트 노출
EXPOSE 5432