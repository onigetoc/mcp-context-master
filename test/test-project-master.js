#!/usr/bin/env node

import { handleProjectMasterTool } from '../build/tools/project-master.js';

async function testProjectStarter() {
  console.log('🚀 Testing Project Starter...\n');
  
  try {
        const mockRequest = {
      params: {
        arguments: {
          projectPath: '.',
          maxDependencies: 2, // Limit to 5 for testing
          downloadDocs: true, // Enable downloads for full test
          
        }
      }
    };
    
  console.log('DEBUG: test sending maxDependencies =', mockRequest.params.arguments.maxDependencies);

  // Instrumentation: wrap params.arguments in a Proxy to catch any mutation before the handler is called
  const origArgs = mockRequest.params.arguments;
  let proxyHandler = {
    set(target, prop, value) {
      if (prop === 'maxDependencies') {
        console.log('PROXY: set maxDependencies ->', value, 'type=', typeof value);
      }
      target[prop] = value;
      return true;
    },
    get(target, prop) {
      return target[prop];
    }
  };
  const proxiedArgs = new Proxy(origArgs, proxyHandler);
  mockRequest.params.arguments = proxiedArgs;

  console.log('DEBUG: test before call (proxied) maxDependencies =', mockRequest.params.arguments.maxDependencies);
  // Call the handler through a wrapper that verifies the identity of params.arguments
  const wrapper = async (req, proxied) => {
    try {
      console.log('WRAPPER: Object.is(req.params.arguments, proxied) =', Object.is(req.params.arguments, proxied));
      console.log('WRAPPER: req.params.arguments proto =', Object.getPrototypeOf(req.params.arguments));
    } catch (e) {}
    return await handleProjectMasterTool(req);
  };

  const response = await wrapper(mockRequest, proxiedArgs);
  console.log('DEBUG: test after call maxDependencies =', mockRequest.params.arguments.maxDependencies);
    const result = JSON.parse(response.content[0].text);
    
    console.log('✅ Project Starter Results:');
    console.log('==========================');
    console.log(`Success: ${result.success}`);
    
    if (result.projectInfo) {
      console.log(`\n📦 Project Info:`);
      console.log(`  Name: ${result.projectInfo.name}`);
      console.log(`  Type: ${result.projectInfo.type}`);
      console.log(`  Dependencies: ${result.projectInfo.dependencies.length}`);
      console.log(`  Dependencies: ${result.projectInfo.dependencies.join(', ')}`);
    }
    
    if (result.searchResults && result.searchResults.length > 0) {
      console.log(`\n🔍 Search Results (${result.searchResults.length}):`);
      result.searchResults.forEach((repo, i) => {
        console.log(`  ${i + 1}. ${repo.originalPackageName} → ${repo.repoName}`);
        console.log(`     GitHub: ${repo.url}`);
        console.log(`     Context7: ${repo.context7Url}`);
        console.log(`     Downloaded: ${repo.downloaded}`);
        console.log('');
      });
    }

    // Additional assertion: ensure that when scanning package.json we use the dependencies from package.json
    // and that each declared dependency (limited by maxDependencies) has a corresponding search result
    if (result.projectInfo && Array.isArray(result.projectInfo.dependencies) && result.projectInfo.dependencies.length > 0) {
  // We only expect results for the number requested by the test runner (mockRequest.maxDependencies)
  const expectedDeps = result.projectInfo.dependencies.slice(0, mockRequest.params.arguments.maxDependencies);
      for (const depName of expectedDeps) {
        const found = result.searchResults && result.searchResults.find(r => r.originalPackageName === depName);
        if (!found) throw new Error(`Expected search result for ${depName} not found`);
        if (!found.url || !found.url.includes('github.com')) {
          throw new Error(`${depName} did not resolve to a GitHub repo URL. Got: ${found.url}`);
        }
      }
      console.log('\n✅ npm-registry resolution check passed for dependencies from package.json');
    }
    
    if (result.errors && result.errors.length > 0) {
      console.log(`\n❌ Errors:`);
      result.errors.forEach(error => console.log(`  - ${error}`));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testProjectStarter();