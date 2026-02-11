// Cypress 커스텀 명령어 및 설정

// React Router SSR 개발 서버의 hydration 에러 및 Cypress 내부 폰트 요청 404 무시
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Hydration failed') || err.message.includes('hydration mismatch')) {
    return false;
  }
  if (err.message.includes('No route matches URL') && err.message.includes('fonts')) {
    return false;
  }
  return true;
});
