describe('Blog App', function() {

  beforeEach(function() {
    // resets the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // opens the application in the browsers
    cy.visit('http://localhost:5173')
  })
  // verifies that the login form is displayed on the screen by default
  it('front page can be opened', function() {
    cy.get("#loginForm");
  })
})