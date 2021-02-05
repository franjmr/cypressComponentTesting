# Cypress Component Testing
Cypress Component Testing uses framework-specific libraries on top of Cypress Test Runner to create a browser-based testing and isolated development environment.

## About this repository
This is not a complete Vue project, they are examples of unit tests to be applied on an existing Vue project.

## What is Browser-based Component Testing?
Browser-based component testing with Cypress creates a tight development cycle between browser and test framework, when building the components and applications.

## Getting Started
- A Cypress Component Test contains a mount function and assertions about the component it has rendered.
- A test may interact with component as a user would, using Cypress API commands like .click(), .type(), or many more.

## Cross Browser Testing
Cypress allow to run tests across multiple browsers (Chrome-family browsers and Firefox) and control the size and orientation of the screen for your application.
- [Cross Browser Testing](https://docs.cypress.io/guides/guides/cross-browser-testing.html#Continuous-Integration-Strategies)
- [Viewport](https://docs.cypress.io/api/commands/viewport.html)

## Installation
Install [@cypress/vue](https://www.npmjs.com/package/@cypress/vue) package
```cmd
npm i @cypress/vue
```

This package allows you to use Cypress test runner to mount and test your Components within Cypress. It is built on top of the Vue Test Utils package.

## Setup
Required properties in <b>cypress.json</b> file to enable the component testing 

```json
{
  "experimentalComponentTesting": true,
  "componentFolder": "tests/components"
}
```

## An example
```typescript 
import { mount } from '@cypress/vue'
import Vuetify from 'vuetify'
import ZPlanningEventDetailCard from '../ZPlanningEventDetailCard.vue'

describe('ZPlanningEventDetailCard component - suite', () => {
  const propsDataMock = {
    eventdata: { day: new Date('2020-12-10'), incidenceName: 'Paul Tekken3' }
  }

  beforeEach(() => {
    cy.viewport('iphone-8')
    mount(ZPlanningEventDetailCard, {
      propsData: propsDataMock,
      extensions: { use: [Vuetify] }
    })
  })

  it('should display name in the event detail', () => {
    cy.get('[data-cy=eventDetailName]').should('exist')
  })

  it('should content name in the event detail', () => {
    cy.get('[data-cy=eventDetailName]').should('contain', propsDataMock.eventdata.incidenceName)
  })
```

## Other example using Viewports with Cypress contexts
```typescript
describe('ZPlanningEventDetailCard component - Cross Platform suite ', () => {
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
          mount(ZPlanningEventDetailCard, {
            propsData: propsDataMock,
            extensions: { use: [Vuetify] }
          })
        })

        it('should display name in the event detail', () => {
          cy.get('[data-cy=eventDetailName]').should('exist')
        })

        it('should content name in the event detail', () => {
          cy.get('[data-cy=eventDetailName]').should('contain', propsDataMock.eventdata.incidenceName)
        })
      })
    }
  )
})

```

## Run the tests
```cmd
cypress run --spec "component/integration/ZPlanningEventDetailCards_spec.js"
```