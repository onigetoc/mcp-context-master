================
CODE SNIPPETS
================
TITLE: Create a Home Page for the App Router in Next.js
DESCRIPTION: This demonstrates how to create the home page (`/`) for a Next.js application using the App Router. A file named `page.tsx` or `page.js` inside the `app` directory defines the UI for the root route.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/01-installation.mdx#_snippet_6

LANGUAGE: tsx
CODE:
```
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

LANGUAGE: jsx
CODE:
```
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

--------------------------------

TITLE: Using getInitialProps with a Custom App
DESCRIPTION: This example demonstrates fetching data within a custom `App` using `getInitialProps`. This pattern populates props for every page but disables Automatic Static Optimization and is not recommended. Consider incrementally adopting the App Router for data fetching in layouts instead.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/02-pages/03-building-your-application/01-routing/05-custom-app.mdx#_snippet_1

LANGUAGE: tsx
CODE:
```
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'

type AppOwnProps = { example: string }

export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx, example: 'data' }
}
```

LANGUAGE: jsx
CODE:
```
import App from 'next/app'

export default function MyApp({ Component, pageProps, example }) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx, example: 'data' }
}
```

--------------------------------

TITLE: Load a Global Script for All Routes (App Router)
DESCRIPTION: To load a third-party script for all routes in an application using the App Router, import `next/script` and include it in the root layout. This script will load and execute when any route in your application is accessed, but only once.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/scripts.mdx#_snippet_1

LANGUAGE: tsx
CODE:
```
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  )
}
```

LANGUAGE: jsx
CODE:
```
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  )
}
```

--------------------------------

TITLE: Import Global CSS in App Router Root Layout
DESCRIPTION: In the App Router, import the global CSS file into your root layout (`app/layout.tsx` or `app/layout.js`). This ensures that the styles are applied to all routes in your application.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/11-css.mdx#_snippet_3

LANGUAGE: typescript
CODE:
```
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

LANGUAGE: javascript
CODE:
```
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

TITLE: Create Example Next.js Pages (App Router)
DESCRIPTION: Create two simple pages using the Next.js App Router to serve as the basis for an E2E navigation test. This includes a home page and an about page, each with a link to the other.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/testing/cypress.mdx#_snippet_5

LANGUAGE: jsx
CODE:
```
// app/page.js
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}

// app/about/page.js
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
```

--------------------------------

TITLE: Create a Root Layout in Next.js `app` Directory
DESCRIPTION: Defines a root layout component for a Next.js application using the `app` directory. This component is required, must accept a `children` prop, and must render the `<html>` and `<body>` tags. This example is provided in both TypeScript (.tsx) and JavaScript (.js).

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_3

LANGUAGE: typescript
CODE:
```
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

LANGUAGE: javascript
CODE:
```
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

TITLE: Use Next.js Link Component with Middleware in App Router
DESCRIPTION: In a Next.js App Router page, use the `Link` component with both `as` and `href` props to enable correct prefetching for routes handled by Middleware. The `as` prop specifies the user-facing URL (`/dashboard`), while the `href` prop dynamically points to the actual path determined by the application's state (e.g., authentication status).

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/02-components/link.mdx#_snippet_17

LANGUAGE: typescript
CODE:
```
'use client'

import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed' // Your auth hook

export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  )
}
```

LANGUAGE: javascript
CODE:
```
'use client'

import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed' // Your auth hook

export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  )
}
```

--------------------------------

TITLE: Implement Incremental Static Regeneration (ISR) in Next.js
DESCRIPTION: Demonstrates how to implement Incremental Static Regeneration (ISR) in both the `pages` and `app` directories. In the `pages` directory, this is achieved by adding a `revalidate` property to the object returned by `getStaticProps`. In the `app` directory, the `revalidate` option is passed within the `next` object of a `fetch()` call to cache the request for a specified duration.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_17

LANGUAGE: javascript
CODE:
```
// `pages` directory

export async function getStaticProps() {
  const res = await fetch(`https://.../posts`)
  const posts = await res.json()

  return {
    props: { posts },
    revalidate: 60,
  }
}

export default function Index({ posts }) {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}
```

LANGUAGE: javascript
CODE:
```
// `app` directory

async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()

  return data.posts
}

export default async function PostList() {
  const posts = await getPosts()

  return posts.map((post) => <div>{post.name}</div>)
}
```

--------------------------------

TITLE: Add Google Tag Manager Globally in Next.js App Router
DESCRIPTION: Integrate Google Tag Manager across all routes in a Next.js App Router application. Import the `GoogleTagManager` component from `@next/third-parties/google` and include it in the root layout file.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/third-party-libraries.mdx#_snippet_1

LANGUAGE: tsx
CODE:
```
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
    </html>
  )
}
```

LANGUAGE: jsx
CODE:
```
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
    </html>
  )
}
```