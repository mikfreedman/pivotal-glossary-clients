/** * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e data provided by the Gmail UI.
 * @returns {Card[]}
 */

function buildAddOn(e) {
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var cards = [];

  var mail = GmailApp.getMessageById(messageId);
  var text = mail.getPlainBody();

  return listEntriesFor(text).map(function(entry) {
      return buildEntryCard(entry);
  });
}
