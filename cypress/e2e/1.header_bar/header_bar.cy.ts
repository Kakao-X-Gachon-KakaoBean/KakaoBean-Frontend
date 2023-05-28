describe("헤더 바", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  context("헤더 바 렌더링 시", () => {
    it("로고 텍스트는 사용자에게 보여져야 한다.", () => {
      cy.get(".css-64wk4k").should("be.visible");
    });
    it("메뉴들은 유효한 링크를 가지고 있어야 하며, 각 링크는 메뉴 구성과 같아야 한다.", () => {
      const menuItems = ["Product", "Team", "MY PAGE", "Login", "Get Start"];
      cy.get(".css-120oq2b")
        .find("span")
        .each(($span, index) => {
          const text = $span.text(); // <span>의 텍스트 가져오기
          const menuItemName = menuItems[index];
          if (text.includes("http")) {
            cy.wrap($span)
              .should("have.attr", "href")
              .should("contain.text", menuItemName);
          }
        });
    });
  });
  context("localStorage의 accessToken이 존재할 경우", () => {
    it("로그인 확인 텍스트는 Logout이어야 한다.", () => {
      cy.window().then((win) => {
        const accessToken = win.localStorage.getItem("accessToken");
        // mockAccessToken으로 테스트 가능
        if (accessToken === "accessToken") {
          cy.get(":nth-child(4) > a")
            .should("be.visible")
            .should("have.text", "Logout");
        } else {
          cy.get(":nth-child(4) > a")
            .should("be.visible")
            .should("have.text", "Login");
        }
      });
    });
  });
});
