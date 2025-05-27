export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: 'Missing userId or zoneId' });
  }

  try {
    const response = await fetch(`https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`);
    const text = await response.text();

    // Buang HTML head dan pre, ambil content JSON
    const jsonStr = text.match(/{[\s\S]*}/)[0];  // Ambil string JSON dalam curly braces
    const data = JSON.parse(jsonStr);

    if (!data || !data.mlbb_data) {
      return res.status(404).json({ error: 'Data tidak dijumpai' });
    }

    const { user_id, zone_id, nickname, region } = data.mlbb_data;

    return res.status(200).json({ userId: user_id, zoneId: zone_id, nickname, region });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}