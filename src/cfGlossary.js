window.Glossaries = window.Glossaries || {};

(function(CFGlossary) {
  function cfGlossary(chrome) {
    function slugify(text)
    {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    function getword(info,tab) {
      if (info.menuItemId == "cf-glossary") {
        chrome.tabs.create({
          url: "https://cf-glossary.cfapps.io/#" + slugify(info.selectionText)
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
