import {EntryRepository} from './entry_repository';

var entryRepository = new EntryRepository();

/**
 * This module is the entry point for your GAS code. You can create additional
 * modules and import them here as necessary.
 *
 * Functions exported from this module will appear in the GAS editor's "Run"
 * and "Select function" menus. GAS will also pick up any trigger functions
 * exported from this module. For more details, see
 * https://developers.google.com/apps-script/guides/triggers/
 */

/**
 *  This function builds a set of data about this sender's presence in your
 *  inbox.
 *
 *  @param {String} messageId The message ID of the open message.
 *  @return {Object} a collection of sender information to display in cards.
 */
export function listEntriesFor(body) {
  var searchString = body
    .toString()
    .toLowerCase()
    .replace(/\W/g, '');

   var entries = entryRepository.all()
   var foundEntries = [];

  return entries.filter((entry) => searchString.indexOf(entry.headword) > -1)
}

export function extractSenderData(messageId) {
  // Use the Gmail service to access information about this message.
  var mail = GmailApp.getMessageById(messageId);
  var threadId = mail.getThread().getId();
  var senderEmail = extractEmailAddress(mail.getFrom());

  var recentThreads = GmailApp.search('from:' + senderEmail);
  var recents = [];

  // Retrieve information about up to 5 recent threads from the same sender.
  recentThreads.slice(0,MAX_THREADS).forEach(function(thread) {
    if (thread.getId() != threadId && ! thread.isInChats()) {
      recents.push({
        'subject': thread.getFirstMessageSubject(),
        'count': thread.getMessageCount(),
        'link': 'https://mail.google.com/mail/u/0/#inbox/' + thread.getId(),
        'lastDate': thread.getLastMessageDate().toDateString()
      });
    }
  });

  var senderData = {
    "email": senderEmail,
    'recents': recents
  };

  return senderData;
}

/**
 *  Given the result of GmailMessage.getFrom(), extract only the email address.
 *  getFrom() can return just the email address or a string in the form
 *  "Name <myemail@domain>".
 *
 *  @param {String} sender The results returned from getFrom().
 *  @return {String} Only the email address.
 */
export function extractEmailAddress(sender) {
  var regex = /\<([^\@]+\@[^\>]+)\>/;
  var email = sender;  // Default to using the whole string.
  var match = regex.exec(sender);
  if (match) {
    email = match[1];
  }
  return email;
}

/**
 *  Builds a card to display information about a recent thread from this sender.
 *
 *  @param {String} senderEmail The sender email.
 *  @param {Object} threadData Infomation about the thread to display.
 *  @return {Card} a card that displays thread information.
 */
export function buildRecentThreadCard(senderEmail, threadData) {
  var card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle(threadData.subject));
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\">Recent thread</font>");
  section.addWidget(CardService.newTextParagraph().setText(threadData.subject));
  section.addWidget(CardService.newKeyValue()
    .setTopLabel('Sender')
    .setContent(senderEmail));
  section.addWidget(CardService.newKeyValue()
    .setTopLabel('Number of messages')
    .setContent(threadData.count.toString()));
  section.addWidget(CardService.newKeyValue()
    .setTopLabel('Last updated')
    .setContent(threadData.lastDate.toString()));

  var threadLink = CardService.newOpenLink()
    .setUrl(threadData.link)
    .setOpenAs(CardService.OpenAs.FULL_SIZE);
  var button = CardService.newTextButton()
    .setText('Open Thread')
    .setOpenLink(threadLink);
  section.addWidget(CardService.newButtonSet().addButton(button));

  card.addSection(section);
  return card.build();
}

function buildEntryCard(entry) {
  var card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle(entry.headword));
  var section = CardService.newCardSection();
  section.addWidget(CardService.newTextParagraph().setText(entry.description));

  card.addSection(section);
  return card.build();

}
