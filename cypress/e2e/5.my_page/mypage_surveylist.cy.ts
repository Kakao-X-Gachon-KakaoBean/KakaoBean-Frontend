describe("참여 설문 조회 테스트", () => {
  beforeEach(() => {
    cy.visit("/mypage/surveylist");
  });

  context("참여 설문 조회에 들어온 경우", () => {
    it("왼쪽 사이드 바 텍스트가 보여야 한다.", () => {
      cy.contains("내 정보");
      cy.contains("참여 설문 조회");
      cy.contains("내가 만든 설문 조회");
    });
  });

  context("참여한 설문이 있을 경우", () => {
    it("참여한 설문의 리스트가 보여야 한다.", () => {
      cy.intercept("GET", "http://localhost:8080/surveys/submitted-survey", {
        fixture: "submittedsurvey.json",
      }).as("SurveyList");

      cy.get(".css-i1r8ft ").should("exist");
    });
  });

  context("참여한 설문이 없을 경우", () => {
    it("참여한 설문이 없습니다가 보여야 한다.", () => {
      cy.contains("참여한 설문이 없습니다.");
    });
  });
});
