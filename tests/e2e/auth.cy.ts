describe('로그인 필수 기능', () => {
  describe('구매 상세 페이지 로그인 모달', () => {
    beforeEach(() => {
      cy.visit('/buy/1');
      // SSR에서 데이터를 가져오므로 UI 요소 대기
      cy.get('button[aria-label="찜하기"]', { timeout: 10000 }).should('be.visible');
      // 모달 열기
      cy.get('button[aria-label="찜하기"]').click();
      cy.contains('로그인이 필요합니다').should('be.visible');
    });

    it('취소 클릭 시 모달이 닫힌다', () => {
      cy.contains('취소').click();

      cy.contains('로그인이 필요합니다').should('not.exist');
    });

    it('로그인 클릭 시 로그인 페이지로 이동한다', () => {
      cy.get('button').contains('로그인').click({ force: true });

      cy.url().should('include', '/login');
    });
  });
});
