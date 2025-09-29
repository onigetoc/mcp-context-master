#!/usr/bin/env node

import { searchGithubRepos } from '../build/apis/github-api.js';
import dotenv from 'dotenv';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import yaml from 'js-yaml';

dotenv.config();

const args = process.argv.slice(2);
const query = args.find(arg => !arg.startsWith('--')) || '';
const topicIndex = args.indexOf('--topic');
const tokensIndex = args.indexOf('--tokens');

// By default download is ENABLED. Use --read or --readonly to disable writing.
const readIndex = args.findIndex(arg => arg === '--read' || arg === '--readonly');

const topic = topicIndex !== -1 && args[topicIndex + 1] ? args[topicIndex + 1] : '';
const tokens = tokensIndex !== -1 && args[tokensIndex + 1] ? parseInt(args[tokensIndex + 1]) : 2000;
const shouldDownload = readIndex === -1; // default true

if (!query) {
  console.log('Usage: node test/search-test.js "query" [--topic "topic"] [--tokens number] [--read|--readonly]');
  process.exit(1);
}

const github_token = process.env.GITHUB_TOKEN;
if (!github_token) {
  console.error('ERROR: GITHUB_TOKEN not found in .env file');
  process.exit(1);
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function updateContextManifest() {
  const contextDir = path.join(process.cwd(), '.context-master', 'context');
  const manifestPath = path.join(contextDir, 'context-manifest.yaml');

  if (!await pathExists(contextDir)) {
    return;
  }

  const files = await fs.readdir(contextDir);
  // SCAN: Inclut TOUS les fichiers .md (peu importe le préfixe)
  const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'context-manifest.yaml');

  const manifest = {
    lastUpdated: new Date().toISOString(),
    files: mdFiles,
  };

  await fs.writeFile(manifestPath, yaml.dump(manifest));
  console.log('Manifest YAML updated with ALL .md files.');
}

function generateContextFileName(query, topic = '') {
  const date = new Date().toISOString().split('T')[0];
  const querySlug = query.replace(/[<>:"|?*@/\\]/g, '-').replace(/\s+/g, '-').toLowerCase();
  if (topic) {
    const topicSlug = topic.replace(/[<>:"|?*@/\\]/g, '-').replace(/\s+/g, '-').toLowerCase();
    // GÉNÉRATION: Force le préfixe "cm-" pour les fichiers auto-générés
    return `cm-${querySlug}-${topicSlug}-${date}.md`;
  }
  // GÉNÉRATION: Force le préfixe "cm-" pour les fichiers auto-générés
  return `cm-${querySlug}-full-context-${date}.md`;
}

async function downloadContext7File(context7Url, fileName) {
  try {
    console.log(`Downloading: ${fileName}...`);
    const outputDir = path.join('.context-master', 'context');
    await fs.mkdir(outputDir, { recursive: true });

    const response = await axios.get(context7Url, { timeout: 30000 });
    const filePath = path.join(outputDir, fileName);
    await fs.writeFile(filePath, response.data, 'utf8');

    console.log(`Downloaded: ${path.relative(process.cwd(), filePath)}`);
    await updateContextManifest();
    return true;
  } catch (error) {
    console.error(`Download failed for ${fileName}: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    console.log(`Searching for: "${query}"`);
    const results = await searchGithubRepos(query, github_token, 5);

    if (results.length === 0) {
      console.log('No repositories found.');
      return;
    }

    console.log(`✅ Found ${results.length} repositories:\n`);

    results.forEach((repo, index) => {
      const baseContext7Url = `https://context7.com/${repo.full_name}/llms.txt`;
      const params = new URLSearchParams();
      if (topic) params.set('topic', topic);
      if (tokens) params.set('tokens', tokens.toString());

      const context7Url = params.toString() ? `${baseContext7Url}?${params.toString()}` : baseContext7Url;

      console.log(`${index + 1}. ${repo.name} (${repo.full_name})`);
      console.log(`   ⭐ ${repo.stargazers_count} stars | 🍴 ${repo.forks_count || repo.forks} forks | 💻 ${repo.language || 'Unknown'}`);
      console.log(`   📝 ${repo.description || 'No description'}`);
      console.log(`   🔗 https://github.com/${repo.full_name}`);
      console.log(`   📚 ${context7Url}`);
      console.log('');
    });

    if (shouldDownload) {
      console.log('\nAttempting to download the best result...');
      let downloadSuccess = false;
      for (let i = 0; i < results.length; i++) {
        const repo = results[i];
        console.log(`\nTrying result #${i + 1}: ${repo.full_name}`);
        const params = new URLSearchParams();
        if (topic) params.set('topic', topic);
        params.set('tokens', tokens.toString());
        const context7Url = `https://context7.com/${repo.full_name}/llms.txt?${params.toString()}`;
        const fileName = generateContextFileName(query, topic);
        
        downloadSuccess = await downloadContext7File(context7Url, fileName);
        
        if (downloadSuccess) {
          console.log(`\nSuccessfully downloaded documentation for: ${repo.name}`);
          break;
        } else if (i < results.length - 1) {
          console.log(`Failed for ${repo.full_name}. Trying next result...`);
        }
      }

      if (!downloadSuccess) {
        console.log('\nAll download attempts failed.');
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
