import faker from 'faker';

describe('Create courses', () => {
  beforeEach(() => {
    cy.task('reset:mooc:db');
    cy.task('reset:backoffice:db');
  });

  after(() => {
    cy.task('reset:mooc:db');
    cy.task('reset:backoffice:db');
  });

  beforeEach(() => {
    cy.visit('courses');
  });

  it('can create courses', () => {
    cy.contains('Actualmente CodelyTV Pro cuenta con 0 cursos.');

    let i = 0;
    const numberOfCourses = 5;
    while (i < numberOfCourses) {
      i++;
      const courseName = faker.random.words(1);
      cy.get('input[name="name"]').type(courseName);
      cy.get('input[name="duration"]').type('8 days');
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('div[role="alert"]').contains(`Felicidades, el curso ${courseName} ha sido creado!`);

      // As the web application is not reactive, we need to wait for
      // the asynchronous operations to finish to reload the page
      cy.wait(1000);
      cy.reload();
      cy.contains(`Actualmente CodelyTV Pro cuenta con ${i} cursos.`);
    }
    cy.get('#courses-list').find('tr').should('have.length', numberOfCourses);
  });

  describe('Course id field', () => {
    it('has value by default', () => {
      cy.get('input[name="id"]').invoke('val').should('not.be.empty');
    });

    it('has flash messages when is invalid', () => {
      cy.get('input[name="id"]').clear().type('invalid course id');
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="id"] + p').contains('Invalid course id');
    });

    it('maintain the value introduced by the user when invalid', () => {
      cy.get('input[name="id"]').clear().type('invalid course id');
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="id"]').should('have.value', 'invalid course id');
    });

    it('maintain the value introduced by the user when valid', () => {
      const uuid = faker.random.uuid();

      cy.get('input[name="id"]').clear().type(uuid);
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="id"]').should('have.value', uuid);
    });
  });

  describe('Name field', () => {
    it('has flash messages when is empty', () => {
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="name"] + p').contains('Invalid name');
    });

    it('has flash messages when is longer than 30 character', () => {
      cy.get('input[name="name"]').type(faker.random.alphaNumeric(31));

      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="name"] + p').contains('Invalid name');
    });

    it('maintain the value introduced by the user when invalid', () => {
      const invalidCourseName = faker.random.alphaNumeric(3);

      cy.get('input[name="name"]').clear().type(invalidCourseName);
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="name"]').should('have.value', invalidCourseName);
    });

    it('maintain the value introduced by the user when valid', () => {
      const validCourseName = faker.random.alphaNumeric(1);

      cy.get('input[name="name"]').clear().type(validCourseName);
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="name"]').should('have.value', validCourseName);
    });
  });

  describe('Duration field', () => {
    it('has flash messages when is empty', () => {
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="duration"] + p').contains('Invalid duration');
    });

    it('has flash messages when is shorter than 4 character', () => {
      cy.get('input[name="duration"]').type(faker.random.alphaNumeric(3));

      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="duration"] + p').contains('Invalid duration');
    });

    it('has flash messages when is longer than 100 character', () => {
      cy.get('input[name="duration"]').type(faker.random.alphaNumeric(101));

      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="duration"] + p').contains('Invalid duration');
    });

    it('maintain the value introduced by the user when invalid', () => {
      const invalidCourseDuration = faker.random.alphaNumeric(101);

      cy.get('input[name="duration"]').clear().type(invalidCourseDuration);
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="duration"]').should('have.value', invalidCourseDuration);
    });

    it('maintain the value introduced by the user when valid', () => {
      const validCourseDuration = faker.random.alphaNumeric(5);

      cy.get('input[name="duration"]').clear().type(validCourseDuration);
      cy.get('form[data-cy="create-course"]').submit();

      cy.get('input[name="duration"]').should('have.value', validCourseDuration);
    });
  });
});
