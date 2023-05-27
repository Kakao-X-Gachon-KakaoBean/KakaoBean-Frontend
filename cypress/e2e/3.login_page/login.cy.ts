describe("3.login_page page test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("check 3.login_page page", () => {
    cy.contains("Cocoa");
  });

  it("input wrong email", () => {
    cy.get('input[name="id"]').type("j949854");
  });

  it("input correct email", () => {
    cy.get('input[name="id"]').type("j949854@gmail.com");
  });

  it("input email and password fail", () => {
    cy.get('input[name="id"]').type("123@gmail.com");
    cy.get('input[name="password"]').type("122123");
    cy.get('button[type="submit"]').click();
  });

  it("input id and password success", () => {
    cy.get('input[name="id"]').type("j949854@gmail.com");
    cy.get('input[name="password"]').type("tjdwns1462!");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.window().its("localStorage.accessToken").should("eq", "accessToken");
  });

  it("when click the find email button should appear email modal", () => {
    cy.get('button:contains("이메일 찾기")').click();
    cy.get(".css-mo6e4d").should("be.visible"); //이메일 찾기 모달
  });

  it("when click the find password button should appear password modal", () => {
    cy.get('button:contains("비밀번호 찾기")').click();
    cy.get(".css-bvgujh").should("be.visible"); // 비밀번호 찾기 모달
  });

  it("check search email modal", () => {
    cy.get('button:contains("이메일 찾기")').click();
    cy.get("#name").type("추성준");
    cy.get("#birth").type("19991001");
    cy.get(".css-1590a98").click();
  });

  it("check search password modal", () => {
    cy.get('button:contains("비밀번호 찾기")').click();
  });

  it("login to googlelogin", () => {});

  it("login to kakaologin", () => {});

  it("click the signup button redirect to signup page", () => {
    cy.get('a:contains("회원 가입")').click();
    cy.url().should("include", "/signup");
  });
});
