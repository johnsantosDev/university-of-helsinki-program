/* eslint-disable no-undef */
describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Suraj Mishra',
      username: 'sahas',
      password: 'mishra'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  //   it.only('login fails with wrong password', function() {
  //     cy.contains('login').click()
  //     cy.get('#username').type('sahas')
  //     cy.get('#password').type('wrong')
  //     cy.get('#login-button').click()

  //     // cy.get('.error').should('contain', 'Wrong credentials')
  //     // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  //     // cy.get('.error').should('have.css', 'border-style', 'solid')
  //     cy.get('.error')
  //       .should('contain', 'Wrong credentials')
  //       .and('have.css', 'color', 'rgb(255, 0, 0)')
  //       .and('have.css', 'border-style', 'solid')

  //     cy.get('html').should('not.contain', 'Suraj Mishra logged in')
  //   })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sahas', password: 'mishra' })
    })

    it('a new note can be created', function() {
      cy.contains('create note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'make not important')
      })
    })

  })


  //   it('login form can be opened', function() {
  //     cy.contains('login').click()
  //     cy.get('#username').type('sahas')
  //     cy.get('#password').type('mishra')
  //     cy.get('#login-button').click()
  //   })

  //   describe('when logged in', function () {
  //     beforeEach(function() {
  //       cy.contains('login').click()
  //       cy.get('#username').type('sahas')
  //       cy.get('#password').type('mishra')
  //       cy.get('#login-button').click()
  //     })

  //     describe('and a note exists', function () {
  //       beforeEach(function () {
  //         cy.contains('create note').click()
  //         cy.get('input').type('another note cypress')
  //         cy.contains('save').click()
  //       })

  //       it('it can be made important', function () {
  //         cy.contains('another note cypress')
  //           .contains('make important')
  //           .click()

//         cy.contains('another note cypress')
//           .contains('make not important')
//       })
//     })
//  })
})