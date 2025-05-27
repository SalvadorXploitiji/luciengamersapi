export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: 'userId dan zoneId diperlukan' });
  }

  try {
    const apiUrl = `https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract field penting je
    const info = data?.data;

    if (!info) {
      return res.status(404).json({ error: 'Data tidak dijumpai' });
    }

    const result = {
      user_id: info.user_id,
      zone_id: info.zone_id,
      nickname: info.nickname,
      region: info.region
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Gagal ambil data', detail: error.message });
  }
}