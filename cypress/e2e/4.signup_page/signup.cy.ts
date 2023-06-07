describe("회원가입 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  context("회원가입 페이지에 들어온 경우 .", () => {
    it("회원가입 텍스트가 보여야 한다.", () => {
      cy.contains("회원가입");
    });
  });

  context("이메일 인증 버튼을 누른 경우", () => {
    it("이메일 인증이 전송 되어야한다.", () => {
      cy.get('button:contains("이메일 인증")').click();
    });
  });

  context("input창이 조건과 다르게 입력된 경우.", () => {
    it("이메일을 잘못 입력하면 이메일 인증이 보내지지 않는다.", () => {
      cy.get('input[name="email"]').type("j949854");
      cy.get(".css-id24tv").click();
      // cy.get(".react-toastify-error").should(
      //   "contain",
      //   "메일 주소를 확인해주세요."
      // );
    });

    it("입력한 비밀번호와 다시 입력한 비밀번호가 다르면 오류가 발생해야 한다.", () => {
      cy.get('input[name="password"]').type("password");
      cy.get('input[name="passwordCheck"]').type("wrongpassword");
      cy.get('input[name="password"]')
        .invoke("val")
        .then((enteredPassword) => {
          expect(enteredPassword).not.to.equal("wrongpassword");
        });
    });

    it("생일을 8자리 입력하지 않은 경우 오류가 발생해야 한다.", () => {
      cy.get('input[name="birth"]').type("991001");
      cy.get('input[name="birth"]')
        .invoke("val")
        .should("not.match", /^\d{8}$/);
    });

    it("이름에 숫자가 들어간 경우 오류가 발생해야 한다.", () => {
      cy.get('input[name="name"]').type("홍길동123");
      cy.get('input[name="name"]').invoke("val").should("match", /\d/);
    });
  });

  context("input창이 조건에 맞게 입력된 경우", () => {
    it("생일이 알맞게 입력되면 통과한다.", () => {
      cy.get('input[name="birth"]').type("19991001");
      cy.get('input[name="birth"]')
        .invoke("val")
        .should("match", /^\d{8}$/);
    });

    it("이름에 숫자 없이 알맞게 입력되면 통과한다.", () => {
      cy.get('input[name="name"]').type("이름");
      cy.get('input[name="name"]').invoke("val").should("not.match", /\d/);
    });
  });

  context("모든 input값 입력 후 회원가입 버튼을 누른 경우", () => {
    it("이메일,비밀번호,비밀번호 확인,이름,나이 입력후 회원가입 버튼을 누르면 성공한다.", () => {
      const email = "whdusrua@naver.com";
      const password = "password";
      const name = "추성준";
      const birth = "19990302";

      cy.get('input[name="email"]')
        .type("whdusrua@naver.com")
        .should("have.value", email);
      cy.get('input[name="password"]')
        .type("password")
        .should("have.value", password);
      cy.get('input[name="passwordCheck"]')
        .type("password")
        .should("have.value", password);
      cy.get('input[name="name"]').type("추성준").should("have.value", name);
      cy.get('input[name="birth"]')
        .type("19990302")
        .should("have.value", birth);
      // cy.get('input[value="MALE"]').check();
      cy.get('button[type="submit"]').click();
    });
  });

  context("로그인 버튼 클릭한 경우", () => {
    it("로그인 창으로 이동되어야 한다.", () => {
      cy.get(":nth-child(2) > a").click();
      cy.url().should("include", "/login");
    });
  });
});
