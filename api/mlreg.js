export default async function handler(req, res) {
  const { userId, zoneId } = req.query;

  // fetch data dari external API
  const response = await fetch(`https://tools.slrmyapi.org/mlreg?userId=${userId}&zoneId=${zoneId}`);
  const data = await response.json();

  if (data.status !== 'berjaya') {
    return res.status(404).json({ message: 'Data tidak dijumpai' });
  }

  // susun data yang kita nak
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

  res.status(200).json(result);
}