const elements = {
  first_name_input: () => cy.get('input[id="firstName"]'),
  last_name_input: () => cy.get('input[id="lastName"]'),
  email_input: () => cy.get('input[id="userEmail"]'),
  gender_radio: () => cy.get('input[id="gender-radio-2"]'),
  mobile_input: () => cy.get('input[id="userNumber"]'),
  date_of_birth_input: () => cy.get('input[id="dateOfBirthInput"]'),
  dob_day: () => cy.get('div[class*="react-datepicker__day"]'),
  dob_year_section: () => cy.get('div[class*="react-datepicker__year-dropdown-container"]'),
  dob_year: () => cy.get('select[class="react-datepicker__year-select"]'),
  subject_input: () => cy.get('input[id="subjectsInput"]'),
  selected_subject: () => cy.get('div[class^="subjects-auto-complete__multi-value__label"]'),
  hobbies_checkbox: () => cy.get('input[id="hobbies-checkbox-2"]'),
  upload_picture: () => cy.get('input[id="uploadPicture"]'),
  address_textarea: () => cy.get('textarea[id="currentAddress"]'),
  state_input: () => cy.get('input[id="react-select-3-input"]'),
}

const fillForm = () => {
  cy.fixture('form.json').then((data) => {
    elements.first_name_input().type(data.first_name)
    elements.last_name_input().type(data.last_name)
    elements.email_input().type(data.email)
    elements.gender_radio().click({force: true})
    elements.mobile_input().type(data.mobile)
    elements.date_of_birth_input().click()
    elements.dob_year_section().click()
    elements.dob_year().select('1994')
    elements.dob_day().contains('1').click()
    elements.subject_input().type(data.subject)
    cy.get('#react-select-2-option-0').click({force: true})
    elements.hobbies_checkbox().check({force: true})
    elements.upload_picture().selectFile('./cypress/fixtures/download.jpg')
    elements.address_textarea().type(data.address)
    cy.get('div').contains('Select State').click({force: true})
    cy.get('div').contains(data.state).click()
    cy.get('div').contains('Select City').click()
    cy.get('div').contains(data.city).click({force: true})
    cy.get('button').contains('Submit').click()
  })
}

const verifyPracticeForm = () => {
  cy.fixture('form.json').then((data) => {
    cy.get('table').contains('Student Name').next().should('contain', `${data.first_name} ${data.last_name}`)
    cy.get('table').contains('Student Email').next().should('contain', data.email)
    cy.get('table').contains('Gender').next().should('contain', data.gender)
    cy.get('table').contains('Mobile').next().should('contain', data.mobile)
    cy.get('table').contains('Date of Birth').next().should('contain', data.dob)
    cy.get('table').contains('Subjects').next().should('contain', data.subject)
    cy.get('table').contains('Hobbies').next().should('contain', data.hobbies)
    cy.get('table').contains('Picture').next().should('contain', 'download.jpg')
    cy.get('table').contains('Address').next().should('contain', data.address)
    cy.get('table').contains('State and City').next().should('contain', `${data.state} ${data.city}`)
  })
}
export default {
  elements,
  fillForm,
  verifyPracticeForm
}