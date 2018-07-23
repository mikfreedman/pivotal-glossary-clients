export class ContextMenuEntryView {
  constructor(entry, document) {
    this.entry = entry;
    this.document = document;
  }

  get html()
  {
    var output = [];
    output.push("<div class='headword'>");
    output.push(this.entry.headword);

    if(this.entry.expansion)
      output.push(`<span class="expansion">(${this.entry.expansion})</span>`);

    output.push("</div>");

    if(this.entry.definition) {
      output.push(`<div class="definition">${this.entry.definition}</div>`);
    }

    if(this.entry.links) {
      output.push('<hr><b>links</b>') ;
      this.entry.links.forEach((link) => {
        output.push(`<div class="tooltip-truncate"><a target='_blank' href='${link}'>${link}</a></div>`);
      });
    }

    if(this.entry.see_also) {
      output.push('<hr><b>see also</b>:');
      output.push(this.entry.see_also.map((seeAlso) => {
        return (`<a target='_blank' href='${seeAlso.url}'>${seeAlso.headword}</a>`);
      }).join(', '));
    }

    const template = this.document.createElement('div');
    template.innerHTML = output.join("\n");
    return template;
  }
}

