#!/usr/bin/env node

// Test the new search advisor tool
import { handleSearchAdvisorTool } from '../build/tools/search-advisor.tool.js';

async function testSearchAdvisor() {
    console.log('🔍 Testing Search Advisor Tool...\n');

    const testCases = [
        {
            name: 'Remotion with captions topic',
            request: {
                params: {
                    arguments: {
                        query: 'Remotion',
                        topic: 'captions'
                    }
                }
            }
        },
        {
            name: 'React Query (should find TanStack)',
            request: {
                params: {
                    arguments: {
                        query: 'React Query'
                    }
                }
            }
        },
        {
            name: 'Non-existent library',
            request: {
                params: {
                    arguments: {
                        query: 'NonExistentLibrary12345'
                    }
                }
            }
        }
    ];

    for (const testCase of testCases) {
        console.log(`\n📋 Test: ${testCase.name}`);
        console.log('=' .repeat(50));
        
        try {
            const result = await handleSearchAdvisorTool(testCase.request);
            console.log('✅ Success:');
            console.log(result.content[0].text);
        } catch (error) {
            console.log('❌ Error:', error.message);
        }
        
        console.log('\n' + '-'.repeat(50));
    }
}

// Run the test
testSearchAdvisor().catch(console.error);