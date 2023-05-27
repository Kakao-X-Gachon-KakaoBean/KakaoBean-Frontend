describe("내가 만든 설문 테스트", () => {
  beforeEach(() => {
    cy.visit("/mypage/mysurvey");
  });

  context("내가 만든 설문 조회에 들어온 경우", () => {
    it("왼쪽 사이드 바 텍스트가 보여야 한다.", () => {
      cy.contains("내 정보");
      cy.contains("참여 설문 조회");
      cy.contains("내가 만든 설문 조회");
    });
  });

  // context("내가 만든 설문이 없을 경우", () => {
  //   it("플러스 버튼을 클릭했을 때 설문 생성 페이지로 가야한다.", () => {
  //     cy.get('a[data-testid="createsurvey-link"]').click();
  //
  //     cy.url().should("include", "/createsurvey");
  //   });
  //
  //   it("설문 컨테이너가 보이면 안된다.", () => {
  //     cy.get(".css-i1r8ft > :nth-child(1)");
  //   });
  // });
  //
  // context("내가 만든 설문이 있을 경우", () => {
  //   it("설문 컨테이너가 보여야 한다.", () => {
  //     cy.get(".css-i1r8ft > :nth-child(1)");
  //   });
  //
  //   it("설문 컨테이너에 삭제 버튼이 보여야 한다.", () => {
  //     cy.get(":nth-child(1) > .css-1hewqy");
  //   });
  //
  //   it("설문 삭제 버튼을 누르면 설문 삭제가 되어야 한다.", () => {
  //     cy.get(":nth-child(1) > .css-1hewqy");
  //   });
  // });
});
