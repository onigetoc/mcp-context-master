#!/usr/bin/env node

import { DownloaderService } from '../build/services/downloader.service.js';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

async function testPureHomepageFallback() {
  console.log('🧪 Testing Pure Homepage Fallback (no Context7 variants)\n');
  
  const downloader = new DownloaderService();
  
  // Créons un SearchResult avec un repo qui n'existe pas sur Context7 
  // mais avec un homepage qui a /llms.txt
  const testResult = {
    originalPackageName: 'fake-expo-test',
    repoName: 'nonexistent-repo',
    url: 'https://github.com/fake/nonexistent-repo', // Repo qui n'existe pas
    homepage: 'https://docs.expo.dev', // Homepage qui existe et a /llms.txt
    context7Url: 'https://context7.com/fake/nonexistent-repo/llms.txt', // Fail
    downloaded: false,
    topic: 'test-homepage',
    tokens: 3000
  };
  
  const docsPath = path.join(process.cwd(), '.context-master', 'context');
  
  try {
    console.log('📦 Testing with nonexistent repo (forces homepage fallback)...');
    console.log(`🔗 Context7 URL: ${testResult.context7Url} (will fail)`);
    console.log(`🔗 Context7 Variant: https://context7.com/fake/nonexistent-repo/llms.txt (will fail)`);
    console.log(`🏠 Homepage fallback: ${testResult.homepage}/llms.txt`);
    
    const downloadedFiles = await downloader.downloadDocumentation([testResult], docsPath, false);
    
    console.log(`\n🎯 Results:`);
    console.log(`📄 Downloaded files: ${downloadedFiles.length}`);
    
    if (downloadedFiles.length > 0) {
      console.log('✅ Homepage fallback succeeded!');
      downloadedFiles.forEach(file => {
        console.log(`📄 File: ${path.basename(file)}`);
      });
      
      // Let's check the content to see if it came from homepage
      const filePath = downloadedFiles[0];
      const fs = await import('fs/promises');
      const content = await fs.readFile(filePath, 'utf8');
      const preview = content.substring(0, 200);
      console.log(`📝 Content preview: ${preview}...`);
      
    } else {
      console.log('❌ No files downloaded');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPureHomepageFallback();