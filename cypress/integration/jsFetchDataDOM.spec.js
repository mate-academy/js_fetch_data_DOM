'use strict';

describe('Fetch data in DOM', () => {
  beforeEach('Open site', () => {
    cy.visit('/');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Motorola XOOM™ with Wi-Fi');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('MOTOROLA XOOM™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('MOTOROLA ATRIX™ 4G');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Dell Streak 7');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Samsung Gem™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Dell Venue');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Nexus S');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('LG Axis');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Samsung Galaxy Tab™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Samsung Showcase™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('DROID™ 2 Global by Motorola');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('DROID™ Pro by Motorola');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('MOTOROLA BRAVO™ with MOTOBLUR™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Motorola DEFY™ with MOTOBLUR™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('T-Mobile myTouch 4G');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Samsung Mesmerize™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('SANYO ZIO');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Samsung Transform™');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('T-Mobile G2');
  });

  it('should contain phone name', () => {
    cy.get('html').contains('Motorola CHARM™ with MOTOBLUR™');
  });
});
