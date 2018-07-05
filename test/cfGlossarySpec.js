describe('Glossaries.CFGlossary', function () {
  var cfGlossary;
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

  describe("CF Glossary Addon", function() {
    it("adds the listener", function() {
      cfGlossary = Glossaries.CFGlossary(chrome);
      expect(chrome.contextMenus.create).toHaveBeenCalled();
    });
  });
});
