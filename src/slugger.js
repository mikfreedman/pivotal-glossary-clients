export class Slugger {
  static slug(str)
  {
    return str.toString().toLowerCase()
      .replace(/ /g, '-')
      .replace(/\W/g, '');
  }
}
