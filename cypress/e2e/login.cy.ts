describe("Login page test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("input wrong email", () => {
    cy.get('input[name="id"]').type("j949854");
  });

  it("input correct email", () => {
    cy.get('input[name="id"]').type("j949854@gmail.com");
  });

  it("input email and password and fail", () => {
    cy.get('input[name="id"]').type("123@gmail.com");
    cy.get('input[name="password"]').type("122123");
    cy.get(".css-3poebv").click();
  });

  it("input id and password and success", () => {
    cy.get('input[name="id"]').type("j949854@gmail.com");
    cy.get('input[name="password"]').type("tjdwns1462!");
    cy.get(".css-3poebv").click();
  });

  it("check search email modal", () => {
    cy.get('[style="display: flex;"] > :nth-child(1)').click();
    cy.get("#name").type("추성준");
    cy.get("#birth").type("19991001");
    cy.get("#birth").click();
  });

  it("check search password modal", () => {
    cy.get('[style="display: flex;"] > :nth-child(3)').click();
  });

  it("login to googlelogin", () => {});

  it("login to kakaologin", () => {});
  //
  // it("goto signup page", () => {
  //   cy.get(":nth-child(3) > a").click();
  // });
});
