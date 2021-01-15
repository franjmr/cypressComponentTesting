/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable jest/expect-expect */
import { mount } from '@cypress/vue'
import Hello from '../components/ZFilterList/ZHelloWorld.vue'

describe('Hello World suite', () => {
  it('shows error for short text', () => {
    cy.viewport('samsung-note9')
    mount(Hello)
    cy.get('[data-cy=username]').type('hello')
    cy.contains('.error', 'enter a longer username')
    cy.get('[data-cy=username]').type(' world!')
    cy.get('.error').should('not.exist')
  })
})
