import axios from 'axios';

export interface NpmSearchResult {
  name: string;
  repositoryUrl?: string; // cleaned https://github.com/owner/repo
  rawPackage?: any;
}

/**
 * Query the npm registry search API for a package name and return the first result's repository URL (cleaned)
 * Uses: https://registry.npmjs.com/-/v1/search?text=<query>&size=1
 */
export async function lookupPackageRepository(packageName: string): Promise<NpmSearchResult | null> {
  try {
    const encoded = encodeURIComponent(packageName);
    const url = `https://registry.npmjs.com/-/v1/search?text=${encoded}&size=1`;
    const resp = await axios.get(url, { timeout: 15000, headers: { 'User-Agent': 'MCP-Context-NPM-Lookup/1.0.0' } });

    if (!resp.data || !Array.isArray(resp.data.objects) || resp.data.objects.length === 0) return null;

    const pkg = resp.data.objects[0].package;
    const repoField = pkg?.links?.repository || pkg?.repository || null;

    let repositoryUrl: string | undefined = undefined;

    if (repoField && typeof repoField === 'string') {
      repositoryUrl = repoField;
    } else if (repoField && typeof repoField === 'object' && repoField.url) {
      repositoryUrl = repoField.url;
    }

    if (repositoryUrl) {
      // Normalize: remove leading git+, trailing .git, and any branch/tag references (#branch, #tag)
      repositoryUrl = repositoryUrl.replace(/^git\+/, '').replace(/#.*$/, '').replace(/\.git$/i, '');
      // If it's an ssh URL like git@github.com:owner/repo, convert to https
      const sshMatch = repositoryUrl.match(/^git@([^:]+):(.+)$/);
      if (sshMatch) {
        const host = sshMatch[1];
        const path = sshMatch[2].replace(/#.*$/, ''); // Also remove branch refs from SSH URLs
        repositoryUrl = `https://${host}/${path}`;
      }
      // Ensure https scheme
      if (repositoryUrl.indexOf('http') !== 0) {
        repositoryUrl = `https://${repositoryUrl}`;
      }
    }

    return {
      name: pkg.name,
      repositoryUrl,
      rawPackage: pkg
    };

  } catch (err) {
    return null;
  }
}
