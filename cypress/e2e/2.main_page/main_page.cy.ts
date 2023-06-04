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
      cy.get(".css-yv3pru > :nth-child(1)").should("be.visible");
      cy.get(".css-yv3pru > :nth-child(2)").should("be.visible");
      cy.get(".css-1u7g3ak").should("be.visible");

      //여기서부턴 스크롤 내려야 보임
      cy.get(".css-1l5y9fy > div.aos-init > .css-rxxf9o").should("be.visible");
      cy.get(".css-1l5y9fy > div.aos-init > .css-end85d").should("be.visible");
      cy.get("video.aos-init").should("be.visible");
      cy.get(".css-1e91d6q > .css-rxxf9o").should("be.visible");
      cy.get(".css-1e91d6q > :nth-child(2)").should("be.visible");
      cy.get(".css-1e91d6q > :nth-child(3)").should("be.visible");
      cy.get(".css-1wvi6it").should("be.visible");
      cy.get(".css-vkg5qd").should("be.visible");
      cy.get(":nth-child(1) > .css-1hi0zda").should("be.visible");
      cy.get(".css-aqo0mr").should("be.visible");
      cy.get(":nth-child(2) > .css-1hi0zda").should("be.visible");
      cy.get(".css-lc7fha").should("be.visible");
    });
  });
  context("Get Start 버튼을 클릭했을 경우", () => {
    it("로그인 상태를 확인하고, 로그인 상태면 설문생성으로 이동해야한다.", () => {
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
  });
});
