// FRIDAY — Core Configuration

module.exports = {
  identity: {
    name: 'F.R.I.D.A.Y.',
    fullName: 'Female Replacement Intelligent Digital Assistant Youth',
    callUser: 'Boss',
  },
  voice: {
    provider: 'elevenlabs',
    voiceId: 'kOvUpYLYS0rKGldsKcD1',
    voiceName: 'Maeve',
    model: 'eleven_multilingual_v2',
    settings: {
      stability: 0.5,
      similarity_boost: 0.85,
      style: 0.3,
      use_speaker_boost: true
    }
  },
  collab: {
    provider: 'github',
    autoCommit: false,
    branchPrefix: 'friday/'
  }
};
