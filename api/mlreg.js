export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({
      success: false,
      message: 'Parameter userId dan zoneId diperlukan.'
    });
  }

  try {
    const response = await fetch(`https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ralat semasa menyambung ke server asal.',
      error: error.message
    });
  }
}
