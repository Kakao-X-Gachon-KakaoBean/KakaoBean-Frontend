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
    it("loads MySurvey data successfully", () => {
      cy.intercept("GET", "http://localhost:8080/surveys/own-survey", {
        fixtures: "ownsurvey.json",
      }).as("MySurvey"); // API 요청을 가로채고 가상의 응답을 제공

      cy.wait("@MySurvey").then((interception) => {
        // 응답 가져오기
        const mySurveyResponse = interception.response;

        // 콘솔에 출력
        alert(mySurveyResponse);

        // 추가 작업 수행
        // ...
      });

      cy.get("[data-testid=SurveyContainer]").should("be.visible");
      cy.get(".css-1ckhj9a").should("not.exist");
    });
  });

  context("내가 만든 설문이 없을 경우", () => {
    it("설문 생성 링크 박스가 보여야 한다.", () => {
      cy.get(".css-1ckhj9a").should("be.visible");
    });
  });
});
