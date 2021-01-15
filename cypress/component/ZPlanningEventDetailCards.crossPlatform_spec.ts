/* eslint-disable jest/expect-expect */
import { mount } from '@cypress/vue'
import Vuetify from 'vuetify'
import ZPlanningEventDetailCard from '../ZPlanningEventDetailCard.vue'

describe('ZPlanningEventDetailCard component - Cross Platform suite - I', () => {
  const viewports: Cypress.ViewportPreset[] = ['iphone-x', 'samsung-s10', 'macbook-16']
  const _mount: any = mount
  const propsDataMock = {
    eventdata: { day: new Date('2020-12-10'), incidenceName: 'Paul Tekken3' }
  }

  viewports.forEach(
    (viewport: Cypress.ViewportPreset) => {
      context(`Device ${viewport}`, () => {
        beforeEach(() => {
          cy.viewport(viewport)
          _mount(ZPlanningEventDetailCard, { propsData: propsDataMock, extensions: { use: [Vuetify] } })
          // cy.wait(4000)
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
          cy.get('[data-cy=eventDetailName]').should('contain', propsDataMock.eventdata.incidenceName
          )
        })
      })
    }
  )
})

describe('ZPlanningEventDetailCard component - Cross Platform suite - II', () => {
  const _mount: any = mount
  const propsDataMock = {
    eventdata: { day: new Date('2020-12-10'), incidenceName: 'Paul Tekken3' }
  }

  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
      // cy.wait(4000)
      _mount(ZPlanningEventDetailCard, {
        propsData: propsDataMock,
        extensions: { use: [Vuetify] }
      })
    })

    it('should display event type name column', () => {
      cy.get('[data-cy=eventTypeNameColumn]').should('exist')
    })
  })

  context('iphone-X portrait resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-x', 'portrait')
      // cy.wait(4000)
      _mount(ZPlanningEventDetailCard, {
        propsData: propsDataMock,
        extensions: { use: [Vuetify] }
      })
    })

    it('should display event type name column in portrait', () => {
      cy.get('[data-cy=eventTypeNameColumn]').should('exist')
    })
  })

  context('iphone-X landscape resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-x', 'landscape')
      // cy.wait(4000)
      _mount(ZPlanningEventDetailCard, {
        propsData: propsDataMock,
        extensions: { use: [Vuetify] }
      })
    })

    it('should display event type name column in landscape', () => {
      cy.get('[data-cy=eventTypeNameColumn]').should('exist')
    })
  })
})
