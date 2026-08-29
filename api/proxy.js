export default async function handler(req, res) {
  // السماح بالوصول من أي موقع (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const streamName = req.query.stream;

  if (!streamName) {
    return res.status(400).json({ error: "الرجاء تحديد اسم القناة مثل ?stream=bein1" });
  }

  const targetUrl = `https://deft.yacinelive.com/api/tw_key?stream_name=${streamName}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
        'Referer': 'https://www.yacinelive.com/'
      }
    });

    const data = await response.text();
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
