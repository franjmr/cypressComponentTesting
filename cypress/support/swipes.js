// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
Cypress.Commands.add('swipeLeft', { prevSubject: 'element'}, (subject) => {
    const clientX = subject['0'].clientWidth
    const clientY = subject['0'].clientHeight
    cy.get(subject.selector).swipe({
        origin: { x: clientX, y: clientY },
        target: { x: clientX / 2, y: clientY }
    })
})

Cypress.Commands.add('swipeRight', { prevSubject: 'element'}, (subject) => {
    const clientX = subject['0'].clientWidth
    const clientY = subject['0'].clientHeight
    cy.get(subject.selector).swipe({
        origin: { x: clientX /2, y: clientY },
        target: { x: clientX, y: clientY }
    })
})

Cypress.Commands.add('swipeUp', { prevSubject: 'element'}, (subject) => {
    const clientX = subject['0'].clientWidth
    const clientY = subject['0'].clientHeight
    cy.get(subject.selector).swipe({
        origin: { x: clientX / 2, y: clientY },
        target: { x: clientX / 2, y: 0 }
    })
})

Cypress.Commands.add('swipeDown', { prevSubject: 'element'}, (subject) => {
    const clientX = subject['0'].clientWidth
    const clientY = subject['0'].clientHeight
    cy.get(subject.selector).swipe({
        origin: { x: clientX / 2, y: 0 },
        target: { x: clientX / 2, y: clientY }
    })
})

Cypress.Commands.add('swipe', { prevSubject: 'element'}, (subject, {origin, target}) => {
    cy.get(subject.selector)
        .trigger('touchstart', {changedTouches: [{clientX: origin.x, clientY: origin.y}]}) 
        .trigger('touchmove', {changedTouches: [{clientX: target.x, clientY: target.y}]})
        .trigger('touchend', {changedTouches: [{clientX: target.x, clientY: target.y}]})
})