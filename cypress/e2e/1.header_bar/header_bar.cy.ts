describe("Header", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  context("헤더 바의 사이트 제목은 Cocoa여야 한다.", () => {
    it("헤더 바 제목", () => {
      cy.get(".css-64wk4k").should("be.visible").should("have.text", "Cocoa");
    });
  });
  context(
    "헤더 바의 메뉴들은 유효한 링크를 가지고 있어야 하며, 각 링크는 메뉴 구성과 같아야 한다.",
    () => {
      it("네비게이션 요소", () => {
        const menuItems = [
          "Product",
          "Team",
          "MY PAGE",
          "3.login_page",
          "Get Start",
        ];
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
    }
  );
  context(
    "localStorage에 사용자 accessToken이 존재하면 Logout이어야 하고, 아니면 Login이어야 한다.",
    () => {
      it("로그인 텍스트", () => {
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
              .should("have.text", "3.login_page");
          }
        });
      });
    }
  );
});
