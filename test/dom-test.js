const JsDom = require('jsdom');
const expect = require('chai').expect;

const mockData = require('../resources/fixtures/data/results-majority-partly-images.json');
require('svelte/ssr/register');
const staticTpl = require('../views/HtmlStatic.html');
const renderingData = {
  item: mockData,
  toolRuntimeConfig: {
    displayOptions: {}
  }
}
var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));


function element(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelector(selector));
      })
  })
}

function elementCount(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelectorAll(selector).length);
      })
  })
}

describe('Q election executive dom tests', function() {
  it('should pass if majority marker is found', function() {
    return elementCount('div.q-election-executive-majority').then(value => {
        expect(value).to.be.equal(1);
    })
  })

  it('should pass if for each data entry a DOM element is created', function() {
    return elementCount('div.q-election-executive-item').then(value => {
      expect(value).to.be.equal(renderingData.item.candidates.length);
    })
  })
})
