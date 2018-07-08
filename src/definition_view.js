export class DefinitionView {
  constructor(definition) {
    this.definition = definition;
    this.document = document;
  }

  get html()
  {
    var output = [];
    output.push(this.definition.headword);

    if(this.definition.expansion)
      output.push(` (${this.definition.expansion})`);
    if(this.definition.definition) {
      output.push("<hr>");
      output.push(this.definition.definition);
    }

    if(this.definition.links)
      output.push(`<hr><b>links</b>: ${this.definition.links.join(" ")}`);
    if(this.definition.see_also)
      output.push(`<hr><b>see also</b>: ${this.definition.see_also.join(" ")}`);

    const template = this.document.createElement('div');
    template.innerHTML = output.join("\n");
    return template;
  }
}

