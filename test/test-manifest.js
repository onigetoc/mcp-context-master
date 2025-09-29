import { handleListContextFilesTool, handleDiagnoseContextManifestTool, handleRebuildContextManifestTool } from '../build/tools/context-downloader.js';

async function testDiagnosis() {
  console.log('=== LISTING ALL FILES ===');
  try {
    const listResult = await handleListContextFilesTool();
    console.log(JSON.stringify(JSON.parse(listResult.content[0].text), null, 2));
  } catch (e) {
    console.error('List error:', e.message);
  }

  console.log('\n=== DIAGNOSING MANIFEST ===');
  try {
    const diagResult = await handleDiagnoseContextManifestTool();
    console.log(JSON.stringify(JSON.parse(diagResult.content[0].text), null, 2));
  } catch (e) {
    console.error('Diagnose error:', e.message);
  }

  console.log('\n=== REBUILDING MANIFEST ===');
  try {
    const rebuildResult = await handleRebuildContextManifestTool();
    console.log(JSON.stringify(JSON.parse(rebuildResult.content[0].text), null, 2));
  } catch (e) {
    console.error('Rebuild error:', e.message);
  }
}

testDiagnosis();
