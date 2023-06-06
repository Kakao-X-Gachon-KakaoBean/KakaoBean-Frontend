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

  context("정상적으로 서버와 통신이 되었을 경우 .", () => {
    it("설문 제목 박스안에 설문 제목이 보여야한다.", () => {
      cy.get(".css-cn7cg8 > :nth-child(1)").should("be.visible");
    });
    it("생성일 박스안에 생성일이 보여야한다.", () => {
      cy.get(".css-cn7cg8 > :nth-child(2)").should("be.visible");
    });
    it("응답 수 박스 안에 응답 수가 보여야한다.", () => {
      cy.get(".css-cn7cg8 > :nth-child(3)").should("be.visible");
    });
    it("설문 연령 비율 박스안에 해당 설문 기준이 보여야한다.", () => {
      cy.get(".css-2b5hkr").should("be.visible");
    });
  });

  context("조회하기 버튼을 누를 경우 .", () => {
    it("설문 상세 페이지로 이동 해야한다.", () => {
      cy.contains("조회하기").click();
      cy.url().should("include", "/surveyresponsedetail");
    });
  });

  // context("마감하기 버튼을 누를 경우 .", () => {
  //   it("설문이 마감 되어야 한다.", () => {
  //     cy.contains("마감하기").click();
  //
  //   });
  // });
});
