describe('List courses', () => {
  before(() => {
    cy.task('reset:backoffice:db');
    cy.task(
      'publish:course:created',
      JSON.stringify({
        data: {
          id: 'c77fa036-cbc7-4414-996b-c6a7a93cae10',
          type: 'course.created',
          occurred_on: '2019-08-08T08:37:32+00:00',
          attributes: {
            id: '8c900b20-e04a-4777-9183-32faab6d2fb6',
            name: 'DDD en Typescript',
            duration: '25 hours'
          },
          meta: {
            host: '111.26.06.93'
          }
        }
      })
    );
  });

  beforeEach(() => {
    cy.visit('courses');
  });

  it('can list courses', () => {
    cy.contains('Cursos existentes');
    cy.get('#courses-list').find('tr').should('have.length', 1);
    cy.get('#courses-list tr').eq(0).should('contain', '8c900b20-e04a-4777-9183-32faab6d2fb6');
    cy.get('#courses-list tr').eq(0).should('contain', 'DDD en Typescript');
    cy.get('#courses-list tr').eq(0).should('contain', '25 hours');
  });
});
