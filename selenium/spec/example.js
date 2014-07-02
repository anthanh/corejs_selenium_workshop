/* global describe, it, after, before */
'use strict';

var assert = require('assert'),
    common = require('grunt-corejs-build/lib/selenium/common.js');

describe('Google Search', function() {

    this.timeout(30000);
    this.slow(5000);

    var driver;

    before(function() {
        driver = common.getDriver();
    });

    after(function(done) {
        driver.quit().then(function() {
            done();
        });
    });

    it('should work', function(done) {

        driver.get('http://www.google.com');
        driver.findElement({name: 'q'}).sendKeys('webdriver');
        driver.findElement({name: 'btnG'}).click();
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return title.indexOf('webdriver') !== -1;
            });
        }, common.WAIT_TIMEOUT).then(function() {
            
            driver.takeScreenshot().then(function(data) {
                common.writeScreenshot(data, 'page.png');
            });

            driver.findElement({name: 'q'}).getAttribute('value').then(function(value) {
                assert.equal(value, 'webdriver');
                done();
            });
        });

    });
});