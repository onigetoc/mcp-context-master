========================
CODE SNIPPETS
========================
TITLE: Add element 'a' to `order` array in JavaScript
DESCRIPTION: This snippet pushes the string 'a' into the `order` array. It demonstrates a side effect operation, modifying the state of the `order` array.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/shared-2/output.md#_snippet_1

LANGUAGE: javascript
CODE:
```
order.push("a");

```

----------------------------------------

TITLE: Add element 'c' to `order` array in JavaScript
DESCRIPTION: This snippet pushes the string 'c' into the `order` array. This is another side effect operation, further modifying the `order` array's content.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/shared-2/output.md#_snippet_4

LANGUAGE: javascript
CODE:
```
order.push("c");

```

----------------------------------------

TITLE: Increment JavaScript Variable `x` by `1`
DESCRIPTION: This JavaScript snippet increments the value of `x` by `1`. It reads the current value of `x`, adds `1`, and then writes the new value back to `x`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/effects-1/output.md#_snippet_8

LANGUAGE: javascript
CODE:
```
x = x + 1;
```

----------------------------------------

TITLE: Add a new language locale to Lingui project
DESCRIPTION: Describes how to add a new language locale to the Lingui project, which creates a new directory under `locale/messages/` for the specified locale, using the `yarn add-locale` command.

SOURCE: https://github.com/vercel/next.js/blob/canary/examples/with-lingui/README.md#_snippet_2

LANGUAGE: bash
CODE:
```
yarn add-locale <locale ...>
```

----------------------------------------

TITLE: Perform compound addition on JavaScript variable 'x' (+7)
DESCRIPTION: This snippet performs a compound addition assignment, adding '7' to the current value of 'x' and updating 'x' with the result. This operation reads and then writes to 'x'.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/grouping/output.md#_snippet_7

LANGUAGE: JavaScript
CODE:
```
x += 7;
```

----------------------------------------

TITLE: Add Type Safety to Async `generateMetadata` Function in Next.js
DESCRIPTION: Illustrates how to add type safety to an asynchronous `generateMetadata` function in Next.js. The function is typed to return a `Promise<Metadata>`, ensuring proper handling and type checking for metadata generated asynchronously.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/generate-metadata.mdx#_snippet_32

LANGUAGE: tsx
CODE:
```
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Next.js',
  }
}
```

----------------------------------------

TITLE: Perform compound addition on JavaScript variable 'x' (+8)
DESCRIPTION: This snippet performs a compound addition assignment, adding '8' to the current value of 'x' and updating 'x' with the result. This operation reads and then writes to 'x'.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/grouping/output.md#_snippet_8

LANGUAGE: JavaScript
CODE:
```
x += 8;
```

----------------------------------------

TITLE: Add GitHub Remote to Local Git Repository
DESCRIPTION: Before deploying your application to Vercel, you need to link your local Git repository to a new, empty GitHub repository. This command adds the GitHub repository as a remote named 'origin', allowing you to push your code to it.

SOURCE: https://github.com/vercel/next.js/blob/canary/examples/with-sentry/README.md#_snippet_2

LANGUAGE: bash
CODE:
```
git remote add origin https://github.com/<org>/<repo>.git
```

----------------------------------------

TITLE: Perform compound addition on JavaScript variable 'x' (+9)
DESCRIPTION: This snippet performs a compound addition assignment, adding '9' to the current value of 'x' and updating 'x' with the result. This operation reads and then writes to 'x'.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/grouping/output.md#_snippet_9

LANGUAGE: JavaScript
CODE:
```
x += 9;
```

----------------------------------------

TITLE: Add Type Safety to Next.js `metadata` Object with TypeScript
DESCRIPTION: Shows how to explicitly add type safety to the `metadata` object in Next.js using the `Metadata` type imported from 'next'. This enhances code reliability and provides better developer experience through type checking in TypeScript projects.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/generate-metadata.mdx#_snippet_30

LANGUAGE: tsx
CODE:
```
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}
```

----------------------------------------

TITLE: Perform compound addition on JavaScript variable 'x' (+6)
DESCRIPTION: This snippet performs a compound addition assignment, adding '6' to the current value of 'x' and updating 'x' with the result. This operation reads and then writes to 'x'.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/grouping/output.md#_snippet_6

LANGUAGE: JavaScript
CODE:
```
x += 6;
```

----------------------------------------

TITLE: Add Sanity API Read Token to .env.local
DESCRIPTION: This entry adds the `SANITY_API_READ_TOKEN` to your `.env.local` file, which is crucial for authentication. The token enables Sanity Studio to securely live preview your application by providing necessary read permissions to your Sanity dataset.

SOURCE: https://github.com/vercel/next.js/blob/canary/examples/cms-sanity/README.md#_snippet_5

LANGUAGE: bash
CODE:
```
SANITY_API_READ_TOKEN="<paste your token here>"
```

----------------------------------------

TITLE: Perform an in-place addition assignment in JavaScript
DESCRIPTION: This snippet performs an in-place addition assignment, appending the value of `bar` to `foobar`. It reads from both `bar` and `foobar`, and writes to `foobar`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/1/output.md#_snippet_5

LANGUAGE: javascript
CODE:
```
foobar += bar;

```

----------------------------------------

TITLE: Add Global Script with beforeInteractive Strategy in Next.js App Router
DESCRIPTION: To add a global script using `next/script` with the `beforeInteractive` strategy in a Next.js App Router project, place the script component within `app/layout.jsx`. This ensures the script loads server-side for the entire application.

SOURCE: https://github.com/vercel/next.js/blob/canary/errors/no-before-interactive-script-outside-document.mdx#_snippet_0

LANGUAGE: jsx
CODE:
```
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://example.com/script.js"
        strategy="beforeInteractive"
      />
    </html>
  )
}
```

----------------------------------------

TITLE: Perform an in-place addition assignment in JavaScript
DESCRIPTION: This snippet performs an in-place addition assignment, appending the value of `bar` to `foobar`. It reads from both `bar` and `foobar`, and writes to `foobar`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/test-config-1/output.md#_snippet_5

LANGUAGE: javascript
CODE:
```
foobar += bar;

```

----------------------------------------

TITLE: Add Jest test scripts to package.json
DESCRIPTION: This snippet demonstrates how to add `test` and `test:watch` scripts to your `package.json` file. The `test` script executes Jest once, while `test:watch` continuously monitors file changes and re-runs tests. These scripts provide convenient command-line interfaces for running your test suite.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/testing/jest.mdx#_snippet_9

LANGUAGE: JSON
CODE:
```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

----------------------------------------

TITLE: Append a string literal to a variable in JavaScript
DESCRIPTION: This snippet appends the string literal 'foo' to the `foobar` variable using an in-place addition assignment. It reads from and writes to `foobar`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/1/output.md#_snippet_7

LANGUAGE: javascript
CODE:
```
foobar += "foo";

```

----------------------------------------

TITLE: Add data-scroll-behavior to HTML in Next.js App Router
DESCRIPTION: Demonstrates how to add the `data-scroll-behavior="smooth"` attribute to the `<html>` element within a `RootLayout` component in Next.js App Router. This prepares your application for future Next.js optimizations and ensures smooth scrolling is correctly handled during router transitions.

SOURCE: https://github.com/vercel/next.js/blob/canary/errors/missing-data-scroll-behavior.mdx#_snippet_0

LANGUAGE: TypeScript
CODE:
```
export default function RootLayout({ children, }: { children: React.ReactNode })
{ return (
<html lang="en" data-scroll-behavior="smooth">
  <body>
    {children}
  </body>
</html>
) }
```

----------------------------------------

TITLE: Assign Sum of `x`, `a`, and `5` to JavaScript Variable `x`
DESCRIPTION: This JavaScript snippet calculates the sum of `x`, `a`, and the literal `5`, then assigns the result back to `x`. It performs read operations on `x` and `a`, followed by a write operation on `x`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/effects-1/output.md#_snippet_12

LANGUAGE: javascript
CODE:
```
x = x + a + 5;
```

----------------------------------------

TITLE: Append a string literal to a variable in JavaScript
DESCRIPTION: This snippet appends the string literal 'foo' to the `foobar` variable using an in-place addition assignment. It reads from and writes to `foobar`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/test-config-1/output.md#_snippet_7

LANGUAGE: javascript
CODE:
```
foobar += "foo";

```

----------------------------------------

TITLE: Add global custom font in Next.js _document.js (Function Component)
DESCRIPTION: Illustrates an alternative method to add a custom font globally to a Next.js application by modifying `pages/_document.js` using a functional component. This solution also ensures the font is loaded application-wide and supports font optimization, addressing the 'No Page Custom Font' error.

SOURCE: https://github.com/vercel/next.js/blob/canary/errors/no-page-custom-font.mdx#_snippet_1

LANGUAGE: jsx
CODE:
```
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

----------------------------------------

TITLE: Multiply JavaScript Variable `x` by `2` (Compound Assignment)
DESCRIPTION: This JavaScript snippet multiplies the value of `x` by `2` using a compound assignment operator. It reads the current value of `x`, performs the multiplication, and then writes the new value back to `x`.

SOURCE: https://github.com/vercel/next.js/blob/canary/turbopack/crates/turbopack-ecmascript/tests/tree-shaker/analyzer/effects-1/output.md#_snippet_9

LANGUAGE: javascript
CODE:
```
x *= 2;
```

----------------------------------------

TITLE: Add global custom font in Next.js _document.js (Class Component)
DESCRIPTION: Demonstrates how to correctly add a custom font globally to a Next.js application by modifying `pages/_document.js` using a class-based component. This approach ensures the font is available across all pages and enables automatic font optimization, resolving the 'No Page Custom Font' error.

SOURCE: https://github.com/vercel/next.js/blob/canary/errors/no-page-custom-font.mdx#_snippet_0

LANGUAGE: jsx
CODE:
```
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```