describe("signup page test", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("check Signup page", () => {
    cy.contains("회원가입");
  });

  it("click the certify email button", () => {
    cy.get('button:contains("이메일 인증")').click();
  });

  it("input wrong email", () => {
    cy.get('input[name="email"]').type("j949854");
    cy.get(".css-id24tv").click();
    // cy.get(".react-toastify-error").should(
    //   "contain",
    //   "메일 주소를 확인해주세요."
    // );
  });

  it("input wrong passwordcheck", () => {
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="passwordCheck"]').type("wrongpassword");
    cy.get('input[name="password"]')
      .invoke("val")
      .then((enteredPassword) => {
        expect(enteredPassword).not.to.equal("wrongpassword");
      });
  });

  it("input wrong birth", () => {
    cy.get('input[name="birth"]').type("991001");
    cy.get('input[name="birth"]')
      .invoke("val")
      .should("not.match", /^\d{8}$/);
  });

  it("input correct birth", () => {
    cy.get('input[name="birth"]').type("19991001");
    cy.get('input[name="birth"]')
      .invoke("val")
      .should("match", /^\d{8}$/);
  });

  it("input wrong name", () => {
    cy.get('input[name="name"]').type("홍길동123");
    cy.get('input[name="name"]').invoke("val").should("match", /\d/);
  });

  it("input correct name", () => {
    cy.get('input[name="name"]').type("이름");
    cy.get('input[name="name"]').invoke("val").should("not.match", /\d/);
  });

  it("input email,password,passwordcheck,name,birth and success", () => {
    const email = "j949854@gmail.com";
    const password = "password";
    const name = "추성준";
    const birth = "19991001";

    cy.get('input[name="email"]')
      .type("j949854@gmail.com")
      .should("have.value", email);
    cy.get('input[name="password"]')
      .type("password")
      .should("have.value", password);
    cy.get('input[name="passwordCheck"]')
      .type("password")
      .should("have.value", password);
    cy.get('input[name="name"]').type("추성준").should("have.value", name);
    cy.get('input[name="birth"]').type("19991001").should("have.value", birth);
    // cy.get('input[value="MALE"]').check();
    cy.get('button[type="submit"]').click();
  });

  it("click the 로그인 button redirect to login page", () => {
    cy.get(":nth-child(2) > a").click();
    cy.url().should("include", "/login");
  });
});
