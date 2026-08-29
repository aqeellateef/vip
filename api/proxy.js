export default async function handler(req, res) {
  const { stream } = req.query;

  if (!stream) {
    return res.status(400).send("Stream parameter is missing");
  }

  try {
    // رابط جلب البث من المصدر الأساسي (أو بناء الرابط حسب معرف القناة)
    let targetUrl = "";
    
    if (stream === "bein1") {
      targetUrl = "https://deft.yacinelive.com/api/live/bein1"; // ضع هنا الرابط الحقيقي أو الـ API الخاص بسيرفر ياسين للقناة
    } else {
      // كمثال افتراضي لجلب الرابط عبر الـ API العام
      const response = await fetch(`https://deft.yacinelive.com/api/channels/${stream}`);
      const data = await response.json();
      targetUrl = data.url || data.stream_url;
    }

    if (!targetUrl) {
      // رابط احتياطي تجريبي للتأكد من عمل المشغل إذا لم يرجع المصدر رابطاً
      targetUrl = "https://play.gostream.to/hls/live/stream.m3u8";
    }

    // إرجاع الرابط الحقيقي للمشغل
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(targetUrl);

  } catch (error) {
    return res.status(500).send("Error fetching stream: " + error.message);
  }
}
