import {EntryRepository} from './entry_repository';

var entryRepository = new EntryRepository();

export function listEntriesFor(body) {
    var searchString = body
        .toString();

    var entries = entryRepository.all();

    return entries.filter((entry) => searchString.indexOf(entry.headword) > -1);
}

export function buildEntryCard(entry) {
    var card = CardService.newCardBuilder();

    let header = CardService.newCardHeader()
        .setTitle(entry.headword);
    if(entry.expansion)
        header.setSubtitle(entry.expansion);

    card.setHeader(header);

    if(entry.definition) {
        card.addSection(CardService.newCardSection()
            .setHeader('Definition')
            .addWidget(CardService.newTextParagraph().setText(entry.definition.toString())));
    }

    return card.build();
}