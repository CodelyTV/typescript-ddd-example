describe('List courses', () => {
  beforeEach(() => {
    cy.task('reset:backoffice:db');
    cy.task('reset:mooc:db');
  });

  beforeEach(() => {
    cy.visit('courses');
  });

  after(() => {
    cy.task('reset:mooc:db');
    cy.task('reset:backoffice:db');
  });

  it('can list courses', () => {
    cy.get('input[name="name"]').type('DDD en Typescript');
    cy.get('input[name="duration"]').type('25 hours');
    cy.get('form[data-cy="create-course"]').submit();
    cy.wait(1000);
    cy.reload();

    cy.contains('Cursos existentes');
    cy.get('#courses-list').find('tr').should('have.length', 1);
    cy.get('#courses-list tr').eq(0).should('contain', 'DDD en Typescript');
    cy.get('#courses-list tr').eq(0).should('contain', '25 hours');
  });

  it('can filter courses by its name', () => {
    createCourses();

    cy.get('button[data-cy="add-field-button"').click();
    cy.get('[data-cy=field-filter]').select('name');
    cy.get('[data-cy=field-filter-type]').select('CONTAINS');
    cy.get('[data-cy=filter-value]').type('Random');
    cy.get('#filter-button').click();

    cy.contains('Cursos existentes');
    cy.get('#courses-list').find('tr').should('have.length', 1);
    cy.get('#courses-list tr').eq(0).should('contain', 'Random Course');
    cy.get('#courses-list tr').eq(0).should('contain', '2 hours');
  });
});
function createCourses() {
  cy.get('input[name="name"]').type('DDD en Typescript');
  cy.get('input[name="duration"]').type('25 hours');
  cy.get('form[data-cy="create-course"]').submit();

  cy.get('input[name="name"]').type('Random Course');
  cy.get('input[name="duration"]').type('2 hours');
  cy.get('form[data-cy="create-course"]').submit();
  cy.wait(1000);
  cy.reload();
}
