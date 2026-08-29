export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const streamName = req.query.stream;

  if (!streamName) {
    return res.status(400).json({ error: "الرجاء تحديد اسم القناة مثل ?stream=bein1" });
  }

  // رابط جلب المفتاح من ياسين
  const keyUrl = `https://deft.yacinelive.com/api/tw_key?stream_name=${streamName}`;

  try {
    const keyResponse = await fetch(keyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
        'Referer': 'https://www.yacinelive.com/'
      }
    });

    const token = await keyResponse.text();

    // تركيب الرابط النهائي للبث باستخدام التوكن المستلم
    const finalStreamUrl = `https://live.yacinelive.com/hls/${streamName}/index.m3u8?${token.trim()}`;

    // إرجاع الرابط النهائي مباشرة للموقع
    return res.status(200).send(finalStreamUrl);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
