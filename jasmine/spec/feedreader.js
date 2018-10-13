'use strict'
/*
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    // This is first test suite - a test suite just contains a related set of tests.
    describe('RSS Feeds', function () {
        // it tests to make sure that the allFeeds variable:
        it('are defined', function () {
            expect(allFeeds).toBeDefined();  // has been defined
            expect(allFeeds.length).not.toBe(0);  // and it is not empty
          });

        // it tests to make sure that each allFeeds object has:
        it('all feeds have an url defined and not an empty string', function () {
          allFeeds.forEach(function (feed) {
            expect(feed.url).toBeDefined();  // URL defined
            expect(feed.url.length).not.toBe(0);  // and that the URL is not empty
          });
        });

        // it tests each allFeeds object:
        it('all feeds have a name defined and not an empty string', function () {
          allFeeds.forEach(function (feed) {
            expect(feed.name).toBeDefined();   // if feed has a name defined
            expect(feed.name.length).not.toBe(0);  // if the name is not empty
          });
        });
      });

    // This is second test suite named "The menu".
    describe('The menu', function () {
        // it tests to ensure the menu element is hidden by default.
        it('the menu element is hidden by default', function () {
          var menuHidden = $('body').hasClass('menu-hidden');
          expect(menuHidden).toBe(true);
        });

        // it tests to ensure the menu changes visibility when the menu icon is clicked.
        it('the menu changes visibility when the menu icon is clicked', function () {
            $('.menu-icon-link').click();
            var menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(false);

            $('.menu-icon-link').click();
            var menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
          });
      });

    // This is third test suite named "Initial Entries"
    describe('Initial Entries', function () {
        /* it tests to ensure when the loadFeed function is called
           and completes its work, there is at least a single .entry
           element within the .feed container. */
        beforeEach(function (done) {
          loadFeed(0, done);
        });

        it('at list one entry found when loadFeed is called and done', function () {
          expect($('.feed .entry').length).toBeGreaterThan(0);
        });
      });

    // This is forth test suite named "New Feed Selection"
    describe('New Feed Selection', function () {
      var x;
      var y;
      /* it tests to ensure when a new feed is loaded by the
         loadFeed function that the content actually changes.*/
      beforeEach(function (done) {
          loadFeed(0, function () {
            x = $('.feed').html();
            loadFeed(1, function () {
              y = $('.feed').html();
              done();
            });
          });
        });

      it('when a new feed is loaded the content actually changes', function () {
          expect(x !== y).toBe(true);
        });
    });
  }());
