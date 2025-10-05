================
CODE SNIPPETS
================
TITLE: Running Examples
DESCRIPTION: Instructions for running the examples provided with the Axios project, both in a browser and in the terminal.

SOURCE: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md#_snippet_1

LANGUAGE: bash
CODE:
```
> npm run examples
# Open 127.0.0.1:3000
```

LANGUAGE: bash
CODE:
```
> npm start
# Open 127.0.0.1:3000
```

LANGUAGE: bash
CODE:
```
> npm start
> node ./sandbox/client
```

--------------------------------

TITLE: Setup and Run Axios Examples
DESCRIPTION: Instructions to clone the Axios repository, install dependencies, build the project, and run the examples locally. This allows users to test Axios functionality.

SOURCE: https://github.com/axios/axios/blob/v1.x/examples/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
git clone https://github.com/axios/axios.git
cd axios
npm install
npm run build
npm run examples
```

--------------------------------

TITLE: Development Commands
DESCRIPTION: Commands for developing and building the Axios project, including running tests, building the project, and preparing for release.

SOURCE: https://github.com/axios/axios/blob/v1.x/CONTRIBUTING.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm run test
npm run build
npm run version
```

--------------------------------

TITLE: Performing Multiple Concurrent Requests
DESCRIPTION: Demonstrates how to make multiple HTTP requests concurrently using `Promise.all`.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_21

LANGUAGE: js
CODE:
```
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

TITLE: Handling Axios Responses with .then()
DESCRIPTION: Demonstrates how to access different parts of the response object (data, status, statusText, headers, config) when a request is successful using the `.then()` method.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_32

LANGUAGE: javascript
CODE:
```
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

TITLE: Basic GET Request Example
DESCRIPTION: Demonstrates how to make a simple GET request to fetch data from a specified URL using Axios. This is a fundamental operation for retrieving information from a server.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_7

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

```

--------------------------------

TITLE: Handle Multiple Requests with axios.all and axios.spread
DESCRIPTION: This snippet demonstrates how to make multiple HTTP requests concurrently using `axios.all` and process their responses in a structured way using `axios.spread`. It fetches user data and organization data from the GitHub API and updates the HTML document with the retrieved information.

SOURCE: https://github.com/axios/axios/blob/v1.x/examples/all/index.html#_snippet_0

LANGUAGE: javascript
CODE:
```
axios.all([axios.get('https://api.github.com/users/mzabriskie'), axios.get('https://api.github.com/users/mzabriskie/orgs')]).then(axios.spread(function (user, orgs) {
  document.getElementById('useravatar').src = user.data.avatar_url;
  document.getElementById('username').innerHTML = user.data.name;
  document.getElementById('orgs').innerHTML = orgs.data.map(function (org) {
    return (
      '<li class="row">' +
      '<img src="' + org.avatar_url + '" class="col-md-1"/>' +
      '<div class="col-md-3">' +
      '<strong>' + org.login + '</strong>' +
      '</div>' +
      '</li>'
    );
  }).join('');
}));
```

--------------------------------

TITLE: Axios Libraries for Logging and Debugging
DESCRIPTION: These libraries enhance Axios by providing detailed logging and debugging capabilities for requests and responses, aiding in troubleshooting and monitoring.

SOURCE: https://github.com/axios/axios/blob/v1.x/ECOSYSTEM.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import axiosResponseLogger from 'axios-response-logger';

axiosResponseLogger.add(axios);

axios.get('/api/data').then(response => {
  console.log('Request logged by axios-response-logger');
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import debug from 'debug';
import axiosDebugLog from 'axios-debug-log';

const logger = debug('axios');
axiosDebugLog(axios);

axios.get('/api/debug-data').then(response => {
  logger('Request processed');
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import 'axios-curlirize';

axios.get('/api/curl-command', {
  params: { id: 1 }
}).then(response => {
  console.log('Axios response with curl command:', response.curlCommand);
});
```

--------------------------------

TITLE: Posting Multiple Files
DESCRIPTION: Demonstrates how to send multiple files using `postForm` by passing an array of files or a FileList object. Files are sent with the same field name, typically suffixed with '[]'.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_57

LANGUAGE: js
CODE:
```
await axios.postForm('https://httpbin.org/post', {
  'files[]': document.querySelector('#fileInput').files
});

// Or directly passing a FileList:
await axios.postForm('https://httpbin.org/post', document.querySelector('#fileInput').files)
```

--------------------------------

TITLE: Axios Libraries for Request Handling
DESCRIPTION: This section covers libraries that enhance Axios's core functionality for managing HTTP requests, including request interception, caching, and method overriding.

SOURCE: https://github.com/axios/axios/blob/v1.x/ECOSYSTEM.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import axiosVcr from 'axios-vcr';

// Example using axios-vcr for recording and replaying requests
axiosVcr.install(axios);
axios.get('/api/data').then(response => {
  console.log(response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import cookieJarSupport from '@3846masa/axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
cookieJarSupport(axios, jar);

axios.get('http://example.com/cookies').then(response => {
  console.log('Cookies received:', jar.getCookiesSync('http://example.com'));
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import methodOverride from 'axios-method-override';

axios.interceptors.request.use(methodOverride);

axios.post('/api/resource', { data: 'some data' }, { method: 'PUT' });
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import { setupCache } from 'axios-cache-plugin';

const axiosInstance = setupCache(axios, {
  maxAge: 5 * 60 * 1000 // Cache for 5 minutes
});

axiosInstance.get('/api/cached-data').then(response => {
  console.log('Data:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import { throttle } from 'axios-extensions';

const throttledGet = throttle(axios.get, 1000); // Throttle requests to once per second

throttledGet('/api/throttled').then(response => {
  console.log('Throttled response:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

const fetchAdapter = require('axios-fetch');

axios.defaults.adapter = fetchAdapter;

axios.get('https://api.example.com/users').then(response => {
  console.log(response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

const endpoints = {
  getUser: (id) => axios.get(`/users/${id}`),
  createUser: (userData) => axios.post('/users', userData)
};

endpoints.getUser(123).then(response => {
  console.log('User:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import { apiVersioning } from 'axios-api-versioning';

const apiClient = apiVersioning(axios, {
  defaultVersion: 'v1'
});

apiClient.get('/items').then(response => {
  console.log('Items (v1):', response.data);
});

apiClient.get('/items', { version: 'v2' }).then(response => {
  console.log('Items (v2):', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

axios.interceptors.response.use(response => {
  if (response.data && response.data.data) {
    return { ...response, data: response.data.data };
  }
  return response;
});

axios.get('/api/unpacked').then(response => {
  console.log('Unpacked data:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

// Assuming axiosResponse and axiosRequestConfig are available
// const axiosResponse = { ... };
// const axiosRequestConfig = { ... };

// Function to extract cURL command (implementation details omitted for brevity)
// const getCurlCommand = (response, config) => {
//   // ... logic to convert axios request to curl command ...
//   return 'curl -X GET http://example.com';
// };

// axios.interceptors.response.use(response => {
//   response.curlCommand = getCurlCommand(response, response.config);
//   return response;
// });

console.log('r2curl library helps extract cURL commands from Axios objects.');
```

LANGUAGE: typescript
CODE:
```
import axios, { AxiosInstance } from 'axios';
import { generateClient } from 'swagger-taxos-codegen';

interface ApiSpec {
  // Define your API spec structure here
}

const apiClient: AxiosInstance = axios.create();

// Example of generating a client from a swagger spec (implementation details omitted)
// const generatedClient = generateClient<ApiSpec>(apiClient, '/path/to/swagger.json');

console.log('swagger-taxos-codegen generates Axios-based clients from Swagger definitions.');
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

const endpoints = {
  users: {
    get: (id) => axios.get(`/users/${id}`),
    create: (data) => axios.post('/users', data)
  },
  products: {
    list: () => axios.get('/products')
  }
};

endpoints.users.get(1).then(response => {
  console.log('User:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import MultiAPI from 'axios-multi-api';

const apiHandler = new MultiAPI(axios);

apiHandler.add('users', '/api/users');
apiHandler.add('posts', '/api/posts');

apiHandler.request('users', 'GET', { params: { id: 1 } }).then(response => {
  console.log('User data:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import urlTemplate from 'axios-url-template';

axios.interceptors.request.use(urlTemplate);

axios.get('/users/{id}', { params: { id: 123 } }).then(response => {
  console.log('Response with URL template:', response.data);
});
```

LANGUAGE: typescript
CODE:
```
import axios from 'axios';
import { create } from 'zodios';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string()
});

const apiClient = create([
  {
    url: '/users/:id',
    method: 'get',
    alias: 'getUser',
    response: UserSchema
  }
]);

apiClient.getUser(1).then(response => {
  console.log('Typed user:', response.data);
});
```

--------------------------------

TITLE: Making a GET Request
DESCRIPTION: This snippet demonstrates how to make a GET request using Axios to fetch data from a specified URL. It handles the response and any potential errors.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

--------------------------------

TITLE: Axios Libraries for Unit Testing
DESCRIPTION: These libraries facilitate unit testing of applications that use Axios by providing mocking capabilities and adapters for testing frameworks.

SOURCE: https://github.com/axios/axios/blob/v1.x/ECOSYSTEM.md#_snippet_3

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import axiosist from 'axiosist';
import express from 'express';

const app = express();
app.get('/data', (req, res) => {
  res.json({ message: 'Success' });
});

const request = axiosist(app);

request.get('/data').then(response => {
  console.log('Axiosist test response:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/api/mock-data').reply(200, {
  data: 'mocked response'
});

axios.get('/api/mock-data').then(response => {
  console.log('Mocked data:', response.data);
});
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import createTestInstance from 'axios-test-instance';

const testInstance = createTestInstance(axios);

// Configure testInstance to mock responses or use a test server
// testInstance.defaults.adapter = require('axios/lib/adapters/http'); // Example for using http adapter

console.log('axios-test-instance helps in testing NodeJS backends with Axios.');
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import moxios from 'moxios';

moxios.install();

moxios.stubRequest('/api/stubbed', {
  status: 200,
  responseText: 'stubbed response'
});

axios.get('/api/stubbed').then(response => {
  console.log('Stubbed response:', response.data);
});

moxios.uninstall();
```

LANGUAGE: javascript
CODE:
```
import axios from 'axios';
import mochaAxios from 'mocha-axios';

// mochaAxios typically integrates with Mocha test runners
// Example usage within a Mocha test:
// describe('API Tests', () => {
//   it('should fetch data', async () => {
//     const response = await mochaAxios.get('/api/mocha-data');
//     expect(response.data).to.equal('expected data');
//   });
// });

console.log('mocha-axios streamlines integration testing with Mocha and Axios.');
```

--------------------------------

TITLE: Async/Await GET Request
DESCRIPTION: Shows how to perform a GET request using async/await syntax for cleaner asynchronous code.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_19

LANGUAGE: js
CODE:
```
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

TITLE: Using postForm Shortcut
DESCRIPTION: Introduces shortcut methods like `postForm`, `putForm`, and `patchForm` which simplify sending data with the 'multipart/form-data' Content-Type header preset.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_56

LANGUAGE: js
CODE:
```
await axios.postForm('https://httpbin.org/post', {
  'myVar' : 'foo',
  'file': document.querySelector('#fileInput').files[0]
});
```

--------------------------------

TITLE: Axios Core Module Overview
DESCRIPTION: This section outlines the purpose of core modules in Axios, which encapsulate domain-specific logic. These modules are generally not intended for external consumption due to their tight coupling with Axios's internal workings. Key functionalities include dispatching requests, managing interceptors, and handling configuration.

SOURCE: https://github.com/axios/axios/blob/v1.x/lib/core/README.md#_snippet_0

LANGUAGE: javascript
CODE:
```
# axios // core

The modules found in `core/` should be modules that are specific to the domain logic of axios. These modules would most likely not make sense to be consumed outside of the axios module, as their logic is too specific. Some examples of core modules are:

- Dispatching requests
  - Requests sent via `adapters/` (see lib/adapters/README.md)
- Managing interceptors
- Handling config
```

--------------------------------

TITLE: GET Request with Parameters
DESCRIPTION: Demonstrates how to send parameters in a GET request using the `params` option.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_18

LANGUAGE: js
CODE:
```
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

TITLE: Sending FormData in Node.js with form-data library
DESCRIPTION: Shows how to use the 'form-data' library in Node.js to create a FormData object, append various data types including files, and send it via an Axios POST request.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_51

LANGUAGE: js
CODE:
```
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form)
```

--------------------------------

TITLE: Rate Limiting (Node.js)
DESCRIPTION: Shows how to set download and upload rate limits specifically for the http adapter in Node.js environments. The example demonstrates setting a maximum upload rate using the `maxRate` option and logging the progress and rate during the upload.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_60

LANGUAGE: js
CODE:
```
const {data} = await axios.post(LOCAL_SERVER_URL, myBuffer, {
  onUploadProgress: ({progress, rate}) => {
    console.log(`Upload [${(progress*100).toFixed(2)}%]: ${(rate / 1024).toFixed(2)}KB/s`)
  },
   
  maxRate: [100 * 1024], // 100KB/s limit
});
```

--------------------------------

TITLE: Performing a POST Request
DESCRIPTION: An example of making a POST request to send data to the server.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_20

LANGUAGE: js
CODE:
```
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

--------------------------------

TITLE: POST Request Example
DESCRIPTION: Illustrates how to send data to a server using a POST request. This is commonly used for creating or submitting new resources.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_8

LANGUAGE: javascript
CODE:
```
import axios from 'axios';

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

```

--------------------------------

TITLE: Sending URLSearchParams Data with Node.js querystring
DESCRIPTION: Demonstrates using Node.js's built-in `querystring` module to serialize data for `application/x-www-form-urlencoded` format, noting its limitations with nested objects compared to the `qs` library.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_48

LANGUAGE: js
CODE:
```
const querystring = require('querystring');
axios.post('https://something.com/', querystring.stringify({ foo: 'bar' }));
```

--------------------------------

TITLE: Axios GET Request with Response Handling
DESCRIPTION: This snippet demonstrates how to make a GET request using Axios to fetch data from './fixture.json'. It includes success and error handling, logging the response, and displaying the response data and headers in alerts.

SOURCE: https://github.com/axios/axios/blob/v1.x/test/manual/basic.html#_snippet_0

LANGUAGE: javascript
CODE:
```
axios.get('./fixture.json').then(function(response) {
  console.log(response);
  alert(JSON.stringify(response.data));
  alert('response headers:\n\n' + JSON.stringify(response.headers));
}, function(err) {
  console.log(err);
});
```

--------------------------------

TITLE: Axios Header Shortcuts
DESCRIPTION: Lists available shortcut methods for common header operations, such as setting, getting, and checking for content type, content length, accept, user agent, and content encoding.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_73

LANGUAGE: apidoc
CODE:
```
setContentType, getContentType, hasContentType
setContentLength, getContentLength, hasContentLength
setAccept, getAccept, hasAccept
setUserAgent, getUserAgent, hasUserAgent
setContentEncoding, getContentEncoding, hasContentEncoding
```

--------------------------------

TITLE: Handling Axios Errors with .catch()
DESCRIPTION: Explains how to handle errors in Axios requests, noting that error details are available through the `error` object when using a `.catch()` block or a rejection callback.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_33

LANGUAGE: javascript
CODE:
```
axios.get('/user/12345')
  .catch(function (error) {
    // Handle error
    console.error(error);
  });
```