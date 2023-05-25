describe("Header", () => {
  context(
    "헤더 바의 메뉴들은 링크를 가지고 있어야 하며, 각 링크의 페이지는 유효해야 한다.",
    () => {
      it("네비게이션 요소", () => {
        cy.visit("/");
        cy.get(".css-120oq2b")
          .find("span")
          .each(($span, index) => {
            const text = $span.text(); // <span>의 텍스트 가져오기
            if (text.includes("http")) {
              cy.wrap($span).should("have.attr", "href");
            }
          });
      });
    }
  );
  context("헤더 바의 사이트 제목은 Cocoa여야 한다.", () => {
    it("헤더 바 제목", () => {
      cy.visit("/");
      cy.get(".css-64wk4k").should("be.visible").should("have.text", "Cocoa");
    });
  });
});
