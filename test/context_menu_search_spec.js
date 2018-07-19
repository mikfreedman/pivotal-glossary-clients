import {ContextMenuSearch} from '../src/context_menu/context_menu_search';

describe('ContextMenuSearch', function () {
  var contextMenuSearch;
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
    };

    spyOn(chrome.tabs, "create");
    spyOn(chrome.contextMenus, "create");
    spyOn(chrome.contextMenus.onClicked, "addListener");
  });

  describe("Pivotal Glossary Addon", function() {
    it("adds the listener", function() {
      contextMenuSearch = new ContextMenuSearch(chrome);
      expect(chrome.contextMenus.create).toHaveBeenCalled();
    });
  });
});
