import {Definition} from '../src/definition';

describe('Definition', function () {
  var definition;

  describe("matches", function() {
    it("returns true when the slug version matches", function() {
      definition = new Definition("http://example.com", { headword: "do^wn %trodden" });
      expect(definition.matches("down-trodden")).toBe(true);
    });
    it("returns false when the slugged version does not match", function() {
      definition = new Definition("http://example.com", { headword: "felix" });
      expect(definition.matches("down-trodden")).toBe(false);

      definition = new Definition("http://example.com", { headword: "felix cat" });
      expect(definition.matches("felixcat")).toBe(true);
    });
  });

  describe("Definition ", function() {
    describe("URL", function() {
      it("returns the URL", function() {
        definition = new Definition("http://example.com", { headword: "do^wn %trodden" });
        expect(definition.url).toEqual("http://example.com/#downtrodden");
      });
    });
  });
});

