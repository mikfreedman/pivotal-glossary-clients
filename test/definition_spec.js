import {Definition} from '../src/definition';

describe('Definition', function () {
  var definition;

  describe("Definition ", function() {
    describe("URL", function() {
      it("returns the URL", function() {
        definition = new Definition("http://example.com", { headword: "do^wn %trodden" });
        expect(definition.url).toEqual("http://example.com/#down-trodden");
      });
    });
  });
});

