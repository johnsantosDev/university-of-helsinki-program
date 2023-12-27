/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Suraj Mishra',
      username: 'suraj',
      password: 'mishra'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('suraj')
      cy.get('#password').type('mishra')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('#username').type('suraj')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('suraj')
      cy.get('#password').type('mishra')
      cy.get('#login-button').click()
      //cy.login({ username: 'suraj', password: 'mishra' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('New title from cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()

      cy.contains('New title from cypress')
    })

    it('users can like a blog', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('New title from cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()

      cy.contains('view').click()
      cy.get('.like').click()

      cy.contains('Likes 1')
    })


    it('user who created a blog can delete a blog', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('New title from cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()

      cy.contains('view').click()
      cy.get('.delete').click()
      cy.get('.blogDetail').should('not.exist')
    })

    it('user cannot delete others blog', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('New title from cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()

      cy.contains('logout').click()

      const user1 = {
        name: 'Matti Marin',
        username: 'matti',
        password: 'marin'
      }

      cy.request('POST', 'http://localhost:3003/api/users', user1)
      cy.visit('http://localhost:3000')

      cy.contains('login').click()
      cy.get('#username').type('matti')
      cy.get('#password').type('marin')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('delete').should('not.exist')
    })

    it.only('blogs are ordered according to likes', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('New title from cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.get('.like').click()
      cy.get('.like').click()

      cy.contains('create blog').click()
      cy.get('#title').type('Old title from cypress')
      cy.get('#author').type('Express author')
      cy.get('#url').type('www.express.com')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.get('.like').click({multiple: true})

      cy.get('div').eq(0).should('contain', 'Old title from cypress')
      cy.get('div').eq(1).should('contain', 'New title from cypress')
    })

  })
})