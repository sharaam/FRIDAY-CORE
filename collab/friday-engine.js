// FRIDAY — AI Co-Pilot Engine
// Connects voice input → AI reasoning → code output → GitHub commit

const { speak } = require('../voice/tts');
const { readFile, writeFile, createBranch } = require('./github');

const FRIDAY_CONFIG = require('../config/friday.config');

class FridayEngine {
  constructor() {
    this.context = [];
    this.activeBranch = 'main';
  }

  // Main entry — takes transcribed voice input, returns response + optional code
  async process(userInput, currentFile = null) {
    console.log(`[FRIDAY] Processing: "${userInput}"`);

    // Build context window
    this.context.push({ role: 'user', content: userInput });
    if (currentFile) {
      this.context.push({
        role: 'system',
        content: `Current file in editor: ${currentFile.path}\n\`\`\`\n${currentFile.content}\n\`\`\``
      });
    }

    // Response object
    return {
      text: null,       // FRIDAY's text response
      audio: null,      // Audio buffer from ElevenLabs
      code: null,       // Code suggestion
      action: null      // e.g. 'commit', 'create_branch', 'read_file'
    };
  }

  // FRIDAY commits her own code to the repo
  async commitCode(path, code, description) {
    const branch = `friday/auto-${Date.now()}`;
    await createBranch(branch);
    await writeFile(path, code, `[FRIDAY] ${description}`, branch);
    console.log(`[FRIDAY] Code committed to branch: ${branch}`);
    return branch;
  }

  // FRIDAY speaks her response
  async respond(text) {
    const audio = await speak(text);
    return audio;
  }
}

module.exports = FridayEngine;
