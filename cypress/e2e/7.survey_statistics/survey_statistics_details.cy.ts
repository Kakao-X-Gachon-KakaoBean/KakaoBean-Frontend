describe("설문 결과 세부 테스트", () => {
  beforeEach(() => {
    cy.visit("/surveyresponsedetail/");
    cy.window().then((win) => {
      win.history.replaceState(null, "", "/surveyresponsedetail");
      win.history.replaceState({ surveyId: "31" }, "", "/surveyresponsedetail");
    });
    cy.intercept("GET", "http://localhost:8080/responses/**/", {
      fixture: "surveystatisticsdetail.json",
    }).as("resdetail");
  });

  context("설문 통계 페이지에 들어온 경우 .", () => {
    it("설문 제목 텍스트가 보여야한다.", () => {
      cy.contains("설문 제목");
    });
    it("생성일 텍스트가 보여야한다.", () => {
      cy.contains("생성일");
    });
    it("응답 수 텍스트가 보여야한다.", () => {
      cy.contains("응답 수");
    });
    it("설문 연령 비율 텍스트가 보여야한다.", () => {
      cy.contains("설문 연령 비율");
    });
    it("해당 설문 기준 텍스트가 보여야한다.", () => {
      cy.contains("해당 설문 기준");
    });
    it("마감하기 텍스트가 보여야한다.", () => {
      cy.contains("마감하기");
    });
    it("조회하기 텍스트가 보여야한다.", () => {
      cy.contains("조회하기");
    });
  });
});
