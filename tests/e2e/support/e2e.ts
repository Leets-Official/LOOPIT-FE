// Cypress 커스텀 명령어 및 설정

// React Router SSR 개발 서버의 hydration 에러 무시
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Hydration failed') || err.message.includes('hydration mismatch')) {
    return false;
  }
  return true;
});
