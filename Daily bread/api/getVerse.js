export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { emotion } = req.body;
  const prompt = `Give me one Bible verse with the reference that provides comfort, hope, or wisdom to someone feeling "${emotion}". Only return the verse and reference.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const message = data.choices[0].message.content.trim();

    res.status(200).json({ verse: message });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching verse' });
  }
}
const response = await fetch('/api/getVerse', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ emotion })
});
