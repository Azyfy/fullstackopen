describe('Pokedex', function() {
    it('front page can be opened', function() {
        cy.visit('http://localhost:5000')
        cy.contains('ivysaur')
        cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
    })

    it('specific pokemon page can be opened', function () {
        cy.visit('http://localhost:5000')
        cy.contains('charizard').click()
        cy.contains('solar power')
        cy.contains('blaze')
    })

    it('pokemon navigation works', function () {
        cy.visit('http://localhost:5000')
        cy.contains('charmeleon').click()
        cy.contains('solar power')
        cy.contains('blaze')

        cy.contains('Previous').click()
        cy.contains('charmander')

        cy.contains('Next').click()
        cy.contains('Next').click()
        cy.contains('charizard')

        cy.contains('Home').click()
        cy.contains('squirtle')
    })
  })