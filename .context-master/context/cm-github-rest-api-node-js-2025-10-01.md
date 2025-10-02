================
CODE SNIPPETS
================
TITLE: GitHub REST API OpenAPI Description
DESCRIPTION: This repository contains OpenAPI descriptions for GitHub's REST API. It details the structure, formats, and usage of these descriptions.

SOURCE: https://github.com/github/rest-api-description/blob/main/README.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
## Introduction

This repository provides OpenAPI descriptions for GitHub's REST API, adhering to the OpenAPI Specification.

### What is OpenAPI?

OpenAPI is a standard, programming language-agnostic interface description for HTTP APIs, enabling machines and humans to understand API capabilities without source code or network inspection.

### Project Status

The API description is considered **stable** as of release 1.1.4.

- `descriptions` folder: Contains OpenAPI 3.0 descriptions.
- `descriptions-next` folder: Contains OpenAPI 3.1 descriptions (subject to breaking changes).

### Description Formats

- **Bundled**: Single file artifacts using OpenAPI components for reuse and portability. This is the preferred format.
- **Dereferenced**: Fully dereferenced versions without component references, useful for tools with poor reference support.

### Vendor Extensions

GitHub uses vendor extensions for concepts specific to GitHub or harder to express in standard OpenAPI. Refer to `extensions.md` for details.

### Limitations

- Not all headers are described; expect additions over time.
- Multi-segment path parameters are not fully supported by the OpenAPI specification and are annotated with `x-multi-segment`. URL encoding is recommended.
- Multiple paths may exist for operations; the most common path is described. Support for alias paths is being developed.
- This repository only offers bundled and dereferenced versions. A fully referenced directory structure is under consideration.

### Contributing

Direct pull requests modifying the description are not accepted. The repository is automatically updated. For mismatches or schema issues, please open an issue.

### License

Licensed under the [MIT license](LICENSE.md).

### Contact

For questions, contact [opensource+rest-api-description@github.com](mailto:opensource+rest-api-description@github.com).
```

--------------------------------

TITLE: Create and Checkout Git Branch
DESCRIPTION: This command creates a new Git branch for making changes. It's a standard step before modifying code or files in a repository. Ensure you are in the cloned repository's root directory before executing.

SOURCE: https://github.com/github/rest-api-description/blob/main/CONTRIBUTING.md#_snippet_0

LANGUAGE: shell
CODE:
```
git checkout -b my-branch-name
```

--------------------------------

TITLE: GitHub Specific Operation Metadata (YAML)
DESCRIPTION: The `x-github` extension enriches the Operation Object with GitHub-specific metadata crucial for generating Octokit SDKs. It includes fields like `triggersNotification`, `deprecationDate`, `removalDate`, `githubCloudOnly`, `enabledForGitHubApps`, and `previews`, influencing rate limiting, deprecation handling, and app enablement.

SOURCE: https://github.com/github/rest-api-description/blob/main/extensions.md#_snippet_1

LANGUAGE: yaml
CODE:
```
x-github:
  enabledForGitHubApps: true
  githubCloudOnly: false
  previews: []
```

--------------------------------

TITLE: x-github Extension
DESCRIPTION: The `x-github` extension provides supplementary information crucial for generating Octokit SDKs and managing API behavior.

SOURCE: https://github.com/github/rest-api-description/blob/main/extensions.md#_snippet_4

LANGUAGE: APIDOC
CODE:
```
## x-github Extension

### Purpose

Provides extra information used to generate Octokit SDKs.

### Usage

The `x-github` specification extension is applied to the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#operationObject).

| Field Name  |	Type	   | Description  |
| :---------- | :------: | :----------- |
| triggersNotification | boolean   | Operations that trigger notification are more likely to trigger abuse limits. We increase the default throttling from 1s between requests to 3s between requests for these operations. |
| deprecationDate        | string   | The date when we publicly announce that the operation will eventually be removed. After this date, the `deprecated` property should also be set to `true`. Format: `YYYY-MM-DD` |
| removalDate        | string   | The date when we stop displaying documentation for the operation on docs.github.com and stop including it in new Octokit major versions. Format: `YYYY-MM-DD` |
| githubCloudOnly | boolean | Used in a [separate plugin](https://github.com/octokit/plugin-enterprise-cloud.js/) for GitHub Enterprise Cloud users. |
| enabledForGitHubApps       | boolean   | True if this operation is enabled for apps |
| previews      | array   | Previews will be deprecated soon. An array of API previews, with name, description, and whether the preview is required for this particular operation. |

#### Example usage

```yaml
x-github:
  enabledForGitHubApps: true
  githubCloudOnly: false
  previews: []
```
```

--------------------------------

TITLE: Define Display Name for Tags (YAML)
DESCRIPTION: The `x-displayName` extension is used within the Tag Object of an OpenAPI specification to provide a human-readable name for documentation interfaces. It is a string value that corresponds to a tag.

SOURCE: https://github.com/github/rest-api-description/blob/main/extensions.md#_snippet_0

LANGUAGE: yaml
CODE:
```
tags:
  name: actions
  description: Endpoints to manage GitHub Actions using the REST API.
  x-displayName: GitHub Actions
```

--------------------------------

TITLE: x-displayName Extension
DESCRIPTION: The `x-displayName` extension is used to define a user-friendly display name for tags in documentation interfaces.

SOURCE: https://github.com/github/rest-api-description/blob/main/extensions.md#_snippet_3

LANGUAGE: APIDOC
CODE:
```
## x-displayName Extension

### Description

To define a display name, typically for documentation interfaces, for the corresponding tag.

### Usage

This applies to the [Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#tagObject).

The value should be a string.

#### Example usage

```yaml
tags:
  name: actions
  description: Endpoints to manage GitHub Actions using the REST API.
  x-displayName: GitHub Actions
```
```

--------------------------------

TITLE: Mark Path Parameter for Multiple Segments (YAML)
DESCRIPTION: The `x-multi-segment` extension, when applied to a path parameter in an OpenAPI specification, indicates that the parameter can support multiple URL segments. This is a boolean value, defaulting to false, and is useful for parameters like repository names or branches.

SOURCE: https://github.com/github/rest-api-description/blob/main/extensions.md#_snippet_2

LANGUAGE: yaml
CODE:
```
- name: ref
  in: path
  required: true
  schema:
    type: string
  x-multi-segment: true
```

--------------------------------

TITLE: x-multi-segment Extension
DESCRIPTION: The `x-multi-segment` extension indicates that a path parameter can accommodate multiple URL segments, useful for flexible routing.

SOURCE: https://github.com/github/rest-api-description/blob/main/extensions.md#_snippet_5

LANGUAGE: APIDOC
CODE:
```
## x-multi-segment Extension

Path parameter extension marking a certain parameter as supporting multiple URL segments. It's recommended to use an URL encoded value when possible.

### Usage

The `x-multi-segment` extension applies only on [path parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#parameter-object). The value should be a boolean. Defaults to false.

#### Example

```yaml
- name: ref
  in: path
  required: true
  schema:
    type: string
  x-multi-segment: true
```
```