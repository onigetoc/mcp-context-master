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

--------------------------------

### General Axios Configuration

Source: https://github.com/axios/axios/blob/v1.x/README.md

Shows how to make requests using a configuration object passed directly to the `axios` function.

```APIDOC
## axios(config)

### Description
Makes an HTTP request using a detailed configuration object.

### Method
- `post`, `get`, etc. (specified in config)

### Endpoint
- Specified in `url` field of config

### Parameters
#### Request Body
- **data** (object) - Data to send with the request (for methods like POST, PUT, PATCH).

#### Request Configuration
- **method** (string) - The HTTP method (e.g., 'post', 'get').
- **url** (string) - The request URL.
- **responseType** (string) - The type of response expected (e.g., 'stream', 'json').

### Request Example (POST)
```javascript
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

### Request Example (GET with Stream)
```javascript
axios({
  method: 'get',
  url: 'https://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

### Response
#### Success Response (200)
- **data** (any) - The response data, type depends on `responseType`.

#### Response Example
```json
{
  "data": "..."
}
```
```

--------------------------------

### Axios POST with XHR Adapter for Large Data Upload

Source: https://github.com/axios/axios/blob/v1.x/test/manual/progress.html

This snippet shows how to send a large data array (Int8Array) to a server using Axios with the XHR adapter. It includes configurations for upload and download progress events, logging the progress and the final response or any errors encountered.

```javascript
const data = new Int8Array(10 * 1024 * 1024);
data.fill(123);
console.log('Starting...');

(async() => {
  await axios.post('http://httpbin.org/post', data, {
    adapter: 'xhr',
    onUploadProgress: (e) => console.log('xhr upload', e),
    onDownloadProgress: (e) => console.log('xhr download', e),
  }).then(data => {
    console.log(`Done: `, data);
  }).catch(e => console.warn('xhr', e));
})();
```

--------------------------------

### Cancel Axios Requests with AbortController

Source: https://github.com/axios/axios/blob/v1.x/README.md

Provides an alternative method for cancelling Axios requests using the standard `AbortController` API, by passing its `signal` property.

```javascript
signal: new AbortController().signal
```

--------------------------------

### POST Request

Source: https://github.com/axios/axios/blob/v1.x/README.md

Shows how to perform a POST request to send data to the server.

```APIDOC
## POST /user

### Description
Creates or updates a user with the provided data.

### Method
POST

### Endpoint
`/user`

### Parameters
#### Request Body
- **firstName** (string) - Required - The first name of the user.
- **lastName** (string) - Required - The last name of the user.

### Request Example
```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Response
#### Success Response (201)
- **data** (object) - The response data from the server.

#### Response Example
```json
{
  "data": {
    "message": "User created successfully"
  }
}
```
```

--------------------------------

### Import Axios with CommonJS

Source: https://github.com/axios/axios/blob/v1.x/README.md

Shows how to import the Axios library using CommonJS `require` syntax, which is common in Node.js environments or older JavaScript setups. Note that only the default export is available with `require`.

```javascript
const axios = require('axios');

console.log(axios.isCancel('something'));
```

--------------------------------

### Send Form Data with Node.js querystring Module

Source: https://github.com/axios/axios/blob/v1.x/README.md

Illustrates how to use Node.js's built-in 'querystring' module to serialize data for 'application/x-www-form-urlencoded' requests, particularly for older Node.js versions. It notes that 'qs' is preferable for nested objects.

```javascript
const querystring = require('querystring');
axios.post('https://something.com/', querystring.stringify({ foo: 'bar' }));
```

--------------------------------

### Post Multiple Files using postForm

Source: https://github.com/axios/axios/blob/v1.x/README.md

This snippet demonstrates uploading multiple files using the `postForm` method. Files are appended with a key ending in '[]' to indicate an array of files. The 'Content-Type' header is automatically set.

```javascript
await axios.postForm('https://httpbin.org/post', {
  'files[]': document.querySelector('#fileInput').files
});
```

--------------------------------

### Axios Request Sandbox JavaScript

Source: https://github.com/axios/axios/blob/v1.x/sandbox/client.html

This JavaScript code initializes an interactive form for making HTTP requests using Axios. It handles user inputs for URL, method, parameters, data, and headers, parses them, and sends the request. It also displays the request details, response data, or error messages. Dependencies include the Axios library. Input is taken from HTML form elements, and output is displayed in designated HTML elements. It uses local storage to persist form data.

```javascript
(function () { var url = document.getElementById('url'); var method = document.getElementById('method'); var params = document.getElementById('params'); var data = document.getElementById('data'); var headers = document.getElementById('headers'); var submit = document.getElementById('submit'); var request = document.getElementById('request'); var response = document.getElementById('response'); var error = document.getElementById('error'); function acceptsData(method) { return ['PATCH', 'POST', 'PUT'].indexOf(method) > -1; } function getUrl() { return url.value.length === 0 ? '/api' : url.value; } function getParams() { try { return params.value.length === 0 ? null : JSON.parse(params.value); } catch (e) { error.textContent = "Invalid JSON in Params"; return null; } } function getData() { try { return data.value.length === 0 ? null : JSON.parse(data.value); } catch (e) { error.textContent = "Invalid JSON in Data"; return null; } } function getHeaders() { try { return headers.value.length === 0 ? null : JSON.parse(headers.value); } catch (e) { error.textContent = "Invalid JSON in Headers"; return null; } } function syncWithLocalStorage() { url.value = localStorage.getItem('url') || '/api'; method.value = localStorage.getItem('method') || 'GET'; params.value = localStorage.getItem('params') || ''; data.value = localStorage.getItem('data') || ''; headers.value = localStorage.getItem('headers') || ''; } function syncParamsAndData() { switch (method.value) { case 'PATCH': case 'POST': case 'PUT': params.parentNode.style.display = 'none'; data.parentNode.style.display = ''; break; default: params.parentNode.style.display = ''; data.parentNode.style.display = 'none'; break; } } submit.onclick = function (event) { event.preventDefault(); if (url.value === '') { error.textContent = 'Please enter a valid URL'; return; } var options = { url: getUrl(), params: !acceptsData(method.value) ? getParams() : undefined, data: acceptsData(method.value) ? getData() : undefined, method: method.value, headers: getHeaders() }; request.textContent = JSON.stringify(options, null, 2); axios(options) .then(function (res) { response.innerHTML = JSON.stringify(res.data, null, 2); error.textContent = "None"; }) .catch(function (err) { if (err.response) { error.textContent = JSON.stringify(err.response.data, null, 2); response.innerHTML = "Error in Response"; } else { error.textContent = err.message; response.innerHTML = "No Response Data"; } }); }; url.onchange = function () { localStorage.setItem('url', url.value); }; method.onchange = function () { localStorage.setItem('method', method.value); syncParamsAndData(); }; params.onchange = function () { localStorage.setItem('params', params.value); }; data.onchange = function () { localStorage.setItem('data', data.value); }; headers.onchange = function () { localStorage.setItem('headers', headers.value); }; syncWithLocalStorage(); syncParamsAndData(); })();
```

--------------------------------

### AxiosHeaders Shortcuts

Source: https://github.com/axios/axios/blob/v1.x/README.md

Provides convenient methods for common header operations.

```APIDOC
## AxiosHeaders Shortcuts

### Description
The following shortcuts are available for common header manipulations:

- **Content-Type**: `setContentType`, `getContentType`, `hasContentType`
- **Content-Length**: `setContentLength`, `getContentLength`, `hasContentLength`
- **Accept**: `setAccept`, `getAccept`, `hasAccept`
- **User-Agent**: `setUserAgent`, `getUserAgent`, `hasUserAgent`
- **Content-Encoding**: `setContentEncoding`, `getContentEncoding`, `hasContentEncoding`

### Method
Each shortcut corresponds to a setter, getter, and checker method for a specific header.

### Parameters
(Varies based on the specific shortcut method)

### Request Example
```javascript
const headers = new AxiosHeaders();
headers.setContentType('application/json');
console.log(headers.getContentType()); // 'application/json'
console.log(headers.hasContentType()); // true
```

### Response
(Varies based on the specific shortcut method. Getters return header values, setters return `this`, checkers return boolean.)
```