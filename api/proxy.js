export default async function handler(req, res) {
  // السماح بالوصول من أي مصدر لتجنب مشاكل الـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const channel = req.query.channel || (req.url.includes('bein') ? 'bein1' : 'iraqia');

  let streamUrl = "";

  try {
    if (channel === "bein1" || channel === "bein") {
      // رابط محدث لسيرفرات ياسين لبي إن سبورت
      streamUrl = "http://h49.streamorax.buzz/live/918454578001/index.m3u8?t=OYtUVPYKzf2lB-BiuHEqCQ&e=1788110691";
    } else if (channel === "iraqia") {
      streamUrl = "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8";
    } else {
      streamUrl = "https://cdn.karwan.tv/gewher-sport/index.m3u8";
    }

    // إرسال الرابط المباشر للمشغل بسلاسة
    return res.status(200).send(streamUrl);
    
  } catch (error) {
    return res.status(500).json({ error: "Failed to resolve stream link" });
  }
}
