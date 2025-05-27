export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: 'userId dan zoneId diperlukan' });
  }

  try {
    const apiUrl = `https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Buang maklumat pemaju kalau ada
    const { data: info } = data;

    res.status(200).json({
      status: "success",
      userId,
      zoneId,
      info
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal ambil data', detail: error.message });
  }
}