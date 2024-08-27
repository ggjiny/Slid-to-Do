/// <reference types="cypress" />

describe('Sign In Page Error', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  // 잘못된 이메일 형식 입력
  it('should display an error message for invalid email format', () => {
    cy.get('input#email').type('invalid-email');
    cy.get('input#password').type('password123{enter}');
    cy.get('p')
      .contains('유효한 이메일 주소를 입력해주세요.')
      .should('be.visible');
  });

  // 잘못된 이메일 입력
  it('should display an error message for invalid email', () => {
    cy.get('input#email').type('godseoril@gmail.com');
    cy.get('input#password').type('password123{enter}');
    cy.get('p').contains('가입되지 않은 이메일입니다.').should('be.visible');
  });

  // 잘못된 비밀번호 입력
  it('should display an error message for invalid password', () => {
    cy.get('input#email').type('godseoril812@gmail.com');
    cy.get('input#password').type('password123{enter}');
    cy.get('p').contains('비밀번호가 올바르지 않습니다.').should('be.visible');
  });
});

describe('Dashboard Page test', () => {
  const user = {
    email: 'godseoril812@gmail.com',
    password: 'taco1234',
  };

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login(user.email, user.password);
    cy.visit('/dashboard');
  });
  // afterEach(() => {
  //   cy.visit('/dashboard');
  // });

  it('사이드바 새목표 추가 후 삭제', () => {
    cy.contains('#goal-list', '사이드바 목표').should('not.exist');
    cy.get('#add-goal-button-sideBar').click();
    cy.get('input[placeholder="새 목표를 입력해주세요"]').type('사이드바 목표');
    cy.get('input[placeholder="새 목표를 입력해주세요"]')
      .should('have.value', '사이드바 목표')
      .type('{enter}');
    cy.contains('#goal-list', '사이드바 목표').should('exist');
    cy.get('#delete-goal-button').click();
    cy.contains('button', '확인').click();
    cy.contains('#goal-list', '사이드바 목표').should('not.exist');
  });

  it('대쉬보드 새목표 추가', () => {
    cy.get('#add-goal-button-dashboard').click();
    cy.get('input[placeholder="목표를 입력해주세요."]').type('대쉬보드 목표');
    cy.get('input[placeholder="목표를 입력해주세요."]')
      .should('have.value', '대쉬보드 목표')
      .type('{enter}');
  });

  it('할 일 추가 후 완료 표시', () => {
    cy.contains('button', '할일 추가').click();
    cy.get('input[placeholder="제목을 입력해주세요."]').type('할 일 테스트');
    cy.get('input[placeholder="제목을 입력해주세요."]').should(
      'have.value',
      '할 일 테스트',
    );
    cy.contains('button', '확인').click();
    cy.get('#goal-box').find('button[aria-label="Mark as complete"]').click();
    cy.get('#goal-box').find('button[aria-label="Mark as incomplete"]').click();
  });

  it('할 일 제목 수정 후 삭제', () => {
    cy.get('.group').first().click();
    cy.get('input[placeholder="제목을 입력해주세요."]').clear();
    cy.get('input[placeholder="제목을 입력해주세요."]').type('제목 수정');
    cy.get('input[placeholder="제목을 입력해주세요."]').should(
      'have.value',
      '제목 수정',
    );
    cy.contains('button', '수정').click();
    cy.get('.group').first().click();
    cy.contains('button', '삭제').click();
    cy.get('button[aria-label="Confirm"]').click();
    cy.contains('.group', '제목 수정').should('not.exist');
  });

  it('목표 상세 이동 후 목표 이름 수정', () => {
    cy.contains('div.text-lg', '대쉬보드 목표').click();
    cy.get('.group').click();
    cy.contains('button', '수정하기').click();
    cy.get('input[placeholder="목표를 입력해주세요"]').clear();
    cy.get('input[placeholder="목표를 입력해주세요"]').type(
      '대쉬보드 목표 수정',
    );
    cy.get('input[placeholder="목표를 입력해주세요"]')
      .should('have.value', '대쉬보드 목표 수정')
      .type('{enter}');
  });

  it('목표 삭제 후 대쉬보드 페이지로 이동', () => {
    cy.contains('div.text-lg', '대쉬보드 목표 수정').click();
    cy.get('.group').click();
    cy.contains('button', '삭제하기').click();
    cy.contains('button', '확인').click();
    cy.url().should('include', '/dashboard');
  });
});
