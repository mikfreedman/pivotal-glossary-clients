export class Slugger {
  static slug(str)
  {
    if(!str)
      return;

    return str.toString().toLowerCase()
      .replace(/ /g, '-')
      .replace(/\W/g, '');
  }
}
