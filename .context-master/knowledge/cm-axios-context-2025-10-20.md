### Concurrent Requests with Promise.all

Source: https://github.com/axios/axios/blob/v1.x/README.md

Demonstrates how to execute multiple requests concurrently using `Promise.all`.

```APIDOC
## Concurrent Requests

### Description
Executes multiple HTTP requests simultaneously and processes their results once all have completed.

### Method
GET (for individual requests)

### Endpoint
`/user/{id}` and `/user/{id}/permissions`

### Request Example
```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0].data;
    const perm = results[1].data;
    console.log('Account:', acct);
    console.log('Permissions:', perm);
  })
  .catch(function (error) {
    console.error('Error fetching data:', error);
  });
```

### Response
#### Success Response (200)
- **results** (array) - An array containing the response data from each successful request.

#### Response Example
```json
[
  {
    "data": {
      "account_details": "..."
    }
  },
  {
    "data": {
      "permissions": "..."
    }
  }
]
```
```

--------------------------------

### Handling Axios Responses with .then()

Source: https://github.com/axios/axios/blob/v1.x/README.md

Demonstrates how to use the `.then()` method to process a successful Axios request. It shows how to access various properties of the response object, such as `data`, `status`, `statusText`, `headers`, and `config`.

```javascript
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

--------------------------------

### Run Axios Examples (Web)

Source: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md

Starts a local development server to run Axios examples, accessible at http://127.0.0.1:3000. This is useful for manual testing and observing example behavior in a browser.

```bash
npm run examples
# Open 127.0.0.1:3000
```

--------------------------------

### Axios Concurrent Requests with Promise.all

Source: https://github.com/axios/axios/blob/v1.x/README.md

Illustrates how to execute multiple Axios requests concurrently and handle all responses once they complete using `Promise.all`. This is useful for fetching related data simultaneously. The results are accessed via an array indexed by the order of the promises passed to `Promise.all`.

```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
```

--------------------------------

### Run Axios Sandbox in Terminal

Source: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md

Executes the Axios sandbox client in the terminal. This allows for testing Axios functionalities directly within the command line interface.

```bash
npm start
> node ./sandbox/client
```

--------------------------------

### Build Axios Project

Source: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md

Bundles the Axios source code using Rollup. This command is used to create the distributable files for the project. It is essential for building the final package.

```bash
npm run build
```

--------------------------------

### Prepare Axios for Release

Source: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md

Prepares the Axios codebase for a new release. This command typically handles version bumping and other release-related tasks.

```bash
npm run version
```

--------------------------------

### Basic GET Request

Source: https://github.com/axios/axios/blob/v1.x/README.md

Demonstrates how to perform a basic GET request to fetch data from a specified URL and handle the response or errors.

```APIDOC
## GET /user?ID={id}

### Description
Fetches user data based on the provided ID.

### Method
GET

### Endpoint
`/user?ID={id}`

### Parameters
#### Query Parameters
- **ID** (string) - Required - The ID of the user to retrieve.

### Request Example
```javascript
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

### Response
#### Success Response (200)
- **data** (object) - The user data.
- **status** (number) - The HTTP status code.
- **headers** (object) - The response headers.

#### Response Example
```json
{
  "data": {
    "id": "12345",
    "name": "John Doe"
  },
  "status": 200,
  "headers": {}
}
```
```

--------------------------------

### Run Axios Tests

Source: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md

Executes the unit tests for the Axios project using npm. This command runs both Jasmine and Mocha test suites. Ensure all tests pass before submitting changes.

```bash
npm run test
```

--------------------------------

### Axios API

Source: https://github.com/axios/axios/blob/v1.x/README.md

Axios provides a set of methods for making HTTP requests. These include aliases for common HTTP methods like GET, POST, PUT, DELETE, etc.

```APIDOC
## Axios API

Axios provides the following methods for making HTTP requests:

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.delete(url[, config])`
- `axios.patch(url[, data[, config]])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`

### Description

These methods allow you to send HTTP requests to a specified URL with optional data and configuration. They return a Promise that resolves with the response or rejects with an error.
```

--------------------------------

### GET Request with Params Object

Source: https://github.com/axios/axios/blob/v1.x/README.md

Shows an alternative way to perform a GET request using a `params` object for query parameters.

```APIDOC
## GET /user

### Description
Fetches user data by passing query parameters within a `params` object.

### Method
GET

### Endpoint
`/user`

### Parameters
#### Query Parameters
- **ID** (string) - Required - The ID of the user to retrieve.

### Request Example
```javascript
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

### Response
#### Success Response (200)
- **data** (object) - The user data.

#### Response Example
```json
{
  "data": {
    "id": "12345",
    "name": "John Doe"
  }
}
```
```

--------------------------------

### Import Axios in JavaScript Modules

Source: https://github.com/axios/axios/blob/v1.x/README.md

Demonstrates how to import the Axios library in JavaScript projects using ES module syntax. It shows importing specific functions like `isCancel` and `AxiosError`, and using the default export.

```javascript
import axios, {isCancel, AxiosError} from 'axios';

console.log(axios.isCancel('something'));
```

```javascript
import axios from 'axios';

console.log(axios.isCancel('something'));
```

```javascript
import { default as axios } from 'axios';
```

--------------------------------

### Import Axios from Specific Bundles

Source: https://github.com/axios/axios/blob/v1.x/README.md

Provides methods to import Axios from specific bundled files, which can be useful for custom or legacy environments where direct module imports might fail. It specifies browser and Node.js CommonJS bundles.

```javascript
const axios = require('axios/dist/browser/axios.cjs'); // browser commonJS bundle (ES2017)
```

```javascript
// const axios = require('axios/dist/node/axios.cjs'); // node commonJS bundle (ES2017)
```

--------------------------------

### GET Request with Async/Await

Source: https://github.com/axios/axios/blob/v1.x/README.md

Illustrates how to use `async/await` syntax for performing asynchronous GET requests.

```APIDOC
## GET /user?ID={id} (Async/Await)

### Description
Fetches user data using `async/await` for cleaner asynchronous code.

### Method
GET

### Endpoint
`/user?ID={id}`

### Parameters
#### Query Parameters
- **ID** (string) - Required - The ID of the user to retrieve.

### Request Example
```javascript
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### Response
#### Success Response (200)
- **data** (object) - The user data.

#### Response Example
```json
{
  "data": {
    "id": "12345",
    "name": "John Doe"
  }
}
```
```

--------------------------------

### Set Rate Limits for Upload/Download in Node.js with Axios

Source: https://github.com/axios/axios/blob/v1.x/README.md

Demonstrates how to set download and upload rate limits for the http adapter in Node.js environments using the maxRate option. This example also shows progress capturing.

```javascript
const {data} = await axios.post(LOCAL_SERVER_URL, myBuffer, {
  onUploadProgress: ({progress, rate}) => {
    console.log(`Upload [${(progress*100).toFixed(2)}%]: ${(rate / 1024).toFixed(2)}KB/s`)
  },

  maxRate: [100 * 1024], // 100KB/s limit
});
```

--------------------------------

### Make Concurrent API Requests with Axios.all and Axios.spread

Source: https://github.com/axios/axios/blob/v1.x/examples/all/index.html

This snippet shows how to fetch data from two different GitHub API endpoints simultaneously using axios.all. The results are then processed using axios.spread to update the DOM with user avatar, name, and organization details. It assumes the existence of elements with IDs 'useravatar', 'username', and 'orgs' in the HTML.

```javascript
axios.all([ axios.get('https://api.github.com/users/mzabriskie'), axios.get('https://api.github.com/users/mzabriskie/orgs') ]).then(axios.spread(function (user, orgs) { document.getElementById('useravatar').src = user.data.avatar_url; document.getElementById('username').innerHTML = user.data.name; document.getElementById('orgs').innerHTML = orgs.data.map(function (org) { return ( '<li class="row">' + '<img src="' + org.avatar_url + '" class="col-md-1"/>' + '<div class="col-md-3">' + '<strong>' + org.login + '</strong>' + '</div>' + '</li>' ); }).join(''); }));
```

--------------------------------

### Axios POST with Fetch Adapter for Large Data Upload

Source: https://github.com/axios/axios/blob/v1.x/test/manual/progress.html

This snippet demonstrates uploading a large data array using Axios with the Fetch adapter. It configures event listeners for upload and download progress, logging details during the process and handling success or failure with console messages.

```javascript
const data = new Int8Array(10 * 1024 * 1024);
data.fill(123);
console.log('Starting...');

(async() => {
  await axios.post('https://httpbin.org/post', data, {
    adapter: 'fetch',
    onUploadProgress: (e) => console.log('fetch upload', e),
    onDownloadProgress: (e) => console.log('fetch download', e)
  }).then(data => {
    console.log(`Done: `, data);
  }).catch(e => console.warn('fetch', e));
})();
```

--------------------------------

### Axios GET Request Example with Promises

Source: https://github.com/axios/axios/blob/v1.x/README.md

Demonstrates how to make a GET request using Axios and handle the response or error using Promises. This example shows both inline query parameters and a params object for configuration. It also includes a finally block for cleanup operations.

```javascript
import axios from 'axios';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

--------------------------------

### Post FileList Object directly using postForm

Source: https://github.com/axios/axios/blob/v1.x/README.md

This snippet shows how to directly pass a FileList object to the `postForm` method for uploading multiple files. Axios handles the serialization, and all files will be sent with the same field name 'files[]'.

```javascript
await axios.postForm('https://httpbin.org/post', document.querySelector('#fileInput').files)
```

--------------------------------

### Axios GET Request Example with Async/Await

Source: https://github.com/axios/axios/blob/v1.x/README.md

Shows how to perform a GET request using Axios with the async/await syntax for cleaner asynchronous code. This approach requires an async function wrapper and uses a try-catch block for error handling.

```javascript
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```