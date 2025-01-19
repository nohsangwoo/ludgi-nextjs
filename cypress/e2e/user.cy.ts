describe('CRUD 기능 테스트', () => {
  const testEmail = 'testUser@example.com'
  const testUserName = 'testUser'
  const updatedName = 'updatedUser'

  beforeEach(() => {
    // 각 테스트 전에 캐시 및 쿠키 초기화
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('전체 CRUD 플로우를 순차적으로 테스트', () => {
    // 1. Create: 새 사용자 생성
    cy.visit('/usage/createExample')
    cy.wait(1000) // 페이지 로드 후 1초 대기

    cy.get('input[name="email"]').type(testEmail, { delay: 100 }) // 타이핑 속도 지연
    cy.get('input[name="name"]').type(testUserName, { delay: 100 })
    cy.get('input[name="password"]').type('Testuser1234!', { delay: 100 })
    cy.get('input[name="passwordConfirm"]').type('Testuser1234!', { delay: 100 })
    cy.wait(500) // 제출 전 0.5초 대기
    cy.get('button[type="submit"]').click()
    
    // 성공 알림 확인
    cy.on('window:alert', (text) => {
      expect(text).to.contains('성공적으로 생성되었습니다')
    })
    cy.wait(1000) // 알림 후 1초 대기

    // 2. Read: 생성된 사용자 확인
    cy.visit('/usage/readExample')
    cy.wait(1000) // 페이지 로드 후 1초 대기
    cy.contains(testEmail).should('be.visible')
    cy.contains(testUserName).should('be.visible')
    cy.wait(1000) // 확인 후 1초 대기

    // 3. Update: 사용자 정보 수정
    cy.visit('/usage/updateExample')
    cy.wait(1000) // 페이지 로드 후 1초 대기
    cy.get('input[name="email"]').type(testEmail, { delay: 100 })
    cy.get('input[name="name"]').type(updatedName, { delay: 100 })
    cy.wait(500) // 제출 전 0.5초 대기
    cy.get('button[type="submit"]').click()

    // 수정 성공 알림 확인
    cy.on('window:alert', (text) => {
      expect(text).to.contains('성공적으로 수정되었습니다')
    })

    cy.wait(1000) // 알림 후 1초 대기
    // 수정된 정보 확인
    cy.visit('/usage/readExample')
    cy.contains(testEmail).should('be.visible')
    cy.contains(updatedName).should('be.visible')
    cy.wait(1000) // 확인 후 1초 대기

    // 4. Delete: 사용자 삭제
    cy.visit('/usage/deleteExample')
    cy.get('input[name="email"]').type(testEmail, { delay: 100 })
    cy.wait(500) // 제출 전 0.5초 대기
    // 삭제 확인 다이얼로그 처리
    cy.on('window:confirm', () => true)
    cy.get('button[type="submit"]').click()

    // 삭제 성공 알림 확인
    cy.on('window:alert', (text) => {
      expect(text).to.contains('성공적으로 삭제되었습니다')
    })
    cy.wait(1000) // 알림 후 1초 대기

    // 삭제 확인
    cy.visit('/usage/readExample')
    cy.contains(testEmail).should('not.exist')
    cy.wait(1000) // 확인 후 1초 대기
  })

  // 에러 케이스 테스트
  it('유효성 검사 테스트', () => {
    cy.visit('/usage/createExample')
    
    // 잘못된 이메일 형식 테스트
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('button[type="submit"]').click()
    cy.contains('유효한 이메일 주소를 입력해주세요').should('be.visible')

    // 비밀번호 정책 테스트
    cy.get('input[name="password"]').type('weak')
    cy.get('button[type="submit"]').click()
    cy.contains('비밀번호는 최소 8자 이상이어야 합니다').should('be.visible')
  })
})