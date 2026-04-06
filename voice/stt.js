// FRIDAY — Speech to Text
// Captures user voice and sends to ElevenLabs STT

const API_KEY = process.env.ELEVENLABS_API_KEY;

async function listen(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'input.wav');
  formData.append('model_id', 'scribe_v1');

  const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY },
    body: formData
  });

  const data = await response.json();
  return data.text;
}

module.exports = { listen };
