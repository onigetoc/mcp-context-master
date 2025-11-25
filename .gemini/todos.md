# Project Context Master - Todo List

## Setup & Configuration
- [x] Initialize Context Master configuration
- [x] Create template structure
- [x] Setup `.context-master/` directory
- [ ] Configure GitHub token in `.env`
- [ ] Run initial dependency installation

## Core Development
- [ ] Verify `project_starter` tool functionality
- [ ] Test dependency analysis (package.json parsing)
- [ ] Test GitHub search with priority scoring
- [ ] Test Context7 integration
- [ ] Validate bulk operations
- [x] Renommer `api/prompts/keys` en `api/prompts/categories`.
- [x] Renommer `api/prompts/subkeys` en `api/prompts/outputs`.
- [x] Mettre à jour `api/core/loadPrompt.js` pour utiliser les nouveaux chemins.
- [x] Mettre à jour le fichier de tâches `.gemini/todos.md`.

## Testing
- [ ] Run full test suite: `bun test`
- [ ] Test individual components: `node test/test-tools.js`
- [ ] Test GitHub search: `node test/search-test.js "React"`
- [ ] Verify MCP server startup: `bun start`

## Documentation
- [ ] Update README with setup instructions
- [ ] Document priority scoring algorithm
- [ ] Add API integration examples
- [ ] Create developer guide

## Enhancement
- [ ] Add Python project support
- [ ] Implement Go project parsing
- [ ] Enhance Context7 filtering
- [ ] Add more MCP tools

## Status Summary
**Setup**: In Progress ✓
**Core Features**: Pending
**Testing**: Pending
**Documentation**: Pending