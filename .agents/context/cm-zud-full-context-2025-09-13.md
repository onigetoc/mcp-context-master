========================
CODE SNIPPETS
========================
TITLE: Run Next.js Development Server
DESCRIPTION: Commands to start the Next.js development server using different package managers. This allows for local development and testing of the application.

SOURCE: https://github.com/zuplo/zudoku/blob/main/website/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

----------------------------------------

TITLE: Initialize Vercel Project
DESCRIPTION: Starts the interactive Vercel project setup process in the root of your documentation directory. This command guides you through project naming and build settings.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/deploy/vercel.md#_snippet_1

LANGUAGE: command
CODE:
```
vercel
```

----------------------------------------

TITLE: Create Zudoku Project with npm
DESCRIPTION: Initializes a new Zudoku project using the `create-zudoku` CLI tool. This command guides you through interactive prompts to set up your project, allowing you to choose from various templates.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/quickstart.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm create zudoku@latest
```

----------------------------------------

TITLE: Install Zudoku CLI
DESCRIPTION: Use the Zudoku command-line interface to quickly generate a new API documentation project. This command initiates the project setup process.

SOURCE: https://github.com/zuplo/zudoku/blob/main/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm create zudoku@latest
```

----------------------------------------

TITLE: Development Server Commands
DESCRIPTION: Commands to start the development server for Zudoku. Can be run via nx or directly with pnpm.

SOURCE: https://github.com/zuplo/zudoku/blob/main/CLAUDE.md#_snippet_4

LANGUAGE: bash
CODE:
```
nx run cosmo-cargo:dev
pnpm dev
```

----------------------------------------

TITLE: Launch Zudoku Development Server
DESCRIPTION: Starts the local development server for your Zudoku project. It enables hot reloading, allowing you to see changes instantly as you edit your code.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/quickstart.md#_snippet_2

LANGUAGE: bash
CODE:
```
npm run dev
```

----------------------------------------

TITLE: Development Server Commands
DESCRIPTION: Commands to start the development server for Zudoku. Can be run via nx or directly with pnpm.

SOURCE: https://github.com/zuplo/zudoku/blob/main/AGENT.md#_snippet_4

LANGUAGE: bash
CODE:
```
nx run cosmo-cargo:dev
pnpm dev
```

----------------------------------------

TITLE: Run Development Server with npm, yarn, or pnpm
DESCRIPTION: This snippet shows the commands to start the Zudoku development server. It covers common package managers like npm, yarn, and pnpm. Ensure you have the project dependencies installed before running these commands.

SOURCE: https://github.com/zuplo/zudoku/blob/main/packages/create-zudoku/templates/default/ts/README-template.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm run dev
```

LANGUAGE: bash
CODE:
```
yarn dev
```

LANGUAGE: bash
CODE:
```
pnpm dev
```

----------------------------------------

TITLE: Run Development Server with npm, yarn, or pnpm
DESCRIPTION: This snippet shows the commands to start the Zudoku development server. It covers common package managers like npm, yarn, and pnpm. Ensure you have the project dependencies installed before running these commands.

SOURCE: https://github.com/zuplo/zudoku/blob/main/packages/create-zudoku/templates/default/js/README-template.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm run dev
```

LANGUAGE: bash
CODE:
```
yarn dev
```

LANGUAGE: bash
CODE:
```
pnpm dev
```

----------------------------------------

TITLE: Complete Zudoku Footer Configuration Example
DESCRIPTION: A comprehensive example demonstrating the integration of all footer configuration options, including position, columns, social links, copyright, and logo.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/configuration/footer.mdx#_snippet_7

LANGUAGE: tsx
CODE:
```
footer: {
  position: "center",
  columns: [
    {
      title: "Product",
      position: "start",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Documentation", href: "/docs" }
      ]
    },
    {
      title: "Resources",
      position: "center",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Support", href: "/support" },
        { label: "GitHub", href: "https://github.com/yourusername" } // Auto-detected as external
      ]
    }
  ],
  social: [
    { icon: "github", href: "https://github.com/yourusername" },
    { icon: "linkedin", href: "https://linkedin.com/company/yourcompany", label: "LinkedIn" }
  ],
  copyright: `© ${new Date().getFullYear()} YourCompany LLC. All rights reserved.`,
  logo: {
    src: {
      light: "/images/logo-light.svg",
      dark: "/images/logo-dark.svg"
    },
    alt: "Company Logo",
    width: "100px"
  }
}
```

----------------------------------------

TITLE: Complete Frontmatter Example
DESCRIPTION: An example demonstrating the use of multiple frontmatter properties together to configure a Zudoku markdown page.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/markdown/frontmatter.md#_snippet_7

LANGUAGE: markdown
CODE:
```
---
title: Advanced Configuration Guide
description: Learn how to configure advanced features in Zudoku
category: Configuration
navigation_label: Advanced Config
navigation_icon: settings
toc: true
disable_pager: false
---

This page content follows the frontmatter...
```

----------------------------------------

TITLE: Configure transformExamples Function
DESCRIPTION: Demonstrates how to set up the `transformExamples` function within the `zudoku.config.tsx` file. This function is a callback that allows customization of API examples.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/guides/transforming-examples.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  // ... other config options ...
  defaults: {
    apis: {
      transformExamples: (options) => {
        // Transform the content here
        return options.content;
      },
    },
  },
};
```

----------------------------------------

TITLE: Install pnpm and Project Dependencies
DESCRIPTION: Install the pnpm package manager globally, then use it to install project dependencies.

SOURCE: https://github.com/zuplo/zudoku/blob/main/CONTRIBUTING.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install -g pnpm
pnpm install
```

----------------------------------------

TITLE: Install Vercel CLI
DESCRIPTION: Installs the Vercel command-line interface globally using npm. This is a prerequisite for deploying to Vercel.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/deploy/vercel.md#_snippet_0

LANGUAGE: command
CODE:
```
npm i -g vercel
```

----------------------------------------

TITLE: Complete Site Configuration Example (tsx)
DESCRIPTION: A comprehensive example demonstrating the configuration of multiple site branding and layout options, including title, logo, and banner, within the `zudoku.config.tsx` file.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/configuration/site.md#_snippet_3

LANGUAGE: tsx
CODE:
```
const config = {
  site: {
    title: "My API Documentation",
    logo: {
      src: {
        light: "/images/logo-light.svg",
        dark: "/images/logo-dark.svg"
      },
      alt: "Company Logo",
      width: "100px",
    },
    banner: {
      message: "Welcome to our documentation!",
      color: "info",
      dismissible: true
    },
  }
};
```

----------------------------------------

TITLE: Install Nx Globally
DESCRIPTION: Install the Nx build system globally to manage the project's monorepo structure and commands.

SOURCE: https://github.com/zuplo/zudoku/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: bash
CODE:
```
pnpm add --global nx@latest
```

----------------------------------------

TITLE: Build Zudoku for Production
DESCRIPTION: Generates a production-ready build of your Zudoku site. This command optimizes your project for deployment.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/quickstart.md#_snippet_3

LANGUAGE: bash
CODE:
```
npm run build
```

----------------------------------------

TITLE: Azure AD Authentication: Multitenant Configuration
DESCRIPTION: Configuration example for Zudoku authentication when using a multitenant Azure AD setup. This allows users from any Azure AD organization to authenticate with your application.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/configuration/authentication-azure-ad.md#_snippet_2

LANGUAGE: typescript
CODE:
```
authentication: {
  type: "openid",
  clientId: "<your-application-client-id>",
  issuer: "https://login.microsoftonline.com/common/v2.0",
  scopes: ["openid", "profile", "email"],
}
```

----------------------------------------

TITLE: JSON Placeholder API Playground Example
DESCRIPTION: Example of using OpenPlaygroundButton to test the JSON Placeholder API's GET /photos endpoint. It demonstrates setting the server, URL, method, and customizing the button text.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/components/playground.mdx#_snippet_3

LANGUAGE: tsx
CODE:
```
<OpenPlaygroundButton
  server="https://jsonplaceholder.typicode.com"
  url="/photos"
  method="GET"
>
  Test Photos Endpoint
</OpenPlaygroundButton>
```

----------------------------------------

TITLE: Azure AD Authentication: Single Tenant Configuration
DESCRIPTION: Configuration example for Zudoku authentication when using a single-tenant Azure AD setup. This is suitable for organizations that only need access within their own Azure AD directory.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/configuration/authentication-azure-ad.md#_snippet_1

LANGUAGE: typescript
CODE:
```
authentication: {
  type: "openid",
  clientId: "<your-application-client-id>",
  issuer: "https://login.microsoftonline.com/<your-tenant-id>/v2.0",
  scopes: ["openid", "profile", "email"],
}
```

----------------------------------------

TITLE: Navigate to Zudoku Project Directory
DESCRIPTION: Changes the current directory to your newly created Zudoku project folder. This is a standard command-line operation to access your project files.

SOURCE: https://github.com/zuplo/zudoku/blob/main/docs/pages/docs/quickstart.md#_snippet_1

LANGUAGE: bash
CODE:
```
cd your-project-name
```

----------------------------------------

TITLE: Zudoku Project Templates
DESCRIPTION: Explore example templates for Zudoku projects to understand how to implement specific features like using multiple OpenAPI documents, integrating authentication with Auth0, or configuring with Vite.

SOURCE: https://github.com/zuplo/zudoku/blob/main/README.md#_snippet_2

LANGUAGE: markdown
CODE:
```
| Template                                                                                |
|---------------------------------------------------------------------------------------|
| [many-apis](https://github.com/zuplo/zudoku/tree/main/examples/many-apis)               |
| [with-auth0](https://github.com/zuplo/zudoku/tree/main/examples/with-auth0)             |
| [with-config](https://github.com/zuplo/zudoku/tree/main/examples/with-config)           |
| [with-vite-config](https://github.com/zuplo/zudoku/tree/main/examples/with-vite-config) |

These templates demonstrate various use cases and configurations for Zudoku.
```