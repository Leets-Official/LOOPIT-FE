describe('구매 플로우', () => {
  beforeEach(() => {
    cy.fixture('posts').then((posts) => {
      cy.intercept('GET', /\/sell-post(?:\?|$)/, {
        statusCode: 200,
        body: posts.list,
      }).as('getPosts');

      cy.intercept('GET', /\/sell-post\/detail\/\d+/, {
        statusCode: 200,
        body: posts.detail,
      }).as('getPostDetail');

      cy.intercept('GET', /\/search\/autocomplete\//, {
        statusCode: 200,
        body: ['iPhone 15', 'iPhone 14', 'Galaxy S24'],
      }).as('getAutocomplete');
    });
  });

  describe('상품 목록 페이지', () => {
    beforeEach(() => {
      cy.visit('/buy');
      cy.wait('@getPosts');
    });

    it('상품 목록이 표시된다', () => {
      cy.contains('iPhone 15 Pro 256GB').should('be.visible');
      cy.contains('Galaxy S24 Ultra 512GB').should('be.visible');
    });

    it('검색바가 표시된다', () => {
      cy.get('input[placeholder*="어떤 제품을 찾으시나요"]').should('be.visible');
    });

    it('필터 섹션이 표시된다', () => {
      cy.contains('제조사').should('be.visible');
      cy.contains('모델명').should('be.visible');
      cy.contains('가격').should('be.visible');
    });

    it('검색어 입력 시 자동완성이 표시된다', () => {
      cy.get('input[placeholder*="어떤 제품을 찾으시나요"]').type('iPhone');
      cy.wait('@getAutocomplete');
      cy.contains('iPhone 15').should('be.visible');
    });

    it('필터 선택 시 필터 칩이 표시된다', () => {
      cy.contains('애플').click();
      cy.get('[aria-label="애플 필터 제거"]').should('be.visible');
    });

    it('필터 칩 제거 시 필터가 해제된다', () => {
      cy.contains('애플').click();
      cy.get('[aria-label="애플 필터 제거"]').click();
      cy.get('[aria-label="애플 필터 제거"]').should('not.exist');
    });

    it('초기화 버튼 클릭 시 모든 필터가 해제된다', () => {
      cy.contains('애플').click();
      cy.contains('초기화').click();
      cy.get('[aria-label="애플 필터 제거"]').should('not.exist');
    });
  });

  describe('상품 상세 페이지', () => {
    it('상품 클릭 시 상세 페이지로 이동한다', () => {
      cy.visit('/buy');
      cy.wait('@getPosts');

      cy.contains('iPhone 15 Pro 256GB').click();
      cy.wait('@getPostDetail');

      cy.url().should('include', '/buy/1');
    });

    it('상세 정보가 표시된다', () => {
      cy.visit('/buy/1');
      cy.wait('@getPostDetail');

      cy.contains('iPhone 15 Pro 256GB').should('be.visible');
      cy.contains('깨끗하게 사용한 아이폰입니다').should('be.visible');
      cy.contains('판매자와 연락하기').should('be.visible');
    });

    it('찜하기 버튼이 표시된다', () => {
      cy.visit('/buy/1');
      cy.wait('@getPostDetail');

      cy.get('button[aria-label="찜하기"]').should('be.visible');
    });
  });

  describe('상품 없음 상태', () => {
    it('상품이 없을 때 안내 메시지가 표시된다', () => {
      cy.intercept('GET', /\/sell-post(?:\?|$)/, {
        statusCode: 200,
        body: {
          content: [],
          totalElements: 0,
          totalPages: 0,
        },
      }).as('getEmptyPosts');

      cy.visit('/buy');
      cy.wait('@getEmptyPosts');

      cy.contains('관련된 상품이 없어요').should('be.visible');
    });
  });
});
