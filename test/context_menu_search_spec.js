import {ContextMenuSearch} from '../src/context_menu_search';

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

  describe("Slugification", function() {
    it("removes non word characters", function() {
      contextMenuSearch = new ContextMenuSearch(chrome);
      expect(contextMenuSearch.slugify("down$trodden")).toEqual("downtrodden");
    });

    it("replaces whitespace with a single dash", function() {
      contextMenuSearch = new ContextMenuSearch(chrome);
      expect(contextMenuSearch.slugify("down   trodden")).toEqual("down-trodden");
    });

    it("replaces whitespace and removes non word characters", function() {
      contextMenuSearch = new ContextMenuSearch(chrome);
      expect(contextMenuSearch.slugify("do^wn %trodden")).toEqual("down-trodden");
    });
  });
});
