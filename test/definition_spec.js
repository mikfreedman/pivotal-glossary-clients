import {Definition} from '../src/definition';

describe('Definition', function () {
  var definition;

  describe("Definition ", function() {

    describe("Slugification", function() {
      it("removes non word characters", function() {
        definition = new Definition("http://example.com", "down$trodden");
        expect(definition.slug).toEqual("downtrodden");
      });

      it("replaces whitespace with a single dash", function() {
        definition = new Definition("http://example.com", "down  trodden");
        expect(definition.slug).toEqual("down-trodden");
      });

      it("replaces whitespace and removes non word characters", function() {
        definition = new Definition("http://example.com", "do^wn %trodden");
        expect(definition.slug).toEqual("down-trodden");
      });
    });

    describe("URL", function() {
      it("returns the URL", function() {
        definition = new Definition("http://example.com", "do^wn %trodden");
        expect(definition.url).toEqual("http://example.com/#down-trodden");
      });
    });
  });
});

