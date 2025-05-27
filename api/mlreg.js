export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: "userId dan zoneId diperlukan" });
  }

  try {
    const response = await fetch(`https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`);
    const textData = await response.text();

    // Extract JSON dalam <pre> tag
    const jsonMatch = textData.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (!jsonMatch) {
      return res.status(404).json({ error: "data tidak dijumpai" });
    }

    const jsonString = jsonMatch[1];
    const data = JSON.parse(jsonString);

    if (!data.mlbb_data) {
      return res.status(404).json({ error: "data tidak dijumpai" });
    }

    const { user_id, zone_id, nickname, region } = data.mlbb_data;

    return res.status(200).json({
      userId: user_id,
      zoneId: zone_id,
      nickname,
      region,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}