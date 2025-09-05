export default async function handler(req, res) {
  const query = req.query.q || "";

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxpVnMSxihQwO_P6gebekRYPwMClL8Pc-1X5vsU4wf-H0yN4pBurOu2D-C5nvvpoHkHnA/exec");
    const text = await response.text();
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("Erro ao fazer parse do JSON:", parseErr);
      return res.status(500).json({ error: "Resposta do Apps Script não é um JSON válido", raw: text });
    }

    const results = query
      ? data.filter(item => item.nome?.toLowerCase().includes(query.toLowerCase()))
      : data;

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Falha ao buscar dados" });
  }
}
