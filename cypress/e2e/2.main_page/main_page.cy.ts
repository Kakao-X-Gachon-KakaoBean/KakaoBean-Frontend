describe("메인 페이지", () => {
  beforeEach(() => {
    // test를 위해 accessToken이 있다고 가정한다.
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("accessToken", "mockAccessToken");
      },
    });
  });
  context("메인 페이지 렌더링 시", () => {
    it("메인 페이지 가이드 라인 문구는 사용자에게 보여져야 한다.", () => {
      cy.get(".css-e467n0 > .css-1e91d6q > :nth-child(1)").should("be.visible");
      cy.get(".css-e467n0 > .css-1e91d6q > :nth-child(2)").should("be.visible");
      cy.get(".css-0 > .css-1e91d6q > .css-6khpng").should("be.visible");
      cy.get(".css-1lr4xyl").should("be.visible");
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
  context("Get Start 버튼을 클릭했을 경우", () => {
    it("로그인 상태를 확인하고, 로그인 상태면 설문생성으로 이동해야한다.", () => {
      // localStorage를 확인해서 로그다인 상태인지 확인
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
  });
});
