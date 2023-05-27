describe("마이페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/mypage");
  });

  context("마이페이지에 들어온 경우 .", () => {
    it("왼쪽 사이드 바 텍스트가 보여야 한다.", () => {
      cy.contains("내 정보");
      cy.contains("참여 설문 조회");
      cy.contains("내가 만든 설문 조회");
    });
  });

  context("내 정보에 들어온 경우", () => {
    beforeEach(() => {
      cy.visit("/mypage/myinfo");
    });

    it("나에 대한 정보가 보여야한다.", () => {
      cy.contains("내 정보");
      cy.contains("이름");
      cy.contains("나이");
      cy.contains("성별");
      cy.contains("이메일");
      cy.contains("생일");
    });

    it("내 정보 타이틀이 보여야 한다.", () => {
      cy.contains("내 정보");
    });
  });
});
