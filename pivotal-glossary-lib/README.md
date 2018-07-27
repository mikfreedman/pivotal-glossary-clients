<img src="icons/pivotal-glossary-128.png" align="right" />

# Pivotal Glossary Lib
>This is an npm package for accessing <https://cf-glossary.cfapps.io>

## Local Development

### Installation

__OSX__

```bash
brew update
brew install nodejs npm
npm install
```

__Linux (Debian Flavor)__

``` bash
sudo apt update
sudo apt install npm

# https://github.com/joyent/node/issues/3911
if [[ ! -e /usr/bin/node ]] ; then
  sudo ln -s /usr/bin/nodejs /usr/bin/node
fi
```

__Then:__

```bash
npm install
```

### Tests

```bash
npm test
```