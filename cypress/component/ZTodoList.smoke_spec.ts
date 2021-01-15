/* eslint-disable jest/no-done-callback */
/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */
import { mount } from '@cypress/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import { CommonTaskIds } from '~/shared-type/workflow/task'
import { TWorkItem, WorkItemTaskTypes } from '~/shared-type/workflow/workflowTypes'
import ZTodoList from '../ZTodoList.vue'
import * as helpersCommon from './__helpers__/ZCommon.helper'

const _createTodoListWorkItem = ():TWorkItem[] => {
  const mockItem01 = helpersCommon.createEmptyWorkItem('King', CommonTaskIds.Approval, WorkItemTaskTypes.Windows, new Date(2020, 1, 11))
  const mockItem02 = helpersCommon.createEmptyWorkItem('Kazuya', CommonTaskIds.CarryOut, WorkItemTaskTypes.Windows, new Date(2020, 1, 12))
  const mockItem03 = helpersCommon.createEmptyWorkItem('Paul Phoenix', CommonTaskIds.SendMail, WorkItemTaskTypes.Windows, new Date(2020, 1, 13))
  const mockItem04 = helpersCommon.createEmptyWorkItem('Michelle Chang', CommonTaskIds.Approval, WorkItemTaskTypes.Windows, new Date(2020, 1, 14))
  mockItem01.stateName = 'Tekken01'
  mockItem02.stateName = 'Tekken02'
  mockItem03.stateName = 'Tekken03'
  mockItem04.stateName = 'Tekken04'

  const mockTodoListWorkItems: TWorkItem[] = [mockItem01, mockItem02, mockItem03, mockItem04]
  return mockTodoListWorkItems
}

const _mockPzt = (labelPath: string, params?: any[]): string => {
  let _strArgs = labelPath
  if (params) {
    _strArgs = _strArgs.concat('_params_').concat(JSON.stringify(params))
  }
  return _strArgs
}

const _mountComponent = (): void => {
  const _workItems = _createTodoListWorkItem()
  Vue.use(Vuetify)
  const vuetify = new Vuetify()
  mount(ZTodoList, {
    stubs: { 'z-approval-task': true },
    mocks: {
      $pzt: cy.stub().callsFake(_mockPzt),
      $accessor: {
        stWorkflow: {
          todoListWorkItems: _workItems,
          aLoadTodoListWorkItems: cy.spy().as('My aLoadTodoListWorkItems')
        }
      }
    },
    stylesheets: [
      'https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.21/vuetify.css',
      'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'
    ],
    extensions: {
      use: [vuetify]
    }
  })
}

describe('ZTodoList component - suite', () => {
  const viewports: Cypress.ViewportPreset[] = ['iphone-x', 'samsung-s10', 'macbook-16']

  viewports.forEach(
    (viewport: Cypress.ViewportPreset) => {
      context(`Device ${viewport}`, () => {
        beforeEach(() => {
          cy.viewport(viewport)
        })

        it('should display four Item Calculated Dates', () => {
          _mountComponent()
          cy.get('[data-cy=itemCalculatedDate]').should('have.length', 4)
        })

        it('should display four Bpo Names', () => {
          _mountComponent()
          cy.get('[data-cy=itemBpoNameConcatStateName]').as('items')
          cy.get('@items')
            .should('have.length', 4)
            .and('contain', 'King. Tekken01')
            .and('contain', 'Kazuya. Tekken02')
            .and('contain', 'Paul Phoenix. Tekken03')
            .and('contain', 'Michelle Chang. Tekken04')
        })

        it('should click button to refresh ToDoList', () => {
          _mountComponent()
          cy.get('[data-cy=buttonRefreshToDoList]').as('refreshBtn')
          cy.get('@refreshBtn').should('be.visible')
          cy.get('@refreshBtn').click()
        })
      })
    }
  )
})
