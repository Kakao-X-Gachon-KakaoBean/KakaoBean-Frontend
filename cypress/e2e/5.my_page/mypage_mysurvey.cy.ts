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

  context("내가 만든 설문이 있을 경우", () => {
    it("설문 생성 링크 박스가 존재하면 안된다.", () => {
      cy.intercept("GET", "http://localhost:8080/surveys/own-survey", {
        fixture: "ownsurvey.json",
      }).as("MySurvey");

      cy.get(".css-i1r8ft ").should("exist");
      cy.get(".css-1ckhj9a").should("not.exist");
    });
  });

  context("내가 만든 설문이 없을 경우", () => {
    it("설문 생성 링크 박스가 보여야 한다.", () => {
      cy.get(".css-1ckhj9a").should("be.visible");
      cy.get(".css-i1r8ft ").should("not.exist");
    });
  });
});
