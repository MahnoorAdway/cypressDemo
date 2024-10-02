import practiceFormPage  from '../pages/practiceForm'

describe('Verify Practice Form', () => {
  
  it('Should not submit the form if required fields are missing', () => {
  
    cy.get('button').contains('Submit').click()
    cy.get('div').contains('Thanks for submitting the form').should('not.exist')
  })

  it('Should enforce maxlength on the Mobile Number field', () => {
    
    practiceFormPage.elements.mobile_input().type('12345678901234')
    practiceFormPage.elements.mobile_input().should('have.value', '1234567890')
  })
  
  it('Verify form submission', () => {

    cy.url().should('include', 'automation-practice-form')
    practiceFormPage.fillForm()
    practiceFormPage.verifyPracticeForm()
  })
})