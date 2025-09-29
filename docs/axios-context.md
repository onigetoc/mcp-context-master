========================
CODE SNIPPETS
========================
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

----------------------------------------

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

----------------------------------------

TITLE: Constructing AxiosHeaders from Raw HTTP Headers
DESCRIPTION: Illustrates how to create an AxiosHeaders instance by parsing a string containing raw HTTP headers.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_64

LANGUAGE: js
CODE:
```
const headers = new AxiosHeaders(`
Host: www.bing.com
User-Agent: curl/7.54.0
Accept: */*`);

console.log(headers);
```

----------------------------------------

TITLE: Axios API - GET Request by URL
DESCRIPTION: A shorthand for making a GET request by simply providing the URL.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_24

LANGUAGE: js
CODE:
```
// Send a GET request (default method)
axios('/user/12345');
```

----------------------------------------

TITLE: Axios API Reference
DESCRIPTION: This section details the core Axios API, including methods for making HTTP requests, creating instances, and handling configurations. It covers common HTTP methods like GET, POST, PUT, DELETE, and their corresponding configurations.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_6

LANGUAGE: APIDOC
CODE:
```
Axios Instance Methods:

axios(config)
  Makes a request to the specified config.

axios.request(config)
  Equivalent to axios(config).

axios.get(url[, config])
  Performs a GET request.

axios.post(url[, data[, config]])
  Performs a POST request.

axios.put(url[, data[, config]])
  Performs a PUT request.

axios.delete(url[, config])
  Performs a DELETE request.

axios.patch(url[, data[, config]])
  Performs a PATCH request.

axios.head(url[, config])
  Performs a HEAD request.

axios.options(url[, config])
  Performs an OPTIONS request.

Creating an Instance:

axios.create([config])
  Creates a new Axios instance with custom default settings.

Instance Methods:

instance.get(url[, config])
  Performs a GET request using the instance.

instance.post(url[, data[, config]])
  Performs a POST request using the instance.

... (other HTTP methods)

instance.defaults
  An object containing the default configurations for the instance.

Interceptors:

instance.interceptors.request.use(onFulfilled[, onRejected])
  Adds a request interceptor.

instance.interceptors.response.use(onFulfilled[, onRejected])
  Adds a response interceptor.

Cancellation:

AbortController
  Used to abort requests.
  Example:
  const controller = new AbortController();
  axios.get('/foo/bar', { signal: controller.signal });
  controller.abort(); // aborts the request

CancelToken (Deprecated)
  Provides a way to cancel requests.
  Example:
  const source = axios.CancelToken.source();
  axios.get('/foo/bar', { cancelToken: source.token });
  source.cancel('Operation canceled by the user.');

Request Config:

config {
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options',
  baseURL?: string,
  transformRequest?: Array<(data: any, headers: any) => any>,
  transformResponse?: Array<(data: any, headers: any) => any>,
  headers?: any,
  params?: any,
  paramsSerializer?: (params: any) => string,
  data?: any,
  timeout?: number,
  timeoutErrorMessage?: string,
  withCredentials?: boolean,
  adapter?: (config: any) => Promise<any>,
  auth?: any,
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text',
  xsrfCookieName?: string,
  xsrfHeaderName?: string,
  maxRedirects?: number,
  maxContentLength?: number,
  validateStatus?: (status: number) => boolean,
  maxBodyLength?: number,
  httpAgent?: any,
  httpsAgent?: any,
  proxy?: any,
  cancelToken?: CancelToken,
  signal?: AbortSignal
}

Response Schema:

response {
  data: any,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  request?: any
}

Handling Errors:

AxiosError
  The base class for all Axios errors.
  Properties:
    - message: string
    - code: string | undefined
    - config: AxiosRequestConfig
    - request?: any
    - response?: AxiosResponse
    -toJSON(): object

Example Error Handling:
axios.get('/user/123')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

```

----------------------------------------

TITLE: Axios API - GET Request with Stream
DESCRIPTION: Example of making a GET request for a remote image in Node.js, specifying `responseType: 'stream'`.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_23

LANGUAGE: js
CODE:
```
// GET request for remote image in node.js
axios({
  method: 'get',
  url: 'https://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

----------------------------------------

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

----------------------------------------

TITLE: Axios API - Request Method Aliases
DESCRIPTION: Lists the available convenience aliases for common HTTP request methods.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_25

LANGUAGE: APIDOC
CODE:
```
axios(config)
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
```

----------------------------------------

TITLE: Basic GET Request with Axios
DESCRIPTION: An example of making a GET request to fetch user data and handling the response and potential errors.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_17

LANGUAGE: js
CODE:
```
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

----------------------------------------

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

----------------------------------------

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

----------------------------------------

TITLE: Axios Request Methods
DESCRIPTION: Details the various methods available on an Axios instance for making HTTP requests, including request configuration.

SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_snippet_27

LANGUAGE: APIDOC
CODE:
```
axios.patch(url[, data[, config]])
  - Makes a PATCH request to the specified URL.
  - data: The data to send with the request.
  - config: Optional configuration object for the request.

axios.all(iterable)
  - Handles concurrent requests. Use Promise.all instead.

axios.spread(callback)
  - Used with axios.all to spread results into a callback function. Use Promise.all with async/await instead.

axios.create([config])
  - Creates a new Axios instance with custom configuration.
  - config: An object containing default settings for the instance.

axios#request(config)
  - The most general method for making any type of request.
  - config: An object containing request details like url, method, data, headers, etc.

axios#get(url[, config])
  - Makes a GET request to the specified URL.
  - config: Optional configuration object for the request.

axios#delete(url[, config])
  - Makes a DELETE request to the specified URL.
  - config: Optional configuration object for the request.

axios#head(url[, config])
  - Makes a HEAD request to the specified URL.
  - config: Optional configuration object for the request.

axios#options(url[, config])
  - Makes an OPTIONS request to the specified URL.
  - config: Optional configuration object for the request.

axios#post(url[, data[, config]])
  - Makes a POST request to the specified URL.
  - data: The data to send with the request.
  - config: Optional configuration object for the request.

axios#put(url[, data[, config]])
  - Makes a PUT request to the specified URL.
  - data: The data to send with the request.
  - config: Optional configuration object for the request.

axios#getUri([config])
  - Returns the full request URL based on the provided config.
```

========================
QUESTIONS AND ANSWERS
========================
TOPIC: Axios Sandbox
Q: What HTTP methods can be tested in the Axios sandbox?
A: The Axios sandbox supports testing GET, POST, PUT, DELETE, HEAD, and PATCH HTTP methods.


SOURCE: https://github.com/axios/axios/blob/v1.x/sandbox/client.html#_qa_1

----------------------------------------

TOPIC: Axios HTTP Client
Q: What services does Stytch offer?
A: Stytch offers API-first authentication, authorization, and fraud prevention services. They provide resources such as a website, documentation, and a Node.js SDK.


SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_qa_0

----------------------------------------

TOPIC: Axios Adapters
Q: What is the purpose of the modules under the `adapters/` directory in Axios?
A: The modules under `adapters/` in Axios are responsible for dispatching HTTP requests and settling the Promise associated with a request once a response is received.


SOURCE: https://github.com/axios/axios/blob/v1.x/lib/adapters/README.md#_qa_0

----------------------------------------

TOPIC: Axios HTTP Client
Q: What is Descope's focus?
A: Descope is focused on the authentication space for app developers. They offer a website, documentation, and a community forum for users.


SOURCE: https://github.com/axios/axios/blob/v1.x/README.md#_qa_3

----------------------------------------

TOPIC: Axios Sandbox
Q: What is the purpose of the Axios sandbox?
A: The Axios sandbox allows users to test HTTP requests by providing an interface to input URLs, methods, parameters, data, and headers. It then sends the request using Axios and displays the response or any errors encountered.


SOURCE: https://github.com/axios/axios/blob/v1.x/sandbox/client.html#_qa_0