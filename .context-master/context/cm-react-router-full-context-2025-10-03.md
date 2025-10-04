================
CODE SNIPPETS
================
TITLE: Install Express and React Router Express Adapter
DESCRIPTION: This command installs `express` for building custom servers, `@react-router/express` for integrating React Router with an Express server, and `cross-env` for setting environment variables consistently across different operating systems, particularly for running in production mode.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_11

LANGUAGE: shellscript
CODE:
```
npm i express @react-router/express cross-env
```

--------------------------------

TITLE: Navigate and run the React Router application
DESCRIPTION: After creating a new project, these commands navigate into the project directory, install all necessary npm dependencies, and then start the development server. This allows you to view and interact with your new React Router application in a web browser, typically at `http://localhost:5173`.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/installation.md#_snippet_1

LANGUAGE: shellscript
CODE:
```
cd my-react-router-app
npm i
npm run dev
```

--------------------------------

TITLE: Manually Set Up React Router Project Dependencies
DESCRIPTION: These commands manually set up a new React Router project, involving creating a directory, initializing npm, and installing both runtime dependencies (like `react-router`, `react-dom`) and development dependencies (like `@react-router/dev`, `vite`) required for the application.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_1

LANGUAGE: shellscript
CODE:
```
mkdir my-react-router-app
cd my-react-router-app
npm init -y

# install runtime dependencies
npm i react-router @react-router/node @react-router/serve isbot react react-dom

# install dev dependencies
npm i -D @react-router/dev vite
```

--------------------------------

TITLE: Uninstall @react-router/serve Package
DESCRIPTION: Removes the `@react-router/serve` package, indicating a transition to a custom server setup rather than relying on the provided serving utility.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_12

LANGUAGE: shellscript
CODE:
```
npm uninstall @react-router/serve
```

--------------------------------

TITLE: Create React Router Routes Definition File
DESCRIPTION: This command creates an empty `app/routes.js` file. This file is essential for defining the application's routes in a React Router project, even if it initially exports an empty array for minimal setup.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_6

LANGUAGE: shellscript
CODE:
```
touch app/routes.js
```

--------------------------------

TITLE: Initialize React Router Project with CLI
DESCRIPTION: This command uses the `create-react-router` CLI to quickly set up a new React Router project based on available templates, providing a batteries-included starting point for development.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_0

LANGUAGE: shellscript
CODE:
```
npx create-react-router@latest
```

--------------------------------

TITLE: Create React Router project from a specific template
DESCRIPTION: Initializes a new React Router project using a predefined template from the `remix-run/react-router-templates` repository. This command is useful for starting projects with specific configurations or features already set up, by replacing `<template-name>` with the desired template identifier.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/installation.md#_snippet_2

LANGUAGE: shellscript
CODE:
```
npx create-react-router@latest --template remix-run/react-router-templates/<template-name>
```

--------------------------------

TITLE: Add Development and Production Scripts to package.json
DESCRIPTION: Modifies `package.json` to include `dev` and `start` scripts. The `dev` script runs the server in development mode, while `start` runs it in production, utilizing `cross-env` for environment variable management.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_17

LANGUAGE: json
CODE:
```
{
  "scripts": {
    "dev": "node ./server.js",
    "start": "cross-env NODE_ENV=production node ./server.js"
  }
}
```

--------------------------------

TITLE: Example App.tsx Before Root Refactor (TSX)
DESCRIPTION: This `App.tsx` component illustrates a typical setup where global providers and layouts wrap the `RouterProvider`. Before refactoring, these elements reside directly within `App.tsx`. The subsequent steps involve migrating these wrapping components to `root.tsx` to ensure they are accessible across all routes.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/upgrading/router-provider.md#_snippet_3

LANGUAGE: tsx
CODE:
```
import "./index.css";

export default function App() {
  return (
    <OtherProviders>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </OtherProviders>
  );
}
```

--------------------------------

TITLE: Create a new React Router project
DESCRIPTION: Initializes a new React Router project in a specified directory using the default template. This command leverages `npx` to execute the `create-react-router` tool without global installation, providing a quick way to scaffold a new application.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/installation.md#_snippet_0

LANGUAGE: shellscript
CODE:
```
npx create-react-router@latest my-react-router-app
```

--------------------------------

TITLE: Render React Application with BrowserRouter in TSX
DESCRIPTION: This TypeScript/TSX code snippet demonstrates how to wrap your main application component (`<App />`) with React Router's `<BrowserRouter>`. This setup is crucial for enabling declarative client-side routing throughout your React application, allowing React Router to manage URL changes and component rendering.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/declarative/installation.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

--------------------------------

TITLE: Create server.js File for Express
DESCRIPTION: Initializes an empty `server.js` file, which will be used to define and configure the custom Express server for the React Router application.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_13

LANGUAGE: shellscript
CODE:
```
touch server.js
```

--------------------------------

TITLE: Run React Router Express Server
DESCRIPTION: Executes the `server.js` file using Node.js to start the configured Express application, making it accessible on port 3000.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_15

LANGUAGE: shellscript
CODE:
```
node server.js
```

--------------------------------

TITLE: Install React Router Vite Plugin and Node Adapter
DESCRIPTION: This section guides you through installing the necessary development plugin for Vite and the Node.js runtime adapter for React Router. It also shows how to update your `vite.config.ts` to replace the standard React plugin with the new React Router plugin.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/upgrading/component-routes.md#_snippet_0

LANGUAGE: shellscript
CODE:
```
npm install -D @react-router/dev
```

LANGUAGE: shellscript
CODE:
```
npm install @react-router/node
```

LANGUAGE: diff
CODE:
```
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [
-    react()
+    reactRouter()
  ],
});
```

--------------------------------

TITLE: Debug Express Server with Node.js Inspector
DESCRIPTION: Starts the Express server with the Node.js `--inspect` flag, enabling debugging capabilities through tools like Chrome DevTools for deeper inspection of the application.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_16

LANGUAGE: shellscript
CODE:
```
node --inspect server.js
```

--------------------------------

TITLE: Configure a React Router application with core settings
DESCRIPTION: This initial configuration example defines essential settings for a React Router application, including the application directory, build output location, server-side rendering enablement, and an array of paths to prerender. It serves as the foundational setup for a React Router project.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/framework-conventions/react-router.config.ts.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  buildDirectory: "build",
  ssr: true,
  prerender: ["/", "/about"],
} satisfies Config;
```

--------------------------------

TITLE: Start React Router Server with Build Path
DESCRIPTION: This command shows the basic usage of `react-router-serve` to start the server, requiring a path to the server build artifact. It's the fundamental way to launch the application server, pointing to the compiled server-side code.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/other-api/serve.md#_snippet_1

LANGUAGE: shellscript
CODE:
```
react-router-serve <server-build-path>
# e.g.
react-router-serve build/index.js
```

--------------------------------

TITLE: Implement Basic React Router Express Server
DESCRIPTION: Sets up an Express server to handle React Router requests using `@react-router/express`. It serves client-side static assets from `build/client` and integrates the React Router build as a request handler.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_14

LANGUAGE: javascript
CODE:
```
import { createRequestHandler } from "@react-router/express";
import express from "express";

const app = express();
app.use(express.static("build/client"));

// notice that your app is "just a request handler"
app.use(
  createRequestHandler({
    // and the result of `react-router build` is "just a module"
    build: await import("./build/server/index.js"),
  }),
);

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
```

--------------------------------

TITLE: Create Vite Configuration File
DESCRIPTION: This command creates an empty `vite.config.js` file, which is necessary for configuring Vite in a React Router project. This file will later be populated with specific build and development settings.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_2

LANGUAGE: shellscript
CODE:
```
touch vite.config.js
```

--------------------------------

TITLE: Install React Router via npm
DESCRIPTION: This command installs the core React Router library from the npm registry. It adds the necessary package to your project's dependencies, making React Router's components and utilities available for use.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/installation.md#_snippet_1

LANGUAGE: shellscript
CODE:
```
npm i react-router
```

--------------------------------

TITLE: Run React Router Production Application (NPM)
DESCRIPTION: After successfully building the application for production, this command initiates the production server. It utilizes NPM to execute the 'start' script, which serves the compiled application code.

SOURCE: https://github.com/remix-run/react-router/blob/main/packages/create-react-router/__tests__/fixtures/basic/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
npm run start
```

--------------------------------

TITLE: Export Empty React Router Routes Array
DESCRIPTION: This JavaScript snippet exports an empty array from `app/routes.js`. While this file is required for React Router applications, an empty array indicates that no specific routes are defined yet, suitable for a minimal setup where routing will be added later.

SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/quickstart.md#_snippet_7

LANGUAGE: javascript
CODE:
```
export default [];
```