describe("Main", () => {
  beforeEach(() => {
    // test를 위해 accessToken이 있다고 가정한다.
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("accessToken", "mockAccessToken");
      },
    });
  });
  context("메인 페이지의 가이드 텍스트는 유효하며 보여야한다.", () => {
    it("메인 페이지 텍스트 요소", () => {
      cy.get(".css-e467n0 > .css-1e91d6q > :nth-child(1)")
        .should("be.visible")
        .should("have.text", "업무를 빠르고 쉽게");
      cy.get(".css-e467n0 > .css-1e91d6q > :nth-child(2)")
        .should("be.visible")
        .should("have.text", "Cocoa");
      cy.get(".css-0 > .css-1e91d6q > .css-6khpng")
        .should("be.visible")
        .should("have.text", "드래그 앤 드롭으로 쉽게");
      cy.get(".css-1lr4xyl")
        .should("be.visible")
        .should("have.text", "쉽고 빠르게 설문을 시작하세요!");
      cy.get(".css-1edcj4h > .css-1e91d6q > .css-6khpng").should("be.visible");
      cy.get(".css-1edcj4h > .css-1e91d6q > :nth-child(2)").should(
        "be.visible"
      );
      cy.get(".css-1edcj4h > .css-1e91d6q > :nth-child(3)").should(
        "be.visible"
      );
      // cy.scrollTo("bottom", { duration: 2000 });
      // cy.scrollTo("top", { duration: 2000 });
    });
  });
  context(
    "메인페이지의 Get Start 버튼은 로그인 상태 시 설문생성으로 이동해야한다.",
    () => {
      it("메인 페이지 Get Start 버튼", () => {
        // localStorage를 확인해서 로그인 상태인지 확인
        cy.window().then((win) => {
          const accessToken = win.localStorage.getItem("accessToken");
          // mockAccessToken으로 테스트 가능
          if (accessToken === "accessToken") {
            cy.get(".ant-btn > a")
              .should("exist")
              .and("contain.text", "Get Start")
              .click({ force: true });
            cy.url().should("include", "/createsurvey");
            cy.get(".css-64wk4k").click();
          } else {
            cy.log("no accessToken");
          }
        });
      });
    }
  );
});
