// Test pour vérifier la génération des noms de fichiers avec topic

// Simuler la fonction generateContextFileName
function generateContextFileName(packageName, isFullContext = false, topic) {
    let cleanName = packageName;
    cleanName = cleanName.replace('@', '').replace('/', '-');
    cleanName = cleanName.replace(/[<>:"|?*]/g, '-');
    const date = new Date().toISOString().split('T')[0];
    
    // If topic is provided, include it in the filename with explicit "topic-" prefix
    if (topic) {
        const topicSlug = topic.replace(/[<>:"|?*@/\\]/g, '-').replace(/\s+/g, '-').toLowerCase();
        return `cm-${cleanName}-topic-${topicSlug}-${date}.md`;
    }
    
    if (isFullContext) {
        return `cm-${cleanName}-full-context-${date}.md`;
    }
    return `cm-${cleanName}-context-${date}.md`;
}

console.log('=== TEST FILENAME GENERATION ===');

// Test cases
const testCases = [
    { packageName: 'axios', topic: 'http requests', isFullContext: false },
    { packageName: 'axios', topic: undefined, isFullContext: false },
    { packageName: 'axios', topic: undefined, isFullContext: true },
    { packageName: '@tanstack/react-query', topic: 'mutations', isFullContext: false },
    { packageName: 'remotion', topic: 'srt captions', isFullContext: false },
];

testCases.forEach((testCase, index) => {
    const result = generateContextFileName(testCase.packageName, testCase.isFullContext, testCase.topic);
    console.log(`${index + 1}. Package: ${testCase.packageName}, Topic: ${testCase.topic || 'none'}, Full: ${testCase.isFullContext}`);
    console.log(`   Result: ${result}`);
    console.log('');
});