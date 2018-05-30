describe('Index page', () => {
    it('Selecting datetime and displaying table', () => {
    let time = moment()

    cy.visit('/')
    cy.get('input.form-control.date__container').type(time.format('YYYY-MM-DD')).blur()
    cy.get('button.btn.btn-primary.btn-m').click()
    cy.get('div.ef-transition-opacity')
    cy.get('th.sorting').click({multiple: true})
  })
})
