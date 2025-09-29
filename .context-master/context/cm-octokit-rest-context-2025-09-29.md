================
CODE SNIPPETS
================
TITLE: Run All Tests (Bash)
DESCRIPTION: Executes all the project's tests. Ensure the fixtures server is running before executing this command.

SOURCE: https://github.com/octokit/rest.js/blob/main/CONTRIBUTING.md#_snippet_1

LANGUAGE: bash
CODE:
```
$ npm test
```

--------------------------------

TITLE: Paginate API Results
DESCRIPTION: Fetches all issues for a repository using pagination. The `paginate` function handles fetching subsequent pages automatically.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/00_usage.md#_snippet_5

LANGUAGE: javascript
CODE:
```
octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: 'octokit',
    repo: 'rest.js'
  })
    .then(issues => {
      // issues is an array of all issue objects
    })
```

--------------------------------

TITLE: Installation and Instantiation
DESCRIPTION: Instructions on how to install Octokit.js via npm and how to instantiate the Octokit client with various configuration options.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/00_usage.md#_snippet_7

LANGUAGE: APIDOC
CODE:
```
## Installation

Install with `npm install @octokit/rest`

## Instantiation

Instantiate your octokit API with optional configurations.

```javascript
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  // Optional: Authentication token
  auth: "YOUR_PERSONAL_ACCESS_TOKEN",
  // Required: User-agent string to identify your application
  userAgent: 'myApp v1.0.0',
  // Optional: Enable API previews
  previews: ['all'],
  // Optional: Set a default time zone
  timeZone: 'UTC',
  // Optional: Base URL for GitHub Enterprise
  baseUrl: 'https://api.github.com',
  // Optional: Custom logging object
  log: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  // Optional: Custom request options
  request: {
    timeout: 5000
  }
});
```
```

--------------------------------

TITLE: Start Fixtures Server (Bash)
DESCRIPTION: Starts the fixtures server required for running tests. This command is executed in the terminal.

SOURCE: https://github.com/octokit/rest.js/blob/main/CONTRIBUTING.md#_snippet_0

LANGUAGE: bash
CODE:
```
$ npm run start-fixtures-server
```

--------------------------------

TITLE: Pagination
DESCRIPTION: Demonstrates how to handle paginated responses to retrieve complete data sets.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/00_usage.md#_snippet_10

LANGUAGE: APIDOC
CODE:
```
## Pagination

Use `octokit.paginate` to easily handle paginated results.

```javascript
(async () => {
  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: 'octokit',
    repo: 'rest.js'
  });
  console.log(issues);
})();
```
```

--------------------------------

TITLE: Add Plugins to Octokit
DESCRIPTION: Extends Octokit with additional functionality by applying plugins like retry and throttling. Creates a new constructor with the combined features.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/00_usage.md#_snippet_6

LANGUAGE: javascript
CODE:
```
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

const MyOctokit = Octokit.plugin(retry, throttling);

const myOctokit = new MyOctokit({
  auth: "secret123",
  throttle: {
    onRateLimit: (retryAfter, options) => {
      myOctokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );

      if (options.request.retryCount === 0) {
        // only retries once
        myOctokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
  },
});
```

--------------------------------

TITLE: Initialize Octokit and List Organization Repositories
DESCRIPTION: Provides an example of initializing the Octokit client and making a request to list public repositories for a specific organization. It handles the response data within a promise.

SOURCE: https://github.com/octokit/rest.js/blob/main/README.md#_snippet_2

LANGUAGE: js
CODE:
```
const octokit = new Octokit();

// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
octokit.rest.repos
  .listForOrg({
    org: "octokit",
    type: "public",
  })
  .then(({ data }) => {
    // handle data
  });

```

--------------------------------

TITLE: Install Pull Request from GitHub (Bash)
DESCRIPTION: Installs a specific pull request of a module directly from GitHub. This is useful for testing changes before they are merged.

SOURCE: https://github.com/octokit/rest.js/blob/main/CONTRIBUTING.md#_snippet_3

LANGUAGE: bash
CODE:
```
npm install octokit/rest.js#branchname
```

--------------------------------

TITLE: Import Octokit for Node.js (ES Module)
DESCRIPTION: Shows how to import the Octokit class in a Node.js environment after installing the package via npm. This utilizes modern ES module syntax.

SOURCE: https://github.com/octokit/rest.js/blob/main/README.md#_snippet_1

LANGUAGE: js
CODE:
```
import { Octokit } from "@octokit/rest";
```

--------------------------------

TITLE: Stopping Pagination Early
DESCRIPTION: Control the pagination process by using the `done()` function within the map callback to stop fetching further pages once a condition is met.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_7

LANGUAGE: APIDOC
CODE:
```
## GET /repos/{owner}/{repo}/issues with Early Stop

### Description
Retrieves issues from a repository, stopping pagination early if an issue with specific content in its body is found.

### Method
GET

### Endpoint
/repos/{owner}/{repo}/issues

### Parameters
#### Path Parameters
- **owner** (string) - Required - The owner of the repository.
- **repo** (string) - Required - The name of the repository.

### Request Example
```javascript
octokit.paginate(
  "GET /repos/{owner}/{repo}/issues",
  { owner: "octokit", repo: "rest.js" },
  (response, done) => {
    if (response.data.find((issue) => issue.body.includes("something"))) {
      done();
    }
    return response.data;
  },
);
```

### Response
#### Success Response (200)
- **data** (array) - An array of issue objects from the pages fetched before stopping.

#### Response Example
```json
[
  {
    "id": 1,
    "title": "Issue Title 1",
    "body": "Issue body content."
    // ... other issue properties
  }
]
```
```

--------------------------------

TITLE: Plugins
DESCRIPTION: Information on how to extend Octokit's functionality using plugins, such as retry and throttling.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/00_usage.md#_snippet_11

LANGUAGE: APIDOC
CODE:
```
## Plugins

Extend Octokit with plugins like retry and throttling.

### Applying Plugins

```javascript
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

const MyOctokit = Octokit.plugin(retry, throttling);
const myOctokit = new MyOctokit({
  auth: "YOUR_PERSONAL_ACCESS_TOKEN",
  throttle: {
    onRateLimit: (retryAfter, options) => {
      myOctokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );
      if (options.request.retryCount === 0) {
        myOctokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      myOctokit.log.warn(
        `Abuse limit exceeded for request ${options.method} ${options.url}`
      );
      if (options.request.retryCount === 0) {
        myOctokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    }
  }
});
```
```

--------------------------------

TITLE: Revert to Default Module (Bash)
DESCRIPTION: Reverts the installation back to the default stable version of the @octokit/rest module from npm.

SOURCE: https://github.com/octokit/rest.js/blob/main/CONTRIBUTING.md#_snippet_5

LANGUAGE: bash
CODE:
```
npm install @octokit/rest
```

--------------------------------

TITLE: Check Git Diffs (Bash)
DESCRIPTION: Checks for unnecessary whitespace or changes in your committed code before finalizing a commit. This helps maintain code quality.

SOURCE: https://github.com/octokit/rest.js/blob/main/CONTRIBUTING.md#_snippet_4

LANGUAGE: bash
CODE:
```
git diff --check
```

--------------------------------

TITLE: Iterating Through Paginated Responses with Async Iterator
DESCRIPTION: Leverage async iterators with `octokit.paginate.iterator()` to loop through paginated responses, allowing for more control and processing of each response individually.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_9

LANGUAGE: APIDOC
CODE:
```
## Async Iteration of Paginated Responses

### Description
Iterate through paginated API responses using an async iterator provided by `octokit.paginate.iterator()`.

### Method
GET

### Endpoint
/repos/{owner}/{repo}/issues

### Parameters
#### Path Parameters
- **owner** (string) - Required - The owner of the repository.
- **repo** (string) - Required - The name of the repository.

### Request Example
```javascript
for await (const response of octokit.paginate.iterator(
  octokit.rest.issues.listForRepo,
  {
    owner: "octokit",
    repo: "rest.js",
  },
)) {
  // Process each response object here
  // e.g., console.log(response.data.length);
}
```

### Response
#### Success Response (200)
- **response** (object) - Each yielded object contains the full response details for a single page, including `data`, `headers`, `status`, and `url`.

#### Response Example (for each iteration)
```json
{
  "data": [
    {
      "id": 1,
      "title": "Issue Title 1",
      "body": "Issue body content."
      // ... other issue properties
    }
  ],
  "headers": {
    "server": "GitHub.com",
    "date": "Tue, 15 Nov 1994 08:12:31 GMT",
    "content-type": "application/json; charset=utf-8",
    "link": "<https://api.github.com/repositories/1300192/issues?since=2023-01-01T00%3A00%3A00Z&page=2>; rel=\"next\", <https://api.github.com/repositories/1300192/issues?since=2023-01-01T00%3A00%3A00Z&page=10>; rel=\"last\"",
    "x-ratelimit-limit": "5000",
    "x-ratelimit-remaining": "4968",
    "x-ratelimit-reset": "1671270381",
    "x-ratelimit-resource": "search",
    "x-ratelimit-used": "32",
    "cache-control": "private, max-age=60, s-maxage=60",
    "etag": "W/\"3c08f5168a22a034698808f694732674\"",
    "last-modified": "Mon, 06 Nov 2023 18:36:50 GMT",
    "vary": "Accept, Accept-Encoding, Accept, X-Requested-With",
    "x-github-media-type": "github.v3; format=json",
    "x-github-request-id": "C01F:1A2B:3C4D:5E6F:7G8H",
    "content-encoding": "gzip"
  },
  "status": 200,
  "url": "https://api.github.com/repositories/1300192/issues?since=2023-01-01T00%3A00%3A00Z&page=1"
}
```
```

--------------------------------

TITLE: Run Specific Test (Bash)
DESCRIPTION: Runs a specific integration test file, in this case 'smoke.test.js'. This is useful for testing individual changes.

SOURCE: https://github.com/octokit/rest.js/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: bash
CODE:
```
$ ./node_modules/.bin/jest test/integration/smoke.test.js
```

--------------------------------

TITLE: Import Octokit for Browsers (ES Module)
DESCRIPTION: Demonstrates how to import the Octokit class directly from esm.sh for use in browser environments with ES modules.

SOURCE: https://github.com/octokit/rest.js/blob/main/README.md#_snippet_0

LANGUAGE: html
CODE:
```
<script type="module">
  import { Octokit } from "https://esm.sh/@octokit/rest";
</script>
```

--------------------------------

TITLE: Making API Requests
DESCRIPTION: Examples of how to make requests to specific API endpoints and handle responses, including custom media types.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/00_usage.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
## Making API Requests

Access most GitHub REST API endpoints through the `octokit.rest` object.

### Example: Get a Pull Request

```javascript
(async () => {
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: "octokit",
    repo: "rest.js",
    pull_number: 123,
  });
  console.log(pullRequest);
})();
```

### Example: Get a Pull Request in Diff Format

```javascript
(async () => {
  const { data: diff } = await octokit.rest.pulls.get({
    owner: "octokit",
    repo: "rest.js",
    pull_number: 123,
    mediaType: {
      format: "diff",
    },
  });
  console.log(diff);
})();
```
```

--------------------------------

TITLE: Paginate Issues Automatically
DESCRIPTION: Retrieves all issue objects for a repository by automatically handling pagination. This method is suitable when you need the complete list of issues.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_0

LANGUAGE: javascript
CODE:
```
octokit
  .paginate("GET /repos/{owner}/{repo}/issues", {
    owner: "octokit",
    repo: "rest.js",
  })
  .then((issues) => {
    // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
    // like results from `octokit.request()` or any of the endpoint methods such as `octokit.rest.issues.listForRepo()`
  });

```

--------------------------------

TITLE: Automatic Pagination with octokit.paginate()
DESCRIPTION: Fetch all results across all pages for a given endpoint using `octokit.paginate()`. This method simplifies the process of handling multiple API responses.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_5

LANGUAGE: APIDOC
CODE:
```
## GET /repos/{owner}/{repo}/issues

### Description
Retrieves a list of issues for a repository, with automatic pagination to fetch all results.

### Method
GET

### Endpoint
/repos/{owner}/{repo}/issues

### Parameters
#### Path Parameters
- **owner** (string) - Required - The owner of the repository.
- **repo** (string) - Required - The name of the repository.

### Request Example
```javascript
octokit
  .paginate("GET /repos/{owner}/{repo}/issues", {
    owner: "octokit",
    repo: "rest.js",
  })
  .then((issues) => {
    // issues is an array of all issue objects.
  });
```

### Response
#### Success Response (200)
- **data** (array) - An array of issue objects.

#### Response Example
```json
[
  {
    "id": 1,
    "title": "Issue Title 1",
    "body": "Issue body content."
    // ... other issue properties
  },
  {
    "id": 2,
    "title": "Issue Title 2",
    "body": "Issue body content."
    // ... other issue properties
  }
]
```
```

--------------------------------

TITLE: Example: List repositories for an organization (JavaScript)
DESCRIPTION: Demonstrates how to use octokit.rest.repos.listForOrg to retrieve all public repositories for a given GitHub organization. This function takes an object with 'org' and 'type' as parameters.

SOURCE: https://github.com/octokit/rest.js/blob/main/HOW_IT_WORKS.md#_snippet_0

LANGUAGE: javascript
CODE:
```
octokit.rest.repos.listForOrg({ org: "octokit", type: "public" });
```

--------------------------------

TITLE: Create and Use Octokit Plugins
DESCRIPTION: Demonstrates how to define a plugin with custom methods and lifecycle hooks, and how to integrate it with the Octokit instance. It shows adding a 'helloWorld' method and logging request durations.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/08_plugins.md#_snippet_0

LANGUAGE: javascript
CODE:
```
// index.js
import { Octokit } from "@octokit/rest";
import myPlugin from "./lib/my-plugin.js";
import octokitPluginExample from "octokit-plugin-example";

const MyOctokit = Octokit.plugin(myPlugin, octokitPluginExample);

// lib/my-plugin.js
const plugin = (octokit, options = { greeting: "Hello" }) => {
  // hook into the request lifecycle
  octokit.hook.wrap("request", async (request, options) => {
    const time = Date.now();
    const response = await request(options);
    octokit.log.info(
      `${options.method} ${options.url} – ${response.status} in $
        {Date.now() - time}
      }ms`,
    );
    return response;
  });

  // add a custom method: octokit.helloWorld()
  return {
    helloWorld: () => console.log(`${options.greeting}, world!`),
  };
};
export default plugin;
```

LANGUAGE: javascript
CODE:
```
const octokit = new MyOctokit({ greeting: "Hola" });
octokit.helloWorld();
// Hola, world!
```

--------------------------------

TITLE: Paginate Issues and Map Titles
DESCRIPTION: Retrieves all issue objects and then maps each issue to its title. This is useful for extracting specific data points from paginated responses.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_1

LANGUAGE: javascript
CODE:
```
octokit
  .paginate(
    "GET /repos/{owner}/{repo}/issues",
    { owner: "octokit", repo: "rest.js" },
    (response) => response.data.map((issue) => issue.title),
  )
  .then((issueTitles) => {
    // issueTitles is now an array with the titles only
  });

```

--------------------------------

TITLE: Async Iterator for Paginated Issues
DESCRIPTION: Iterates through paginated API responses asynchronously, allowing processing of each response as it arrives without waiting for the entire dataset. This is suitable for environments supporting async iterators.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_4

LANGUAGE: javascript
CODE:
```
for await (const response of octokit.paginate.iterator(
  octokit.rest.issues.listForRepo,
  {
    owner: "octokit",
    repo: "rest.js",
  },
)) {
  // do whatever you want with each response, break out of the loop, etc.
}

```

--------------------------------

TITLE: Octokit.js Logging Methods
DESCRIPTION: Demonstrates the four built-in logging methods available in Octokit.js: debug, info, warn, and error. These methods accept a message and optional additional information.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/11_logging.md#_snippet_0

LANGUAGE: javascript
CODE:
```
octokit.log.debug(message[, additionalInfo])
octokit.log.info(message[, additionalInfo])
octokit.log.warn(message[, additionalInfo])
octokit.log.error(message[, additionalInfo])
```

--------------------------------

TITLE: Paginate Issues and Stop Early
DESCRIPTION: Retrieves issues but stops paginating once an issue containing specific text in its body is found. The function returns the data from each response, allowing for custom processing before returning.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_2

LANGUAGE: javascript
CODE:
```
octokit.paginate(
  "GET /repos/{owner}/{repo}/issues",
  { owner: "octokit", repo: "rest.js" },
  (response, done) => {
    if (response.data.find((issue) => issue.body.includes("something"))) {
      done();
    }
    return response.data;
  },
);

```

--------------------------------

TITLE: GET /orgs/{org}/repos
DESCRIPTION: Retrieves a list of public repositories for a given GitHub organization. This example demonstrates how to use the octokit.rest.repos.listForOrg method with specific options.

SOURCE: https://github.com/octokit/rest.js/blob/main/HOW_IT_WORKS.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
## GET /orgs/{org}/repos

### Description
Fetches a list of repositories for a specific GitHub organization. This method is part of the Repositories API.

### Method
GET

### Endpoint
/orgs/{org}/repos

### Parameters
#### Path Parameters
- **org** (string) - Required - The organization's username.

#### Query Parameters
- **type** (string) - Optional - Specifies the type of repositories to list (e.g., 'all', 'public', 'private', 'forks'). Defaults to 'all'.
- **sort** (string) - Optional - Specifies the sorting order of repositories. Defaults to 'full_name'.
- **direction** (string) - Optional - Specifies the direction of sorting ('asc' or 'desc'). Defaults to 'asc'.
- **per_page** (integer) - Optional - Specifies the number of results per page. Defaults to 30.
- **page** (integer) - Optional - Specifies the page number of the results to fetch.

### Request Example
```js
octokit.rest.repos.listForOrg({
  org: "octokit",
  type: "public"
});
```

### Response
#### Success Response (200)
- **repositories** (array) - An array of repository objects.
  - **id** (integer) - Unique identifier for the repository.
  - **name** (string) - The name of the repository.
  - **full_name** (string) - The full name of the repository (e.g., 'octocat/Spoon-Knife').
  - **private** (boolean) - Indicates if the repository is private.
  - **html_url** (string) - URL to the repository on GitHub.com.

#### Response Example
```json
[
  {
    "id": 12345,
    "name": "Spoon-Knife",
    "full_name": "octocat/Spoon-Knife",
    "private": false,
    "html_url": "https://github.com/octocat/Spoon-Knife"
  }
]
```
```

--------------------------------

TITLE: Paginate using Registered Endpoint Method
DESCRIPTION: Retrieves all issue objects for a repository using a pre-registered endpoint method like `octokit.rest.issues.listForRepo`. This provides a more direct way to paginate specific API calls.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_3

LANGUAGE: javascript
CODE:
```
octokit
  .paginate(octokit.rest.issues.listForRepo, {
    owner: "octokit",
    repo: "rest.js",
  })
  .then((issues) => {
    // issues is an array of all issue objects
  });

```

--------------------------------

TITLE: Pagination with Registered Endpoint Methods
DESCRIPTION: Utilize `octokit.paginate()` with pre-defined endpoint methods like `octokit.rest.issues.listForRepo` for a more streamlined pagination experience.

SOURCE: https://github.com/octokit/rest.js/blob/main/docs/src/pages/api/05_pagination.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
## octokit.rest.issues.listForRepo with Pagination

### Description
Paginate results directly using the `octokit.rest.issues.listForRepo` method.

### Method
GET

### Endpoint
/repos/{owner}/{repo}/issues

### Parameters
#### Path Parameters
- **owner** (string) - Required - The owner of the repository.
- **repo** (string) - Required - The name of the repository.

### Request Example
```javascript
octokit
  .paginate(octokit.rest.issues.listForRepo, {
    owner: "octokit",
    repo: "rest.js",
  })
  .then((issues) => {
    // issues is an array of all issue objects
  });
```

### Response
#### Success Response (200)
- **data** (array) - An array of issue objects.

#### Response Example
```json
[
  {
    "id": 1,
    "title": "Issue Title 1",
    "body": "Issue body content."
    // ... other issue properties
  },
  {
    "id": 2,
    "title": "Issue Title 2",
    "body": "Issue body content."
    // ... other issue properties
  }
]
```
```