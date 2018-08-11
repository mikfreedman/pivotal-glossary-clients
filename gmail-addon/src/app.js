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
    if (entry.expansion)
        header.setSubtitle(entry.expansion);

    card.setHeader(header);

    if (entry.definition) {
        card.addSection(CardService.newCardSection()
            .setHeader('Definition')
            .addWidget(CardService.newTextParagraph().setText(entry.definition.toString())));
    }

    if (entry.see_also) {
        var section = CardService.newCardSection()
            .setHeader('See Also');

        var buttonSet = CardService.newButtonSet();

        entry.see_also.forEach(seeAlso => {
            buttonSet.addButton(CardService.newTextButton()
                .setText(seeAlso.headword)
                .setOpenLink(CardService.newOpenLink()
                    .setUrl(seeAlso.url)
                    .setOpenAs(CardService.OpenAs.OVERLAY)));
        });

        section.addWidget(buttonSet);

        card.addSection(section);
    }

    return card.build();
}
