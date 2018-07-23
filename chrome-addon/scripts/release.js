export class Release {
  constructor(pkg) {
    Object.assign(this, pkg);

    if(process.env.CIRCLE_BUILD_NUM)
      this.version += '.' + process.env.CIRCLE_BUILD_NUM;
  }

  get filename() {
    return this.name + '-' + this.version + '.zip'
  }
}
