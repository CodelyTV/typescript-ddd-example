describe('List courses', () => {
  before(() => {
    cy.task('reset:backoffice:db');
    cy.task('reset:mooc:db');
  });

  beforeEach(() => {
    cy.visit('courses');
  });

  it('can list courses', () => {
    cy.get('input[name="name"]').type('DDD en Typescript');
    cy.get('input[name="duration"]').type('25 hours');
    cy.get('form').submit();
    cy.wait(1000);
    cy.reload();

    cy.contains('Cursos existentes');
    cy.get('#courses-list').find('tr').should('have.length', 1);
    cy.get('#courses-list tr').eq(0).should('contain', 'DDD en Typescript');
    cy.get('#courses-list tr').eq(0).should('contain', '25 hours');
  });
});
