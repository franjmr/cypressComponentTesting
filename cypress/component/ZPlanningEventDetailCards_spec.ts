/* eslint-disable jest/expect-expect */
import { mount } from '@cypress/vue'
import Vuetify from 'vuetify'
import ZPlanningEventDetailCard from '../ZPlanningEventDetailCard.vue'

describe('ZPlanningEventDetailCard component - suite', () => {
  const _mount: any = mount
  const propsDataMock = {
    eventdata: { day: new Date('2020-12-10'), incidenceName: 'Paul Tekken3' }
  }

  beforeEach(() => {
    cy.viewport('iphone-8')
    _mount(ZPlanningEventDetailCard, {
      propsData: propsDataMock,
      extensions: { use: [Vuetify] }
    })
  })

  it('should display event type name column', () => {
    cy.get('[data-cy=eventTypeNameColumn]').should('exist')
  })

  it('should display event detail column', () => {
    cy.get('[data-cy=eventDetailColumn]').should('exist')
  })

  it('should display name in the event detail', () => {
    cy.get('[data-cy=eventDetailName]').should('exist')
  })

  it('should content name in the event detail', () => {
    cy.get('[data-cy=eventDetailName]').should('contain', propsDataMock.eventdata.incidenceName)
  })
})
