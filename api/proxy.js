export default async function handler(req, res) {
  const { channel } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (!channel) {
    return res.status(400).json({ error: "Channel parameter is missing" });
  }

  try {
    // يمكنك تخصيص مسارات الروابط أو جلبها ديناميكياً هنا
    let streamUrl = "";
    
    if (channel === "bein1") {
      streamUrl = "http://h49.streamorax.buzz/live/918454578001/index.m3u8";
    } else if (channel === "iraqia") {
      streamUrl = "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8";
    } else {
      streamUrl = "https://cdn.karwan.tv/gewher-sport/index.m3u8";
    }

    return res.status(200).send(streamUrl);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch stream URL" });
  }
}
