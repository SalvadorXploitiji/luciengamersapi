export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: 'Missing userId or zoneId' });
  }

  try {
    const response = await fetch(`https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`);
    const data = await response.json();

    if (!data || !data.mlbb_data) {
      return res.status(404).json({ error: 'Data tidak dijumpai' });
    }

    // Cuma return data yang kau nak sahaja
    const { user_id, zone_id, nickname, region } = data.mlbb_data;

    return res.status(200).json({ userId: user_id, zoneId: zone_id, nickname, region });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}