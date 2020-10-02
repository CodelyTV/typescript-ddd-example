import faker from 'faker';

describe('Courses', () => {
  beforeEach(() => {
    cy.task('reset:db');
  });

  it('can create courses', () => {
    cy.visit('http://localhost:8032/courses');

    cy.contains('Actualmente CodelyTV Pro cuenta con 0 cursos.');

    let i = 0;
    while (i <= 5) {
      i++;
      const courseName = faker.lorem.sentence(2);
      cy.get('input[name="name"]').type(courseName);
      cy.get('input[name="duration"]').type('8 days');
      cy.get('form').submit();

      cy.get('div[role="alert"]').contains(`Felicidades, el curso ${courseName} ha sido creado!`);
      cy.contains(`Actualmente CodelyTV Pro cuenta con ${i} cursos.`);
    }
  });
});
