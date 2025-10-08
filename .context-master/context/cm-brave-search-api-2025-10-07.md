# Brave Search API Wrapper Documentation

**Repository**: https://github.com/erik-balfe/brave-search  
**Last Updated**: October 7, 2025  
**License**: GPL-3.0  
**Language**: TypeScript (98.4%), JavaScript (1.6%)  

## Overview

A fully typed Brave Search API wrapper providing easy access to web search, news search, image search, local POI search, and automatic polling for AI-generated web search summary feature.

## Installation

### Using npm
```bash
npm install brave-search
```

### Using JSR registry
```bash
npx jsr add @tyr/brave-search
```

## Importing the Package

### Using npm
```typescript
import { BraveSearch } from "brave-search";
```

### Using JSR registry
```typescript
import { BraveSearch } from "@tyr/brave-search/";
```

## Getting Started

1. Obtain a Brave Search API key from [Brave Search API Dashboard](https://api.search.brave.com/app/keys)
2. Install the package using one of the methods above
3. Initialize the `BraveSearch` class:

```typescript
const BRAVE_API_KEY = "your-api-key-here";
const braveSearch = new BraveSearch(BRAVE_API_KEY);
```

## Usage Examples

### Web Search

Perform a web search using the `webSearch` method. Your IDE will provide type hints for the parameters and return types.

```typescript
const webSearchResults = await braveSearch.webSearch("How many stars there are in our galaxy?", {
  count: 5,
  safesearch: "off",
  search_lang: "en",
  country: "US",
  text_decorations: false,
});
console.log(webSearchResults);
```

### Summarized Search

Get a summarized answer for a query using the `getSummarizedAnswer` method. This method returns an object containing `summary` and `webSearch` promises.

```typescript
const { summary, webSearch } = braveSearch.getSummarizedAnswer("How many stars there are in our galaxy?", {
  count: 5, // Number of search results to return
  safesearch: "off", // Optional: Filter for adult content (default is "moderate")
  search_lang: "en", // Optional: Language of the search results (default is "en")
  country: "US", // Optional: Country for the search results (default is "us")
  text_decorations: false, // Optional: Whether to include text decorations (default is true)
  spellcheck: false, // Optional: Whether to enable spellcheck (default is true)
  extra_snippets: true, // Optional: Whether to include extra snippets (default is false)
});

// Wait for the web search results (almost immediately)
const webSearchResponse = await webSearch;
console.log("Web Search Response:", JSON.stringify(webSearchResponse, null, 2));

// Wait for the summarized answer (can take up to couple of seconds)
const summarizedAnswer = await summary;
console.log("Summarized Answer:", JSON.stringify(summarizedAnswer, null, 2));
```

### Local POI Search

Search for local points of interest using the `localPoiSearch` method.

```typescript
const poiResults = await braveSearch.localPoiSearch(["poi_id1", "poi_id2"]);
console.log(poiResults);
```

### Local Descriptions Search

Get descriptions for local points of interest using the `localDescriptionsSearch` method.

```typescript
const descriptionResults = await braveSearch.localDescriptionsSearch(["poi_id1", "poi_id2"]);
console.log(descriptionResults);
```

### Image Search

Perform an image search using the `imageSearch` method. Your IDE will provide type hints for the parameters and return types.

```typescript
const imageSearchResults = await braveSearch.imageSearch("Golden Gate Bridge", {
  count: 5,
  safesearch: "off",
  search_lang: "en",
  country: "US",
});
console.log(imageSearchResults);
```

### News Search

Perform a news search using the `newsSearch` method. Your IDE will provide type hints for the parameters and return types.

```typescript
const newsSearchResults = await braveSearch.newsSearch("Ghibli ChatGPT", {
  count: 5, // Number of search results to return
  search_lang: "en", // Optional: Language of the search results (default is "en")
  extra_snippets: true, // Optional: Whether to include extra snippets (default is false)
});
console.log(newsSearchResults);
```

## Configuration Options

### Polling Options

The `BraveSearch` class supports configurable polling options for summarization. You can customize the polling interval and the maximum number of polling attempts by passing a `PollingOptions` object to the constructor.

```typescript
const braveSearch = new BraveSearch(BRAVE_API_KEY, {
  pollInterval: 1000, // (default is 500ms)
  maxPollAttempts: 30, // (default is 20)
});
```

## Search Options

The library supports various search options as defined in the Brave Search API documentation. For a complete list of options and their descriptions, please refer to the [Brave Search API Documentation](https://api.search.brave.com/app/documentation/web-search/).

## Important Notes

• The `summary` option and `getSummarizedAnswer` method are only available with the Brave "Data for AI pro" plan.
• For detailed information about API usage, rate limits, and pricing, please visit the [Brave Search API Terms](https://brave.com/search/api/).

## Features

• Web search
• Automatic summarization with polling
• Local POI search
• Local descriptions search
• Error handling for API requests

## API Reference

For detailed API reference, please refer to the [Brave Search API Documentation](https://api.search.brave.com/app/documentation/web-search/).

## Version Management

This package maintains consistent versioning across both npm (package.json) and Deno (deno.json) configurations. To release a new version:

```bash
# Release a new major version (1.0.0 -> 2.0.0)
npm run release:major

# Release a new minor version (1.0.0 -> 1.1.0)
npm run release:minor

# Release a new patch version (1.0.0 -> 1.0.1)
npm run release:patch
```

These commands will:
1. Update the version in package.json
2. Automatically sync the new version to deno.json using the sync-versions.js script

## Repository Information

- **Stars**: 14
- **Watchers**: 1
- **Forks**: 2
- **Latest Release**: v0.5.5 (July 8, 2024)
- **Contributors**: 2 (Erik Balfe, Mike Chao)

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Disclaimer

This library is not officially associated with Brave Software. It is a third-party implementation of the Brave Search API.