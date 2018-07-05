window.Glossaries = window.Glossaries || {};

(function(CFGlossary) {
  function cfGlossary(chrome) {
    function getword(info,tab) {
      if (info.menuItemId == "cf-glossary") {
        chrome.tabs.create({
          url: "https://cf-glossary.cfapps.io/#" + info.selectionText
        });
      }
    }

    chrome.contextMenus.create({
      id: 'cf-glossary',
      title: "Lookup %s in CF Glossary",
      contexts:["selection"]
    });

    chrome.contextMenus.onClicked.addListener(getword);
  }

  Glossaries.CFGlossary = cfGlossary;
})(window.Glossaries);
