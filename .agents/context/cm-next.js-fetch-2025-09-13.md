========================
CODE SNIPPETS
========================
TITLE: Fetch Data in Next.js Server Components with `fetch` API
DESCRIPTION: Demonstrates how to fetch data using the native `fetch` API within an asynchronous Server Component in Next.js. The component fetches blog posts from an external API and renders them as a list. This example is provided in both TSX and JSX.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/07-fetching-data.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

LANGUAGE: jsx
CODE:
```
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

----------------------------------------

TITLE: Memoize data fetching with React cache function
DESCRIPTION: This example shows how to use React's `cache` function to memoize the return value of a data fetching function. This is useful for non-GET/HEAD `fetch` requests or when using third-party data fetching libraries that don't automatically memoize, preventing redundant executions.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/caching.mdx#_snippet_12

LANGUAGE: TypeScript
CODE:
```
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

LANGUAGE: JavaScript
CODE:
```
import { cache } from 'react'
import db from '@/lib/db'

export const getItem = cache(async (id) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

----------------------------------------

TITLE: Demonstrate Sequential Data Fetching with Dependent Components in Next.js
DESCRIPTION: This example illustrates sequential data fetching where the `<Playlists>` component depends on the `artistID` obtained from the `<Page>` component's initial data fetch. The `Page` component fetches artist information, and then passes the `artistID` to the `Playlists` component, which subsequently fetches playlists. React's `<Suspense>` is used to provide a loading fallback UI while data is being fetched, preventing the entire route from being blocked.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/07-fetching-data.mdx#_snippet_8

LANGUAGE: tsx
CODE:
```
export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  // Get artist information
  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      {/* Show fallback UI while the Playlists component is loading */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Pass the artist ID to the Playlists component */}
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}

async function Playlists({ artistID }: { artistID: string }) {
  // Use the artist ID to fetch playlists
  const playlists = await getArtistPlaylists(artistID)

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}
```

LANGUAGE: jsx
CODE:
```
export default async function Page({ params }) {
  const { username } = await params
  // Get artist information
  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      {/* Show fallback UI while the Playlists component is loading */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Pass the artist ID to the Playlists component */}
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}

async function Playlists({ artistID }) {
  // Use the artist ID to fetch playlists
  const playlists = await getArtistPlaylists(artistID)

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}
```

----------------------------------------

TITLE: Fetch Data in Next.js Server Components
DESCRIPTION: Demonstrates how to use the extended `fetch` API directly within Next.js Server Components. This example fetches data from an external API and renders it as a list, showcasing `async/await` usage for server-side data fetching.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/fetch.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

LANGUAGE: jsx
CODE:
```
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

----------------------------------------

TITLE: Perform Parallel Data Fetching with Promise.all in Next.js
DESCRIPTION: This example demonstrates how to optimize data fetching by initiating multiple requests concurrently using `fetch` and then awaiting their completion with `Promise.all`. This pattern prevents requests from blocking each other, significantly improving load times for pages requiring multiple data sources. It outlines the structure for an `async` page component that fetches artist and album data in parallel. Note that if one request fails, `Promise.all` will fail; consider `Promise.allSettled` for more robust error handling.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/07-fetching-data.mdx#_snippet_10

LANGUAGE: TypeScript
CODE:
```
import Albums from './albums'

async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  // Initiate requests
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

LANGUAGE: JavaScript
CODE:
```
import Albums from './albums'

async function getArtist(username) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getAlbums(username) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({ params }) {
  const { username } = await params

  // Initiate requests
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

----------------------------------------

TITLE: Tag `fetch` requests for `revalidateTag` in Next.js
DESCRIPTION: This snippet demonstrates how to associate a tag with data fetched using the native `fetch` API in Next.js. By including the `next.tags` option in the fetch configuration, the fetched data can later be revalidated using `revalidateTag` based on the specified tag.

SOURCE: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/09-caching-and-revalidating.mdx#_snippet_4

LANGUAGE: TypeScript
CODE:
```
export async function getUserById(id: string) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user'],
    },
  })
}
```

LANGUAGE: JavaScript
CODE:
```
export async function getUserById(id) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user'],
    },
  })
}
```