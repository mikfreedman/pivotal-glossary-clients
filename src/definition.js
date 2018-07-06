export class Definition {
  constructor(baseURL, headword) {
    this.headword = headword;
    this.baseURL = baseURL;
  }

  slug()
  {
    return this.headword.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }

  url()
  {
    return this.baseURL + "/#" + this.slug();
  }
}

