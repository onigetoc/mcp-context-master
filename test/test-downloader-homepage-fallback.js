#!/usr/bin/env node

import { DownloaderService } from '../build/services/downloader.service.js';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

async function testHomepageFallbackDirectly() {
  console.log('🧪 Testing Homepage Fallback in DownloaderService\n');
  
  const downloader = new DownloaderService();
  
  // Créons un SearchResult qui simule une situation où Context7 échoue mais homepage existe
  const testResult = {
    originalPackageName: 'expo-test',
    repoName: 'expo',
    url: 'https://github.com/expo/expo',
    homepage: 'https://docs.expo.dev', // On sait que docs.expo.dev/llms.txt existe
    context7Url: 'https://context7.com/fake/nonexistent/llms.txt', // URL qui va échouer
    downloaded: false,
    topic: 'test',
    tokens: 3000
  };
  
  const docsPath = path.join(process.cwd(), '.context-master', 'context');
  
  try {
    console.log('📦 Testing with fake Context7 URL that will fail...');
    console.log(`🔗 Context7 URL: ${testResult.context7Url}`);
    console.log(`🏠 Homepage: ${testResult.homepage}`);
    
    const downloadedFiles = await downloader.downloadDocumentation([testResult], docsPath, false);
    
    console.log(`\n🎯 Results:`);
    console.log(`📄 Downloaded files: ${downloadedFiles.length}`);
    
    if (downloadedFiles.length > 0) {
      console.log('✅ Download succeeded!');
      downloadedFiles.forEach(file => {
        console.log(`📄 File: ${file}`);
      });
    } else {
      console.log('❌ No files downloaded');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testHomepageFallbackDirectly();