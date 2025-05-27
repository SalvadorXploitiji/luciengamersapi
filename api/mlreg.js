export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: 'Missing userId or zoneId' });
  }

  try {
    const response = await fetch(`https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'External API error', status: response.status });
    }

    const data = await response.json();

    if (data.status !== 'berjaya') {
      return res.status(404).json({ error: 'Data tidak dijumpai' });
    }

    const result = {
      user_id: data.mlbb_data.user_id,
      zone_id: data.mlbb_data.zone_id,
      nickname: data.mlbb_data.nickname,
      region: data.mlbb_data.region,
      country: {
        kod_negara_2_huruf: data.country.kod_negara["2_huruf"],
        kod_negara_3_huruf: data.country.kod_negara["3_huruf"],
        kod_telefon: data.country.kod_telefon,
        nama_negara_bm: data.country.nama_negara.bm,
        ibu_kota: data.country.ibu_kota,
        bilangan_penduduk: data.country.bilangan_penduduk,
        mata_wang: {
          kod: data.country.mata_wang.kod,
          nama: data.country.mata_wang.nama
        },
        bahasa_rasmi: {
          kod: data.country.bahasa_rasmi.kod,
          nama_melayu: data.country.bahasa_rasmi.nama_melayu
        },
        zon_waktu: data.country.zon_waktu.nama,
        rantau: data.country.rantau,
        keluasan_km2: data.country.keluasan_km2
      },
      maklumat_pembangun: {
        compony: "Lucien Gamers",
        instagram: "https://instagram.com/lucienofficialshopmy",
        whatsapp: "+60109872327",
        website: "https://luciengamers.netlify.app"
      }
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error("API fetch failed:", err);
    return res.status(500).json({ error: "Gagal hubungi external API", details: err.message });
  }
}