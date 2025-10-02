================
CODE SNIPPETS
================
TITLE: Retrieve Raw Content with Media Type Format
DESCRIPTION: Explains how to specify media type formats for requests using `mediaType: { format }`. The example retrieves the raw content of a `package.json` file from a GitHub repository.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_24

LANGUAGE: javascript
CODE:
```
const { data } = await octokit.rest.repos.getContent({
  mediaType: {
    format: "raw",
  },
  owner: "octocat",
  repo: "hello-world",
  path: "package.json",
});
console.log("package name: %s", JSON.parse(data).name);
```

--------------------------------

TITLE: Load Octokit in Browsers
DESCRIPTION: This snippet demonstrates how to load the Octokit library directly from esm.sh for use in web browsers using a script tag with type='module'.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_0

LANGUAGE: html
CODE:
```
<script type="module">
import { Octokit, App } from "https://esm.sh/octokit";
</script>
```

--------------------------------

TITLE: Load Octokit in Deno
DESCRIPTION: This snippet shows how to import the Octokit library in a Deno environment, loading it directly from esm.sh with TypeScript definitions.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_1

LANGUAGE: ts
CODE:
```
import { Octokit, App } from "https://esm.sh/octokit?dts";
```

--------------------------------

TITLE: Enable Schema Previews for Octokit GraphQL Mutations
DESCRIPTION: Demonstrates how to enable schema previews for GraphQL mutations by including the `mediaType: { previews: [] }` option. This example creates a new label with specific properties, showcasing how to interact with preview features of the GitHub GraphQL API.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_30

LANGUAGE: js
CODE:
```
await octokit.graphql(
  `mutation createLabel($repositoryId:ID!,name:String!,color:String!) {
  createLabel(input:{repositoryId:$repositoryId,name:$name}) {
    label: {
      id
    }
  }
}`,
  {
    repositoryId: 1,
    name: "important",
    color: "cc0000",
    mediaType: {
      previews: ["bane"],
    },
  },
);
```

--------------------------------

TITLE: Install and test a specific Octokit.js pull request locally
DESCRIPTION: Command to install a specific pull request branch of an Octokit.js repository directly from GitHub for local testing purposes. This allows contributors to verify changes from a pull request before it is officially merged. Remember to replace `[PULL REQUEST NUMBER]` with the actual pull request identifier.

SOURCE: https://github.com/octokit/octokit.js/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: shell
CODE:
```
npm install https://github.pika.dev/octokit/<repository name>/pr/[PULL REQUEST NUMBER]
```

--------------------------------

TITLE: Verify and Receive GitHub Webhook Events (Serverless)
DESCRIPTION: Shows how to explicitly verify and receive a webhook event in a serverless environment using `app.webhooks.verifyAndReceive`. This method requires extracting `id`, `name`, `signature`, and `payload` from the incoming request headers and body.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_34

LANGUAGE: js
CODE:
```
await app.webhooks.verifyAndReceive({
  id: request.headers["x-github-delivery"],
  name: request.headers["x-github-event"],
  signature: request.headers["x-hub-signature-256"],
  payload: request.body,
});
```

--------------------------------

TITLE: Provide Custom Fetch Implementation for Octokit.js
DESCRIPTION: Illustrates how to provide a custom `fetch` implementation (e.g., `node-fetch`) to Octokit.js, useful for environments without native `fetch` or for specific network configurations.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_17

LANGUAGE: js
CODE:
```
import fetch from "node-fetch";

const octokit = new Octokit({
  request: {
    fetch: fetch,
  },
});
```

--------------------------------

TITLE: Paginate GitHub Repository Issues using Async Iterator
DESCRIPTION: Shows how to efficiently iterate through all issues in a GitHub repository using Octokit's `paginate.iterator` method. This approach is memory-efficient for handling large result sets.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_22

LANGUAGE: javascript
CODE:
```
const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});

// iterate through each response
for await (const { data: issues } of iterator) {
  for (const issue of issues) {
    console.log("Issue #%d: %s", issue.number, issue.title);
  }
}
```

--------------------------------

TITLE: Create GitHub Issue using Octokit REST Endpoint Method
DESCRIPTION: Demonstrates how to create a new GitHub issue using the high-level `octokit.rest` endpoint methods, which are automatically generated from GitHub's OpenAPI specification for improved readability and convenience.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_20

LANGUAGE: javascript
CODE:
```
await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
```

--------------------------------

TITLE: Authenticate Octokit.js with App SDK
DESCRIPTION: Illustrates how to use the `App` SDK to authenticate and interact with the GitHub API, simplifying app installation authentication and API calls.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_14

LANGUAGE: js
CODE:
```
const app = new App({ appId, privateKey });
const { data: slug } = await app.octokit.rest.apps.getAuthenticated();
const octokit = await app.getInstallationOctokit(123);
await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello world from " + slug,
});
```

--------------------------------

TITLE: Create GitHub Issue using octokit.rest.* Method
DESCRIPTION: Shows how to create a new GitHub issue using the convenient `octokit.rest.issues.create` method, specifying owner, repository, title, and body.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_18

LANGUAGE: js
CODE:
```
await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
```

--------------------------------

TITLE: Retrieve All GitHub Repository Issues in Single Call
DESCRIPTION: Demonstrates how to retrieve all paginated items from a GitHub REST API endpoint in a single call using `octokit.paginate()`. This method collects all results into an array.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_23

LANGUAGE: javascript
CODE:
```
const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});
```

--------------------------------

TITLE: GitHub OAuth Token Management API Endpoints
DESCRIPTION: API endpoints for managing GitHub OAuth tokens and grants, including invalidation (logout equivalent) and revocation (uninstall equivalent). Both require authentication via an Authorization header.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_40

LANGUAGE: APIDOC
CODE:
```
API Endpoints:
- DELETE /api/github/oauth/token:
    Description: Invalidates current token, equivalent to a logout.
    Authentication: Must authenticate using token in `Authorization` header.
- DELETE /api/github/oauth/grant:
    Description: Revokes the user's grant, equivalent to an uninstall.
    Authentication: Must authenticate using token in `Authorization` header.
```

--------------------------------

TITLE: Configure Octokit.js Request Retries
DESCRIPTION: Enables request retries using `@octokit/plugin-retry`.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_11

LANGUAGE: APIDOC
CODE:
```
retry: Object
  Configures request retries using @octokit/plugin-retry.
```

--------------------------------

TITLE: Create GitHub Issue using octokit.request Method
DESCRIPTION: Demonstrates creating a new GitHub issue using the more generic `octokit.request` method, specifying the HTTP verb, path, and request body.

SOURCE: https://github.com/octokit/octokit.js/blob/main/README.md#_snippet_19

LANGUAGE: js
CODE:
```
await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
```