describe('로그인 필수 기능', () => {
  beforeEach(() => {
    cy.fixture('posts').then((posts) => {
      cy.intercept('GET', /\/sell-post(?:\?|$)/, {
        statusCode: 200,
        body: { data: posts.list },
      }).as('getPosts');

      cy.intercept('GET', /\/sell-post\/detail\/\d+/, {
        statusCode: 200,
        body: { data: posts.detail },
      }).as('getPostDetail');
    });
  });

  describe('구매 상세 페이지', () => {
    beforeEach(() => {
      cy.visit('/buy/1');
      cy.wait('@getPostDetail');
    });

    it('비로그인 상태에서 찜하기 버튼 클릭 시 로그인 모달이 표시된다', () => {
      cy.get('button[aria-label="찜하기"]').click();

      cy.contains('로그인이 필요합니다').should('be.visible');
      cy.contains('로그인 페이지로 이동하시겠습니까').should('be.visible');
    });

    it('비로그인 상태에서 연락하기 버튼 클릭 시 로그인 모달이 표시된다', () => {
      cy.contains('판매자와 연락하기').click();

      cy.contains('로그인이 필요합니다').should('be.visible');
    });

    it('로그인 모달에서 취소 클릭 시 모달이 닫힌다', () => {
      cy.get('button[aria-label="찜하기"]').click();
      cy.contains('로그인이 필요합니다').should('be.visible');

      cy.contains('취소').click();

      cy.contains('로그인이 필요합니다').should('not.exist');
    });

    it('로그인 모달에서 로그인 클릭 시 로그인 페이지로 이동한다', () => {
      cy.get('button[aria-label="찜하기"]').click();
      cy.contains('로그인이 필요합니다').should('be.visible');

      cy.get('button').contains('로그인').click();

      cy.url().should('include', '/login');
    });
  });

  describe('헤더 네비게이션', () => {
    it('비로그인 상태에서 루핏톡 메뉴 클릭 시 로그인 모달이 표시된다', () => {
      cy.visit('/');

      cy.contains('루핏톡').click();

      cy.contains('로그인이 필요합니다').should('be.visible');
    });

    it('비로그인 상태에서 마이페이지 메뉴 클릭 시 로그인 모달이 표시된다', () => {
      cy.viewport('iphone-x');
      cy.visit('/');

      cy.get('button[aria-label="메뉴 열기"]').click();
      cy.contains('마이페이지').click();

      cy.contains('로그인이 필요합니다').should('be.visible');
    });
  });

  describe('메인 페이지', () => {
    it('비로그인 상태에서 판매하기 배너 클릭 시 로그인 모달이 표시된다', () => {
      cy.visit('/');

      cy.contains('판매하기').click();

      cy.contains('로그인이 필요합니다').should('be.visible');
    });

    it('비로그인 상태에서 챗봇 버튼 클릭 시 로그인 모달이 표시된다', () => {
      cy.visit('/');

      cy.get('button[aria-label="챗봇상담"]').click({ force: true });

      cy.contains('로그인이 필요합니다').should('be.visible');
    });
  });
});
