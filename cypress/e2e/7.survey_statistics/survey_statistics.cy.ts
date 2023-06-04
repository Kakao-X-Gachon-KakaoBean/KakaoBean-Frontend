describe("설문 통계 테스트", () => {
  beforeEach(() => {
    cy.visit("/surveydetail/**");
    cy.intercept(
      "GET",
      "http://localhost:8080/responses/survey-statistics/**",
      {
        fixture: "surveystatistics.json",
      }
    ).as("SurveyResult");
  });

  context("개발 과정 오류", () => {
    const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
    Cypress.on("uncaught:exception", (err) => {
      /* returning false here prevents Cypress from failing the test */
      if (resizeObserverLoopErrRe.test(err.message)) {
        return false;
      }
    });
  });

  context("설문통계 페이지에 들어온 경우 .", () => {
    it("설문 제목 텍스트가 보여야 한다.", () => {
      cy.contains("설문 제목");
    });
  });

  // context("통계 페이지에 들어왔을 경우", () => {
  //   it("설문 제목이 보여야 한다.", () => {
  //     cy.get('div[name="SurveyName"]').should("be.visible");
  //     cy.get(".css-i1r8ft ").should("not.exist");
  //   });
  // });
});
