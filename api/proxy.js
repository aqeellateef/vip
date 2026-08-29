export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const streamName = req.query.stream;

  if (!streamName) {
    return res.status(400).json({ error: "الرجاء تحديد اسم القناة مثل ?stream=bein1" });
  }

  const keyUrl = `https://deft.yacinelive.com/api/tw_key?stream_name=${streamName}`;

  try {
    const keyResponse = await fetch(keyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
        'Referer': 'https://www.yacinelive.com/'
      }
    });

    const token = await keyResponse.text();
    const finalStreamUrl = `https://live.yacinelive.com/hls/${streamName}/index.m3u8?${token.trim()}`;

    // إعادة توجيه تلقائية لرابط البث النهائي
    return res.redirect(302, finalStreamUrl);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
