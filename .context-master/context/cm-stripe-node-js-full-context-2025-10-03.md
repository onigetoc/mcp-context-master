================
CODE SNIPPETS
================
TITLE: Install Node Dependencies for Stripe Snippets
DESCRIPTION: Installs Node.js dependencies required for the example snippets. This command must be run from the `snippets` folder and will link against the locally built Stripe SDK modules from the previous step.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/snippets/README.md#_snippet_1

LANGUAGE: shell
CODE:
```
yarn
```

--------------------------------

TITLE: Run Stripe TypeScript Example
DESCRIPTION: Executes a Stripe example written in TypeScript. This command uses `ts-node` to run the file directly. Replace `your_example.ts` with the actual filename of your TypeScript example.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/snippets/README.md#_snippet_4

LANGUAGE: shell
CODE:
```
yarn run ts-node your_example.ts
```

--------------------------------

TITLE: Run Stripe JavaScript Example
DESCRIPTION: Executes a Stripe example written in JavaScript. This command supports both `.js` and `.mjs` file extensions. Replace `your_example.js` or `your_example.mjs` with the actual filename of your JavaScript example.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/snippets/README.md#_snippet_5

LANGUAGE: shell
CODE:
```
node your_example.js
```

LANGUAGE: shell
CODE:
```
node your_example.mjs
```

--------------------------------

TITLE: Build Stripe Node.js SDK Modules
DESCRIPTION: Builds the Stripe Node.js SDK modules from the root folder. Use `just build-dev` to include source maps, which are highly useful for debugging and troubleshooting SDK behavior. These built modules are then referenced by example snippets.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/snippets/README.md#_snippet_0

LANGUAGE: shell
CODE:
```
just build
```

LANGUAGE: shell
CODE:
```
just build-dev
```

--------------------------------

TITLE: Upgrade Stripe Package After SDK Code Modification
DESCRIPTION: After modifying the `stripe-node` code and rebuilding the modules (Step 1), run this command from the snippets folder. It updates the `stripe` package reference to pull in the newly built local version, ensuring examples use the latest SDK changes.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/snippets/README.md#_snippet_3

LANGUAGE: shell
CODE:
```
yarn upgrade stripe
```

--------------------------------

TITLE: Start the local webhook sample server
DESCRIPTION: Executes the main TypeScript file to start the local server, which is configured to receive and process incoming Stripe webhook events on the specified port.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/README.md#_snippet_3

LANGUAGE: bash
CODE:
```
./main.ts
```

--------------------------------

TITLE: Run integration tests for new webhook example
DESCRIPTION: Navigates to the test directory and executes the integration tests for a newly added webhook example, ensuring its functionality and integration correctness.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/README.md#_snippet_7

LANGUAGE: bash
CODE:
```
./main.ts ../<your test directory>
```

--------------------------------

TITLE: Install and Run Stripe-Mock for Testing (Go)
DESCRIPTION: This snippet demonstrates how to install and run `stripe-mock`, a tool required for running tests in the Stripe Node.js library. It uses the Go package manager to fetch the utility and then executes it. `stripe-mock` should be run in a background terminal.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_32

LANGUAGE: bash
CODE:
```
go get -u github.com/stripe/stripe-mock
stripe-mock
```

--------------------------------

TITLE: Install Node.js project dependencies
DESCRIPTION: Installs the required Node.js packages for the sample application using npm, ensuring all necessary libraries are available for running the webhook server.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install
```

--------------------------------

TITLE: Install Stripe Node.js Library
DESCRIPTION: Installs the Stripe Node.js library using npm or yarn package managers to begin development.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
npm install stripe
# or
yarn add stripe
```

--------------------------------

TITLE: Install Stripe Private Preview SDK via npm
DESCRIPTION: Provides the npm command to install the Stripe Node.js Private Preview SDK. These SDKs are for invite-only features.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_29

LANGUAGE: sh
CODE:
```
npm install stripe@private-preview --save
```

--------------------------------

TITLE: Install Stripe Public Preview SDK via npm
DESCRIPTION: Instructions for installing the latest Stripe Node.js Public Preview SDK using npm. This allows access to features in the public preview phase.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_26

LANGUAGE: sh
CODE:
```
npm install stripe@public-preview --save
```

--------------------------------

TITLE: Execute All Tests (Just/Yarn)
DESCRIPTION: This snippet shows two methods for running all tests in the project. The first uses `just`, a command runner, while the second uses `yarn` to install dependencies and then execute the tests. Ensure dependencies are installed before running tests.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_33

LANGUAGE: bash
CODE:
```
just test
```

LANGUAGE: bash
CODE:
```
yarn && yarn test
```

--------------------------------

TITLE: Resolve Yarn Error with Git fsmonitor-daemon.ipc
DESCRIPTION: Provides a workaround for a specific `yarn` error related to `.git/fsmonitor--daemon.ipc` during dependency installation. This command temporarily removes the problematic file, allowing `yarn` to complete successfully, and typically does not affect Git's operation.

SOURCE: https://github.com/stripe/stripe-node/blob/master/examples/snippets/README.md#_snippet_2

LANGUAGE: shell
CODE:
```
rm /path/to/node/sdk/.git/fsmonitor--daemon.ipc && yarn
```

--------------------------------

TITLE: Initialize Stripe Client and Create Customer in JavaScript
DESCRIPTION: Demonstrates how to initialize the Stripe client with a secret key and create a new customer. Includes examples for both CommonJS 'require' and ES module 'import' syntax, logging the customer ID or any errors.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_1

LANGUAGE: js
CODE:
```
const stripe = require('stripe')('sk_test_...');

stripe.customers.create({
  email: 'customer@example.com',
})
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));
```

LANGUAGE: js
CODE:
```
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_...');

const customer = await stripe.customers.create({
  email: 'customer@example.com',
});

console.log(customer.id);
```

--------------------------------

TITLE: Install Specific Stripe Public Preview SDK Version via npm
DESCRIPTION: Demonstrates how to install a specific version of a Stripe Node.js Public Preview SDK using npm. This is useful for pinning to a particular release or testing a known version.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_27

LANGUAGE: sh
CODE:
```
npm install stripe@<some-version>
# for example:
# npm install stripe@18.6.0-beta.1
```

--------------------------------

TITLE: Configure HTTP Proxy for Stripe Node.js Client Initialization
DESCRIPTION: This example shows how to configure the Stripe Node.js client to route its network requests through an HTTP proxy. It dynamically sets the `httpAgent` option using `https-proxy-agent` based on an environment variable. Ensure the `https-proxy-agent` package is installed and `process.env.http_proxy` is set to your proxy URL.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_12

LANGUAGE: js
CODE:
```
if (process.env.http_proxy) {
  const ProxyAgent = require('https-proxy-agent');

  const stripe = Stripe('sk_test_...', {
    httpAgent: new ProxyAgent(process.env.http_proxy),
  });
}
```

--------------------------------

TITLE: Add AppInfo to Stripe Client Configuration in Node.js
DESCRIPTION: This snippet demonstrates how to configure application information directly during the Stripe client instantiation. This method replaces the deprecated `stripe.setAppInfo()` and allows plugin authors to easily register their application details with the Stripe client.

SOURCE: https://github.com/stripe/stripe-node/blob/master/__wiki__/Migration-guide-for-v8.md#_snippet_4

LANGUAGE: javascript
CODE:
```
// Recommended: Instantiating Stripe client with appInfo
const stripe = new Stripe(apiKey, {
  appInfo: {
    name: 'MyCoolPlugin',
  }
});

// Deprecated method replaced by constructor options:
// stripe.setAppInfo()
```

--------------------------------

TITLE: Initialize Stripe Node.js Client with Advanced Configuration Options
DESCRIPTION: This snippet demonstrates how to initialize the Stripe Node.js client with a comprehensive configuration object. It showcases options like `maxNetworkRetries`, `httpAgent` (for proxying), `timeout`, and custom host/port settings. Ensure `https-proxy-agent` is installed for proxy functionality.

SOURCE: https://github.com/stripe/stripe-node/blob/master/README.md#_snippet_8

LANGUAGE: js
CODE:
```
import ProxyAgent from 'https-proxy-agent';

const stripe = Stripe('sk_test_...', {
  maxNetworkRetries: 1,
  httpAgent: new ProxyAgent(process.env.http_proxy),
  timeout: 1000,
  host: 'api.example.com',
  port: 123,
  telemetry: true,
});
```

--------------------------------

TITLE: Access and Configure Internal Stripe Constants in Node.js
DESCRIPTION: This snippet demonstrates how to retrieve internal constants from the Stripe Node.js library using `Stripe.getConstant()` and how to configure client-specific settings during instantiation. Direct access to constants like `Stripe.DEFAULT_HOST` is deprecated; configuration should now happen through the client constructor.

SOURCE: https://github.com/stripe/stripe-node/blob/master/__wiki__/Migration-guide-for-v8.md#_snippet_1

LANGUAGE: javascript
CODE:
```
// Deprecated: Direct access to internal constants
// Stripe.DEFAULT_HOST
// Stripe.DEFAULT_PORT
// Stripe.DEFAULT_BASE_PATH
// Stripe.DEFAULT_API_VERSION
// Stripe.DEFAULT_TIMEOUT
// Stripe.MAX_NETWORK_RETRY_DELAY_SEC
// Stripe.INITIAL_NETWORK_RETRY_DELAY_SEC

// Recommended: Accessing constants via getter (may be removed in future)
Stripe.getConstant('DEFAULT_HOST');

// Recommended: Configuring constants via client instantiation options
const stripe = new Stripe(apiKey, {
  host,
  port,
  basePath,
  timeout,
  apiVersion
});
```

--------------------------------

TITLE: Configure Stripe Client with Custom Protocol in Node.js
DESCRIPTION: This snippet shows how to instantiate the Stripe Node.js client with a custom protocol, host, and port. This is useful for testing or local proxies and replaces the deprecated `stripe.setProtocol()` and `stripe.setHost()` methods. Note that production traffic must still use HTTPS.

SOURCE: https://github.com/stripe/stripe-node/blob/master/__wiki__/Migration-guide-for-v8.md#_snippet_3

LANGUAGE: javascript
CODE:
```
// Recommended: Instantiating Stripe client with custom host, port, and protocol
const stripe = new Stripe(apiKey, {
  host: '127.0.0.1',
  port: 3000,
  protocol: 'http'
});

// Deprecated methods replaced by constructor options:
// stripe.setProtocol()
// stripe.setHost(host, port, protocol)
```