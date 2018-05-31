const videos = [
  {
    author: 'Welshly Arms',
    title: 'Legendary',
    link: 'https://www.youtube.com/watch?v=o5jlLJa2Zhs&index=1&list=RDo5jlLJa2Zhs'
  },
  {
    author: 'Rag\'n\'Bone Man',
    title: 'Human',
    link: 'https://youtu.be/L3wKzyIN1yk?list=RDo5jlLJa2Zhs'
  },
  {
    author: 'Barns Courtney',
    title: 'Champion',
    link: 'HLEn5MyXUfE'
  }
]

function checkModalsAreHidden () {
  cy.get('#videoModal').should('not.be.visible')
  cy.get('#enjoyModal').should('not.be.visible')
  cy.get('#errorModal').should('not.be.visible')
}

describe('Player page', () => {
  beforeEach(() => {
  cy.viewport(1280, 720)
})

    it('Add new video to playlist', () => {
      cy.visit('/').wait(3000)

        checkModalsAreHidden()
        videos.forEach(video => {
          cy.get('#openModal').contains('ADD VIDEO TO PLAYLIST').click()
        cy.get('#videoModal').should('be.visible')

        cy.get('input[name=author]').type(video.author)
        cy.get('input[name=title]').type(video.title)
        cy.get('input[name=link]').type(video.link)

        cy.get('#videoForm')
          .find('.submit__btn')
          .click()

        cy.get('#videoModal')
          .should('not.be.visible')

        cy.get('#enjoyModal')
          .should('be.visible')
          .find('.submit__btn')
          .click()

        cy.get('#enjoyModal')
          .should('not.be.visible')
        })

        cy.get('#videosList').then($list => {
          expect($list.children().length).to.equal(videos.length)
        })
    })
})
