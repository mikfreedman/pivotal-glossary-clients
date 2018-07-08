import {Slugger} from '../src/slugger';

describe('Slugger', function () {
  describe("Slugification", function() {
    it("removes non word characters", function() {
      expect(Slugger.slug("down$trodden")).toEqual("downtrodden");
    });

    it("removes whitespace", function() {
      expect(Slugger.slug("down  trodden")).toEqual("downtrodden");
    });

    it("replaces whitespace and removes non word characters", function() {
      expect(Slugger.slug("do^wn %trodden")).toEqual("downtrodden");
    });
  });
});

