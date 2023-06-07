describe("3.login_page page test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("check 3.login_page page", () => {
    cy.contains("Cocoa");
  });

  it("input wrong email", () => {
    cy.get('input[name="id"]').type("whdusrua");
  });

  it("input correct email", () => {
    cy.get('input[name="id"]').type("whdusrua@naver.com");
  });

  it("input email and password fail", () => {
    cy.get('input[name="id"]').type("whdusrua@naver.com");
    cy.get('input[name="password"]').type("wegwaegawe!");
    cy.get('button[type="submit"]').click();
  });

  it("input id and password success", () => {
    cy.get('input[name="id"]').type("whdusrua@naver.com.com");
    cy.get('input[name="password"]').type("qwer1234!");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.window().its("localStorage.accessToken").should("eq", "accessToken");
  });

  it("when click the find email button should appear email modal", () => {
    cy.get('button:contains("이메일 찾기")').click();
    cy.get(".css-mo6e4d").should("be.visible"); //이메일 찾기 모달
  });

  it("when click the find password button should appear password modal", () => {
    cy.get('button:contains("비밀번호 변경")').click();
    cy.get(".css-p6avp7").should("be.visible"); // 비밀번호 찾기 모달
  });

  it("check search email modal", () => {
    cy.get('button:contains("이메일 찾기")').click();
    cy.get("#name").type("조연겸");
    cy.get("#birth").type("19990302");
    cy.get(".css-1590a98").click();
  });

  context("이메일 인증 버튼을 누른 경우", () => {
    it("이메일 인증이 전송 되어야한다.", () => {
      cy.get('button:contains("비밀번호 변경")').click();
      cy.get(".css-1smo3z0").click();
    });
  });

  context("input창이 조건과 다르게 입력된 경우.", () => {
    it("이메일을 잘못 입력하면 이메일 인증이 보내지지 않는다.", () => {
      cy.get('button:contains("비밀번호 변경")').click();
      cy.get('input[name="email"]').type("j949854");
      cy.get(".css-1smo3z0").click();
      // cy.get(".react-toastify-error").should(
      //   "contain",
      //   "메일 주소를 확인해주세요."
      // );
    });

    it("입력한 비밀번호와 다시 입력한 비밀번호가 다르면 오류가 발생해야 한다.", () => {
      cy.get('button:contains("비밀번호 변경")').click();
      cy.get(":nth-child(5) > #password").type("password");
      cy.get("#passwordCheck").type("wrongpassword");
      cy.get('input[name="password"]')
        .invoke("val")
        .then((enteredPassword) => {
          expect(enteredPassword).not.to.equal("wrongpassword");
        });
    });
  });

  it("check search password modal", () => {
    cy.get('button:contains("비밀번호 변경")').click();
    cy.get("#email").type("whdusrua@naver.com");
    cy.get(":nth-child(5) > #password").type("qwe123!");
    cy.get("#passwordCheck").type("qwe123!");
    cy.get(".css-1590a98").click();
  });

  it("login to googlelogin", () => {});

  it("login to kakaologin", () => {});

  it("click the signup button redirect to signup page", () => {
    cy.get('a:contains("회원 가입")').click();
    cy.url().should("include", "/signup");
  });

  context("모든 input값 입력 후 비밀번호 변경 버튼을 누른 경우", () => {
    it("이메일,새로운 비밀번호,비밀번호 확인을 입력 후 비밀번호 변경 버튼을 누르면 성공한다.", () => {
      const email = "whdusrua@naver.com";
      const password = "password";
      const passwordCheck = "password";
      cy.get('button:contains("비밀번호 변경")').click();
      cy.get("#email").type("whdusrua@naver.com").should("have.value", email);
      cy.get(":nth-child(5) > #password")
        .type("password")
        .should("have.value", password);
      cy.get("#passwordCheck")
        .type("password")
        .should("have.value", passwordCheck);
      cy.get(".css-1590a98").click();
    });
  });
});
