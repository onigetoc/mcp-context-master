================
CODE SNIPPETS
================
TITLE: Demonstrate deprecated `Router.onAppUpdated` usage in Next.js
DESCRIPTION: This snippet illustrates the now-removed `Router.onAppUpdated` hook in Next.js, which was used to detect new app deployments and navigate the page via the server. It highlights its limited functionality, such as the inability to wait for network requests or block navigation, leading to its deprecation due to a bug fix.

SOURCE: https://github.com/vercel/next.js/blob/canary/errors/no-on-app-updated-hook.mdx#_snippet_0

LANGUAGE: JavaScript
CODE:
```
Router.onAppUpdated = function (nextRoute) {
  location.href = nextRoute
}
```

--------------------------------

TITLE: Define API Routes and Route Handlers in Next.js App Router
DESCRIPTION: This snippet illustrates how to define API endpoints using Route Handlers in the Next.js `app` directory. It provides examples for both TypeScript and JavaScript implementations, demonstrating how to handle `GET` requests using the Web Request API. This replaces traditional API Routes in the `pages/api` directory for the App Router.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_21

LANGUAGE: ts
CODE:
```
export async function GET(request: Request) {}
```

LANGUAGE: js
CODE:
```
export async function GET(request) {}
```

--------------------------------

TITLE: Perform Static Site Generation with `fetch` Caching in Next.js `app` Directory
DESCRIPTION: Explains how `fetch()` in the Next.js `app` directory defaults to `cache: 'force-cache'`, mimicking `getStaticProps` behavior for static data fetching and rendering.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_17

LANGUAGE: jsx
CODE:
```
// `app` directory

// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()

  return projects
}

export default async function Index() {
  const projects = await getProjects()

  return projects.map((project) => <div>{project.name}</div>)
}
```

--------------------------------

TITLE: Update Next.js to Latest Version for App Router
DESCRIPTION: This command updates your Next.js project to the latest version (13.4 or greater), which is required to use the new `app` directory and its features.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_3

LANGUAGE: bash
CODE:
```
npm install next@latest
```

--------------------------------

TITLE: Implement various data fetching strategies in Next.js App Router
DESCRIPTION: Demonstrates how to perform static data fetching (`force-cache`), dynamic data fetching (`no-store`), and revalidated data fetching using the `fetch()` API within Next.js App Router Server Components. This approach replaces the functionality of `getStaticProps` and `getServerSideProps` from the `pages` directory.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_11

LANGUAGE: tsx
CODE:
```
export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })

  return <div>...</div>
}
```

LANGUAGE: jsx
CODE:
```
export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })

  return <div>...</div>
}
```

--------------------------------

TITLE: Final Component for `app` Directory with `useSearchParams`
DESCRIPTION: Presents the simplified component after full migration to the `app` directory, removing `next/compat/router` dependencies. It directly uses `useSearchParams` from `next/navigation`, as null checks for the router are no longer required in an `app` directory-only context.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/02-pages/04-api-reference/03-functions/use-router.mdx#_snippet_18

LANGUAGE: jsx
CODE:
```
import { useSearchParams } from 'next/navigation'
const MyComponent = () => {
  const searchParams = useSearchParams()
  // As this component is only used in `app/`, the compat router can be removed.
  const search = searchParams.get('search')
  // ...
}
```

--------------------------------

TITLE: Access Request Object in Next.js `pages` Directory
DESCRIPTION: Demonstrates how to retrieve the `req` object within `getServerSideProps` in the Next.js `pages` directory to access request headers and cookies, leveraging Node.js HTTP API.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_14

LANGUAGE: jsx
CODE:
```
// `pages` directory

export async function getServerSideProps({ req, query }) {
  const authHeader = req.getHeaders()['authorization'];
  const theme = req.cookies['theme'];

  return { props: { ... }}
}

export default function Page(props) {
  return ...
}
```

--------------------------------

TITLE: Next.js: Defining Dynamic Paths for Static Generation (`pages` vs `app`)
DESCRIPTION: This snippet demonstrates how to define dynamic routes for static pre-rendering in Next.js. It shows the `getStaticPaths` function used in the `pages` directory to return an array of `params` objects, and its equivalent `generateStaticParams` in the `app` directory, which returns a simpler array of segments. Both functions are crucial for specifying which dynamic pages should be built at compile time.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx#_snippet_18

LANGUAGE: jsx
CODE:
```
// `pages` directory
import PostLayout from '@/components/post-layout'

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}

export default function Post({ post }) {
  return <PostLayout post={post} />
}
```

LANGUAGE: jsx
CODE:
```
// `app` directory
import PostLayout from '@/components/post-layout'

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

async function getPost(params) {
  const res = await fetch(`https://.../posts/${(await params).id}`)
  const post = await res.json()

  return post
}

export default async function Post({ params }) {
  const post = await getPost(params)

  return <PostLayout post={post} />
}
```