# palvelukartta

Simple JavaScript wrapper for the City of Helsinki Service Map REST API.

## Maintenance status

This project is not actively maintained.

Bug fixes and small compatibility updates may still happen, but ongoing feature development is not guaranteed.

## API status

- Current default backend in this library: `https://www.hel.fi/palvelukarttaws/rest/v4`
- Current API documentation: https://www.hel.fi/palvelukarttaws/restpages/index_en.html
- Legacy callback API is kept for compatibility.
- A Promise API is available for new code.

## Install

```bash
npm install palvelukartta
```

## Usage

### Legacy callback API (kept for compatibility)

```js
const pk = require("palvelukartta");

pk.itemRetrieve("organization", null, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

### Promise API (recommended for new code)

```js
const pk = require("palvelukartta");

async function run() {
  const data = await pk.itemRetrieveAsync("organization", null);
  console.log(data);
}

run().catch(console.error);
```

### Retrieve a single item by id

```js
const pk = require("palvelukartta");

pk.itemRetrieve("organization", { id: 91 }, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

### Retrieve unit accessibility data

```js
const pk = require("palvelukartta");

pk.itemRetrieve("unit", { id: 31, accessibility: true }, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

## Configuration

You can override the API base URL with environment variable `PALVELUKARTTA_API_BASE_URL`.

Example:

```bash
PALVELUKARTTA_API_BASE_URL="https://www.hel.fi/palvelukarttaws/rest/v4" node app.js
```

## Development

```bash
npm test
```

To run the optional live API smoke test:

```bash
LIVE_API_TESTS=1 npm test
```
