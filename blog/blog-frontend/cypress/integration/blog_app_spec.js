describe('Blog app', function () {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('log in')
      .click()
  })

  it('existing user can log in', function() {
    cy.contains('log in')
      .click()
    cy.get('[data-cy=username]')
      .type('derek2')
    cy.get('[data-cy=password]')
      .type('password')
    cy.get('[data-cy=submitLogin]')
      .click()
    cy.contains('logged in')
  })

  it('users page can be navigated to', function() {
    cy.get('[data-cy=usersPage]')
      .click()
    cy.contains('blogs created')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in')
        .click()
      cy.get('[data-cy=username]')
        .type('derek2')
      cy.get('[data-cy=password]')
        .type('password')
      cy.get('[data-cy=submitLogin]')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Derek Pyle Jr logged in')
    })

    it('blog can be added', function() {
      cy.contains('add blog')
        .click()
      cy.get('[data-cy=title]')
        .type('End to End Testing is Dope')
      cy.get('[data-cy=author]')
        .type('Numba One Stunna')
      cy.get('[data-cy=url]')
        .type('www.dope.com')
      cy.get('[data-cy=submitBlog]')
        .click()
      cy.contains('End to End Testing is Dope')
    })

  })
})