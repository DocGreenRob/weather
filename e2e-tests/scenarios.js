'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  it('should redirect index.html to index.html#/weather', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe('/weather');
  });
  
});
