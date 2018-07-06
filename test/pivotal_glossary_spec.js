import {PivotalGlossary} from '../src/pivotal_glossary'

describe('PivotalGlossary', function () {
  var pivotalGlossary;
  var chrome;
  var items = {};

  beforeEach(function() {
    chrome = {
      tabs: {
        create: function() {
        }
      },
      contextMenus: {
        create: function() {
        },
        onClicked: {
          addListener: function() {
          }
        }
      }
    }

    spyOn(chrome.tabs, "create");
    spyOn(chrome.contextMenus, "create");
    spyOn(chrome.contextMenus.onClicked, "addListener");
  });

  describe("Pivotal Glossary Addon", function() {
    it("adds the listener", function() {
      pivotalGlossary = new PivotalGlossary(chrome);
      expect(chrome.contextMenus.create).toHaveBeenCalled();
    });
  });

  describe("Slugification", function() {
    it("removes non word characters", function() {
      pivotalGlossary = new PivotalGlossary(chrome);
      expect(pivotalGlossary.slugify("down$trodden")).toEqual("downtrodden");
    });

    it("replaces whitespace with a single dash", function() {
      pivotalGlossary = new PivotalGlossary(chrome);
      expect(pivotalGlossary.slugify("down   trodden")).toEqual("down-trodden");
    });

    it("replaces whitespace and removes non word characters", function() {
      pivotalGlossary = new PivotalGlossary(chrome);
      expect(pivotalGlossary.slugify("do^wn %trodden")).toEqual("down-trodden");
    });
  });
});
