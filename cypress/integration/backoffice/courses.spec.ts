describe('Courses', () => {

  it('can create a course', () => {
    const courseName = 'New course';
    cy.visit('http://localhost:8032/courses');

    cy.get('input[name="name"]').type(courseName);
    cy.get('input[name="duration"]').type('8 days');
    cy.get('form').submit();

    cy.get('div[role="alert"]').contains(`Felicidades, el curso ${courseName} ha sido creado!`);
    // cy.contains('Actualmente CodelyTV Pro cuenta con 10 curso');
  });
});
