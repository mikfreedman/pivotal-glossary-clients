Pivotal Glossary Gmail Addon

## Installation

1. Clone this repo
1. Run `npm install`
1. Use [google/clasp](https://github.com/google/clasp) for deploying. 

### Clasp Initialization

**Step one: Authorize**
```bash
node_modules/.bin/clasp login
```

**Step two: Create configuration**

create a file called `.clasp.json` in the root directory of the project, that looks like so:

```json
{
  "scriptId": "[pivotal-glossary-script-id]",
  "rootDir":"dist"
}
```

Where `[pivotal-glossary-script-id]` is from the target file on Google Drive.

**Step three: Test clasp**
```bash
mkdir -p dist
clasp pull
```

## Testing

1. Run  `npm run test`

## Usage

1. Add your GAS code in `src/`
1. Run `npm run build`

## Deployment

Paste the contents of `dist/Code.gs` into the GAS editor's `Code.gs` file

Or if you have installed `clasp` mentioned above

```bash
npm run deploy
```
