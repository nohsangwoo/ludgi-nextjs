module.exports = {
  apps: [
    {
      name: 'ludgi', // 애플리케이션 이름
      script: '/usr/src/app/dist/server/index.js', // 실행할 스크립트 경로
      watch: false, // 파일 변경 감지 시 자동 재시작 활성화
      ignore_watch: [
        'node_modules',
        'logs',
        'downloads',
        '.git',
        'tmp',
        '*.log'
      ], // 파일 감시에서 제외할 디렉토리/파일

      // 프로세스 관리 설정
      // instances: 'max', // CPU 코어 수만큼 인스턴스 생성
      // exec_mode: 'cluster', // 클러스터 모드로 실행 (로드 밸런싱)
      // autorestart: true, // 프로세스 크래시 시 자동 재시작
      max_memory_restart: '7G', // 메모리 사용량이  지정용량 초과시 재시작

      // 로그 관련 설정
      // merge_logs: true, // 모든 인스턴스의 로그를 하나의 파일로 병합
      // log_date_format: 'YYYY-MM-DD HH:mm:ss', // 로그 타임스탬프 포맷
      // error_file: 'logs/err.log', // 에러 로그 파일 경로
      // out_file: 'logs/out.log', // 일반 로그 파일 경로

      // 환경변수 설정
      // env: {
      //   NODE_ENV: 'development',
      // },
      // env_production: {
      //   NODE_ENV: 'production',
      // },

      // 성능 관련 설정
      // node_args: '--max-old-space-size=1536', // Node.js 힙 메모리 제한
      // wait_ready: true, // ready 이벤트 대기
      // kill_timeout: 3000, // 종료 전 대기 시간 (ms)
    },
  ],
}