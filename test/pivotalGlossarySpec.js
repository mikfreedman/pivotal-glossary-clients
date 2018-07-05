describe('Glossaries.PivotalGlossary', function () {
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
      pivotalGlossary = Glossaries.PivotalGlossary(chrome);
      expect(chrome.contextMenus.create).toHaveBeenCalled();
    });
  });
});
