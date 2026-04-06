# F.R.I.D.A.Y. — CORE

**Female Replacement Intelligent Digital Assistant Youth**

A full-stack voice-integrated AI co-pilot. Talk to FRIDAY while you code. She listens, responds in her Irish voice, and writes code alongside you in real-time.

## Architecture

```
voice/        → ElevenLabs TTS, STT, Speech-to-Speech (Maeve)
collab/       → GitHub integration, code sync, pair-programming engine
interface/    → Web app — voice UI + live code editor
config/       → API keys, voice profiles, system settings
```

## Stack
- **Voice:** ElevenLabs (Maeve — Soft Irish Female, ID: kOvUpYLYS0rKGldsKcD1)
- **Code Collab:** GitHub API
- **Interface:** React + Web Speech API
- **Backend:** Node.js / Deno

## Status
- [x] Phase 1 — Voice Layer
- [ ] Phase 2 — Code Collab Layer  
- [ ] Phase 3 — Unified Interface
