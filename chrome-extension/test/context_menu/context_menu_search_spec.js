import {ContextMenuSearch} from '../../src/context_menu/context_menu_search';

describe('ContextMenuSearch', function () {
  var contextMenuSearch;
  var chrome;
  var items = {};

  beforeEach(function() {
    chrome = {
      runtime: {
        onInstalled: {
          addListener: function() {
          }
        }
      },
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
    spyOn(chrome.runtime.onInstalled, "addListener");
  });

  describe("Pivotal Glossary Addon", function() {
    it("adds the listener", function() {
      contextMenuSearch = new ContextMenuSearch(chrome);
      expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalled();
    });
  });
});
