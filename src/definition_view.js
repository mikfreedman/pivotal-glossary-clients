
export class DefinitionView {
  constructor(definition, definitionRepository, document) {
    this.definition = definition;
    this.document = document;
    this.definitionRepository = definitionRepository;
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

    if(this.definition.links) {
      output.push('<hr><b>links</b><ul>');
      this.definition.links.forEach((link) => {
        output.push(`<li><a target='_blank' href='${link}'>${link}</a></li>`);
      });
      output.push('</ul>');
    }

    if(this.definition.see_also) {
      output.push('<hr><b>see also</b>:');
      output.push(this.definition.see_also.map((seeAlso) => {
        return (`<a target='_blank' href='${this.definitionRepository.newNotFoundDefinition(seeAlso).url}'>${seeAlso}</a>`);
      }).join(', '));
    }

    const template = this.document.createElement('div');
    template.innerHTML = output.join("\n");
    return template;
  }
}

