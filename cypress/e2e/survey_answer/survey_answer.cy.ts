describe("설문 응답 테스트", () => {
  beforeEach(() => {
    cy.visit("/survey/**");
    cy.intercept("GET", "http://localhost:8080/surveys/**", {
      fixture: "surveycontents.json",
    }).as("SurveyResult");
  });

  context("설문 통계 페이지에 들어온 경우 .", () => {
    it("다음 질문으로 이동하는 버튼이 있어야 한다.(맨처음)", () => {
      cy.get(".css-vm5xzw").should("be.visible");
    });
    it("이전, 다음 질문으로 이동하는 버튼이 있어야 한다.(다음 질문을 한번이상 이동했을 경우)", () => {
      cy.get(".css-vm5xzw").click();
      cy.get(".css-1ultooz > :nth-child(2)").should("be.visible");
      cy.get(".css-1ultooz > :nth-child(1)").should("be.visible");
    });
  });

  context("정상적으로 서버와 통신이 되었을 경우 .", () => {
    beforeEach(() => {
      cy.get(
        '.slick-active > :nth-child(1) > [tabindex="-1"] > .css-m6ur2b > .css-1sb6449'
      ).as("questionTitle");
      cy.get(
        '.slick-active > :nth-child(1) > [tabindex="-1"] > .css-m6ur2b > .css-1pj0av'
      ).as("questionExplanation");
    });

    it("문항 제목 박스안에 문항 제목이 보여야한다.", () => {
      cy.get("@questionTitle").should("be.visible");
    });
    it("문항 설명 박스안에 문항 설명이 보여야한다.", () => {
      cy.get("@questionExplanation").should("be.visible");
    });

    it("displays correct content based on question type - ESSAY", () => {
      cy.get("@questionTitle").should("contain", "Essay Question Title");
      cy.get("@questionExplanation").should("contain", "ex2");
      cy.get('[data-cy="essay-input"]').should("be.visible");
    });

    it("displays correct content based on question type - MULTIPLE", () => {
      cy.get(".css-vm5xzw").click();
      cy.get("@questionTitle").should(
        "contain",
        "First Multiple Question Title"
      );
      cy.get("@questionExplanation").should("contain", "ex3");
      cy.get('[data-cy="multiple-choice"]').should("have.length", 5);
    });

    it("displays correct content based on question type - RANGE", () => {
      cy.get(".css-1ultooz > :nth-child(1)").should("be.visible");
      cy.get("@questionTitle").should("contain", "Range Bar Question");
      cy.get("@questionExplanation").should("contain", "ex1");
      cy.get('[data-cy="range-bar"]').should("be.visible");
    });

    it("displays correct content based on question type - ESSAY (final question)", () => {
      cy.get("@questionTitle").should("contain", "Essay Question Title");
      cy.get("@questionExplanation").should("contain", "ex2");
      cy.get('[data-cy="essay-input"]').should("be.visible");
      cy.get('[data-cy="next-button"]').should("contain", "Finish");
    });

    it("displays correct content based on question type - MULTIPLE (final question)", () => {
      cy.get("@questionTitle").should("contain", "Multiple Question Title");
      cy.get("@questionExplanation").should("contain", "without logic");
      cy.get('[data-cy="multiple-choice"]').should("have.length", 5);
      cy.get('[data-cy="next-button"]').should("contain", "Finish");
    });
  });

  context("다음 질문 버튼을 누를 경우 .", () => {
    beforeEach(() => {
      cy.get(".css-vm5xzw").click();
    });

    it("다음질문으로 이동 해야한다.", () => {
      // 다음 질문으로 이동한 후에 필요한 테스트 코드 작성
    });
  });

  // context("마감하기 버튼을 누를 경우 .", () => {
  //   it("설문이 마감 되어야 한다.", () => {
  //     cy.contains("마감하기").click();
  //     // 마감 후에 필요한 테스트 코드 작성
  //   });
  // });
});
