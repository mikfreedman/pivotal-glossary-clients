export class Definition {
  constructor(baseURL, headword) {
    this.headword = headword;
    this._url = baseURL + "/#" + this.slug;
  }

  get slug()
  {
    return this.headword.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }

  get url()
  {
    return this._url;
  }
}

