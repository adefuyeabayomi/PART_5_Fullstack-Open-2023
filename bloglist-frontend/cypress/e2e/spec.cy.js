describe('Blog App', function() {

  let loginDetails = {
    username : "Adefuye Abayomi",
    password : "12345678"
  }

  let wrongLogin = {
    username : "Aimee Leeroy",
    password : "856845353555"
  }

  beforeEach(function() {
      // resets the database
      cy.request('POST', 'http://localhost:3003/api/testing/reset').then(response=> {
        console.log("formatted database", response)
      })

      // creates a new user
      cy.request("POST","http://localhost:3003/api/users",loginDetails)

      // opens the application in the browsers
      cy.visit('http://localhost:5173')

  })
    
    // verifies that the login form is displayed on the screen by default
    it('front page can be opened', function() {
      cy.get("#loginForm");
    })

      // test for logging in with the right credentials and the wrong credentials.
    describe("Login Functionality", function () {
      it("login with correct credentials should succeed and user can create new blog", function () {
        cy.get("#loginUsername").type(loginDetails.username)
        cy.get("#loginPassword").type(loginDetails.password)
        cy.get("#loginButton").click();
        // this means the login was successful the below is the button that controls the blog post form.
        cy.contains("create new blog");
      })
      it("login with wrong credentials should fail",function () {
        cy.get("#loginUsername").type(wrongLogin.username)
        cy.get("#loginPassword").type(wrongLogin.password)
        cy.get("#loginButton").click();
        // this means that the login was unsuccessful
        cy.contains("Sign Up For New Users");
      })
    })

    describe("")

})