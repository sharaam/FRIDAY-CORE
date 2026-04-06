// FRIDAY — Text to Speech
// Voice: Maeve (Soft Irish Female)
// ElevenLabs Voice ID: kOvUpYLYS0rKGldsKcD1

const VOICE_ID = 'kOvUpYLYS0rKGldsKcD1';
const API_KEY = process.env.ELEVENLABS_API_KEY;

async function speak(text) {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.85,
        style: 0.3,
        use_speaker_boost: true
      }
    })
  });
  return response; // Returns audio stream
}

module.exports = { speak };
