export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // استخراج اسم القناة من الرابط بغض النظر عن طريقة الطلب
  const channel = req.query.channel || (req.url.includes('bein') ? 'bein1' : 'iraqia');

  let streamUrl = "";

  if (channel === "bein1" || channel === "bein") {
    streamUrl = "http://h49.streamorax.buzz/live/918454578001/index.m3u8?t=OYtUVPYKzf2lB-BiuHEqCQ&e=1788110691";
  } else if (channel === "iraqia") {
    streamUrl = "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8";
  } else {
    streamUrl = "https://cdn.karwan.tv/gewher-sport/index.m3u8";
  }

  // إرسال الرابط مباشرة للموقع ليعمل في المشغل
  return res.status(200).send(streamUrl);
}
